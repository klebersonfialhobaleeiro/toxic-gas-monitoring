#include <MQ2.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

MQ2 mq2(A0);

/*  */
//Definindo portas de ledes:
#define led1 5
#define led2 4
#define led3 14
#define led4 12

float lpg, co, smoke;
//Insira suas credenciais de rede:
#define WIFI_SSID "REDE ABERTA " // Nome da rede WiFi.
#define WIFI_PASSWORD "melemalu" // Senha da rede WiFi.

//Dados do FireBase:
#define API_KEY "AIzaSyAeW-oRdds8R8GpJ08isjYwxD24yH9h8-I"
#define DATABASE_URL "https://sensor-mqs-default-rtdb.firebaseio.com/"

//Definir cliente NTP para obter tempo:
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

//Definindo objetos do Firebase:
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

//Declarando Variavesis:
bool signupOK = false;
int sensorvalueMQ2;
int sensorvalueMQ8;
int sensorvalueMQ9;
int vazamento;
int minutos;
String DateHora;

void setup(){
  Serial.begin(9600); // Monitor serial.

  mq2.begin();

  //Declarando como pinos de saida:
  pinMode(led1, OUTPUT); //Led
  pinMode(led2, OUTPUT); //Led
  pinMode(led3, OUTPUT); //Led
  pinMode(led4, OUTPUT); //Led

  //Conecta ao WiFi:
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  /*Teste de coneção ao fire base */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str()); // Mensagem de erro de coneção ao Firebase.
  }
  
  //Inicialize um NTPClient para obter tempo:
  timeClient.begin();
  timeClient.setTimeOffset(-10800);

//conectando ao FireBase:
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true); 
}

void loop(){
  //Obter data e hora:
  timeStamp();

  //Coleta de dados com MQs:
  dataCollect();
  
  //Ativar sirene de alerta:
  alert();

//Espera de 5 segundos:
delay(5000);
}

//Função para data e hora:
void timeStamp( ) {
  //Conectando ao servidar time:
  timeClient.update();

  time_t epochTime = timeClient.getEpochTime();

  int currentHour = timeClient.getHours();  
  //Horas

  //Minutos
  int currentMinute = timeClient.getMinutes();

  //Pegando estrutura de tempo:
  struct tm *ptm = gmtime ((time_t *)&epochTime); 

  //Dia do mês:
  int monthDay = ptm->tm_mday;

  //Mês:
  int currentMonth = ptm->tm_mon+1;

  //Ano:
  int currentYear = ptm->tm_year+1900;

  // Data e hora:
  DateHora = String(currentMonth) +  "-" + String(currentYear) + "/" + "DIA" + String(monthDay) + "/" + String(currentHour) + "HR";
  minutos = currentMinute;
}

//Coleta de dados com MQs.
void dataCollect(){
  sensorvalueMQ2 = analogRead(A0);    // read the MQ2 sensor.
  sensorvalueMQ8 = analogRead(13);    // read the MQ8 sensor.
  sensorvalueMQ9 = analogRead(2);    // read the MQ9 sensor.
  
  leak();
  if(vazamento > 550){
    //Envia dados para Firebase (Data/Hora, valorInteiro):
    Firebase.RTDB.setInt(&fbdo, "VAZAMENTO/"+DateHora+"/VALOR",vazamento); // Enviando dados para Firebase do MQ2.
    Firebase.RTDB.setString(&fbdo, "VAZAMENTO/"+DateHora+"/MINUTOS/",minutos); // Enviando dados para Firebase do MQ2.

  }
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/Valor",sensorvalueMQ2); // Enviando dados para Firebase do MQ2.
  //Firebase.RTDB.setInt(&fbdo, "MQ8 Sensor/Valor",sensorvalueMQ8); // Enviando dados para Firebase do MQ8.
  //Firebase.RTDB.setInt(&fbdo, "MQ9 Sensor/Valor",sensorvalueMQ9); // Enviando dados para Firebase do MQ9.

  //função pegar valo de fumaça glp e Co
  LCS ();

  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/SMOKE",smoke ); // Enviando dados para Firebase do MQ2.
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/CO",co ); // Enviando dados para Firebase do MQ2.
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/LPG",lpg ); // Enviando dados para Firebase do MQ2.
  Serial.println(sensorvalueMQ2); //Imprime valor no monitor serial
}

//loop do jogo de lede:
void alert() {
  while(sensorvalueMQ2 > 890){
    int cont=0;
    while(cont < 5){
      sirene(led1, led2, led3, led4);
      sirene(led2, led1, led3, led4);
      sirene(led3, led2, led1, led4);
      sirene(led4, led2, led3, led1);
    cont = cont + 1;
    }
    timeStamp();
    dataCollect();
  }
}

//Ligar sirene alerta:
void sirene(int n1, int n2, int n3, int n4){
  digitalWrite(n1, HIGH);
  digitalWrite(n2, LOW);
  digitalWrite(n3, LOW);
  digitalWrite(n4, LOW);
  delay(150);
  digitalWrite(n1, LOW);
}

//multiplexar portas:
void LCS(){

  float* values= mq2.read(true); //set it false if you don't want to print the values to the Serial
  
  // lpg = values[0];
  lpg = mq2.readLPG();
  // co = values[1];
  co = mq2.readCO();
  // smoke = values[2];
  smoke = mq2.readSmoke();
}

// identificar vasamentos 
int leak(){
  if(sensorvalueMQ2 > 550){
    vazamento = sensorvalueMQ2;
  }
  else if(sensorvalueMQ8 > 550){
    vazamento = sensorvalueMQ8;
  }
  else if(sensorvalueMQ2 > 550){
    vazamento = sensorvalueMQ8;
  }
  else{
    vazamento = 0;
  }
  return vazamento;
}