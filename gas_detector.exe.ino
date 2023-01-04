// incluindo bibliotecas 
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>

//Definindo portas de ledes 
#define led1 4
#define led2 5
#define led3 2
#define led4 16

// Insert your network credentials
#define WIFI_SSID "REDE ABERTA "
#define WIFI_PASSWORD "melemalu"

//Dados do FireBase
#define API_KEY "AIzaSyAeW-oRdds8R8GpJ08isjYwxD24yH9h8-I"
#define DATABASE_URL "https://sensor-mqs-default-rtdb.firebaseio.com/" 

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;


// Declarando Variavesis 
bool signupOK = false;
int mq2sensor=A0;
int mq8sensor=12;
int mq9sensor=13;
int sensorvalueMQ2;
int sensorvalueMQ3;
int sensorvalueMQ9;


void setup(){
  Serial.begin(115200); // monitor serial 

  pinMode(led1, OUTPUT); 
  pinMode(led2, OUTPUT); 
  pinMode(led3, OUTPUT); 
  pinMode(led4, OUTPUT); 

  pinMode(mq2sensor, INPUT);//MQ2 sensor 
  pinMode(mq8sensor, INPUT);//MQ8 sensor 
  pinMode(mq9sensor, INPUT);//MQ9 sensor 

//Conectar WiFi
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

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  
  //conectando ao FireBase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop(){
  teste();
  // Chamando Função Para Ativar sirene 
  while(sensorvalueMQ2 > 700){
    sirene(led1, led2, led3, led4);
    delay(150);
    sirene(led2, led1, led3, led4);
    delay(150);
    sirene(led3, led2, led1, led4);
    delay(150);
    sirene(led4, led2, led3, led1);
    delay(150);
    teste();
  }
delay(5000);
}

// Função sirene alerta 
void sirene(int n1, int n2, int n3, int n4){
  digitalWrite(n1, HIGH);
  digitalWrite(n2, LOW);
  digitalWrite(n3, LOW);
  digitalWrite(n4, LOW);
  delay(150);
  digitalWrite(n1, LOW);
}

void teste(){
    sensorvalueMQ2=analogRead(mq2sensor);    // read the MQ2 sensor
//  sensorvalueMQ8=analogRead(mq8sensor);    // read the MQ8 sensor
//  sensorvalueMQ9=analogRead(mq9sensor);    // read the MQ9 sensor
  Serial.println(sensorvalueMQ2);
//  Serial.println(sensorvalueMQ8);
//  Serial.println(sensorvalueMQ9);
  Firebase.RTDB.pushFloat(&fbdo, "MQ2 Sensor/Value",sensorvalueMQ2);
//  Firebase.RTDB.pushFloat(&fbdo, "MQ8 Sensor/Value",sensorvalueMQ8);
//  Firebase.RTDB.pushFloat(&fbdo, "MQ9 Sensor/Value",sensorvalueMQ9);

}
