#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

//Definindo portas de ledes:
#define led1 5
#define led2 4
#define led3 14
#define led4 12

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
int mq2sensor=2;
int mq8sensor=12;
int mq9sensor=13;
int sensorvalueMQ2;
int sensorvalueMQ8;
int sensorvalueMQ9;
int vasamento;
int minutos;
String DateHora;

void setup(){
  Serial.begin(115200); // Monitor serial.

  //Declarando como pinos de saida:
  pinMode(led1, OUTPUT); //Led
  pinMode(led2, OUTPUT); //Led
  pinMode(led3, OUTPUT); //Led
  pinMode(led4, OUTPUT); //Led
  pinMode(mq2sensor, OUTPUT); //MQ2 sensor.
  pinMode(mq8sensor, OUTPUT); //MQ8 sensor.
  pinMode(mq9sensor, OUTPUT); //MQ9 sensor.

  digitalWrite(mq2sensor, LOW); 
  digitalWrite(mq8sensor, LOW); 
  digitalWrite(mq9sensor, LOW); 

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
  // Set offset time in seconds to adjust for your timezone, for example:
  // GMT +1 = 3600
  // GMT +8 = 28800
  // GMT -1 = -3600
  // GMT 0 = 0
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
  sensorvalueMQ2 = ReadPin(mq2sensor);    // read the MQ2 sensor.
  sensorvalueMQ8 = ReadPin(mq8sensor);    // read the MQ8 sensor.
  sensorvalueMQ9 = ReadPin(mq9sensor);    // read the MQ9 sensor.
  
  leak();
  if(vasamento > 550){
    //Envia dados para Firebase (Data/Hora, valorInteiro):
    Firebase.RTDB.setInt(&fbdo, "VASAMENTO/"+DateHora+"/VALOR",vasamento); // Enviando dados para Firebase do MQ2.
    Firebase.RTDB.setString(&fbdo, "VASAMENTO/"+DateHora+"/MINUTOS/",minutos); // Enviando dados para Firebase do MQ2.

  }
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/Valor",sensorvalueMQ2); // Enviando dados para Firebase do MQ2.
  Firebase.RTDB.setInt(&fbdo, "MQ8 Sensor/Valor",sensorvalueMQ8); // Enviando dados para Firebase do MQ8.
  Firebase.RTDB.setInt(&fbdo, "MQ9 Sensor/Valor",sensorvalueMQ9); // Enviando dados para Firebase do MQ9.

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
int ReadPin(const byte &p){
  int r;
  digitalWrite(p, HIGH);
  analogRead(A0);
  r = analogRead(A0);
  digitalWrite(p, LOW);
  return r;
}

// identificar vasamentos 
int leak(){
  if(sensorvalueMQ2 > 550){
    vasamento = sensorvalueMQ2;
  }
  else if(sensorvalueMQ8 > 550){
    vasamento = sensorvalueMQ8;
  }
  else if(sensorvalueMQ2 > 550){
    vasamento = sensorvalueMQ8;
  }
  else{
    vasamento = 0;
  }
  return vasamento;
}