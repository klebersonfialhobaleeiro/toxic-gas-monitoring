//ESP8266
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

//Insira suas credenciais de rede:
#define WIFI_SSID "Licinio" // Nome da rede WiFi.
#define WIFI_PASSWORD "licinio20almeida" // Senha da rede WiFi.

//Dados do FireBase:
#define API_KEY "AIzaSyAeW-oRdds8R8GpJ08isjYwxD24yH9h8-I"
#define DATABASE_URL "https://sensor-mqs-default-rtdb.firebaseio.com/"

//Definindo objetos do Firebase:
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool signupOK = false;

void setup(){
  Serial.begin(9600); // Monitor serial.

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
  
//conectando ao FireBase:
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true); 
}

//Coleta de dados com MQs.
void loop(){
  if (Serial.available()) {  // verifica se há dados disponíveis na porta serial
    String dados = Serial.readStringUntil('\n');  // lê os dados até encontrar uma quebra de linha
    Serial.println(dados);  // exibe os dados recebidos no monitor serial do ESP8266
    
    // divide a string em substrings separadas por vírgulas
    int pos1 = dados.indexOf('=');  // encontra a posição do primeiro sinal de igual
    int pos2 = dados.indexOf(',', pos1);  // encontra a posição da primeira vírgula após o primeiro sinal de igual
    int pos3 = dados.indexOf('=', pos2);  // encontra a posição do segundo sinal de igual
    int pos4 = dados.indexOf(',', pos3);  // encontra a posição da segunda vírgula após o segundo sinal de igual
    int pos5 = dados.indexOf('=', pos4);  // encontra a posição do terceiro sinal de igual
    int pos6 = dados.indexOf(',', pos5);  // encontra a posição da terceira vírgula após o terceiro sinal de igual
    int pos7 = dados.indexOf('=', pos6);  // encontra a posição do quarto sinal de igual
    int pos8 = dados.indexOf(',', pos7);  // encontra a posição da quarta vírgula após o quarto sinal de igual
    int pos9 = dados.indexOf('=', pos8);  // encontra a posição do quinto sinal de igual
    int pos10 = dados.indexOf(',', pos9);  // encontra a posição da quinta vírgula após o quinto sinal de igual
    int pos11 = dados.indexOf('=', pos10);  // encontra a posição do sexto sinal de igual
    int pos12 = dados.indexOf(',', pos11);  // encontra a posição da sexta vírgula após o sexto sinal de igual
    
    // extrai os valores das substrings
    int sensorvalueMQ2 = dados.substring(pos1 + 1, pos2).toInt();
    float lpg = dados.substring(pos3 + 1, pos4).toFloat();
    float co = dados.substring(pos5 + 1, pos6).toFloat();
    float smoke = dados.substring(pos7 + 1, pos8).toFloat();
    int sensorvalueMQ9 = dados.substring(pos9 + 1, pos10).toInt();
    int sensorvalueMQ8 = dados.substring(pos11 + 1, pos12).toInt();
    
    firebase(sensorvalueMQ2, lpg, co, smoke, sensorvalueMQ9, sensorvalueMQ8);
    Serial.flush();
  } 
}

void firebase(int sensorvalueMQ2, float lpg, float co, float smoke, int sensorvalueMQ9, int sensorvalueMQ8){
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/Valor",sensorvalueMQ2);
  Firebase.RTDB.setInt(&fbdo, "MQ8 Sensor/Valor",sensorvalueMQ8);
  Firebase.RTDB.setInt(&fbdo, "MQ9 Sensor/Valor",sensorvalueMQ9);
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/SMOKE",smoke );
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/CO",co );
  Firebase.RTDB.setInt(&fbdo, "MQ2 Sensor/LPG",lpg );
}