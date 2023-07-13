#include <MQ2.h>

// define os pinos dos sensores
#define MQ9 A1
#define MQ8 A2

int pin = A0;
int sensorvalueMQ2;
int sensorvalueMQ8;
int sensorvalueMQ9;
float lpg, co, smoke;

MQ2 mq2(pin);

void setup() {
  // inicia a comunicação serial com a velocidade de 9600 bps
  Serial.begin(9600);
  // define os pinos dos sensores como entrada
  pinMode(pin, INPUT);
  pinMode(MQ9, INPUT);
  pinMode(MQ8, INPUT);
  // calibrate the device
  mq2.begin();
}

void loop() {
  bool tem_vazamento = vazamento();
  
  // lê os valores dos sensores
  sensorvalueMQ2 = analogRead(pin);  
  sensorvalueMQ8 = analogRead(MQ8);
  sensorvalueMQ9 = analogRead(MQ9);
  lpg = mq2.readLPG();
  co = mq2.readCO();
  smoke = mq2.readSmoke();
  
  // envia os valores dos sensores para o ESP8266 via comunicação serial
  Serial.print("MQ2=");
  Serial.print(sensorvalueMQ2);
  Serial.print(",lpg=");
  Serial.print(lpg);
  Serial.print(",co=");
  Serial.print(co);
  Serial.print(",smoke=");
  Serial.print(smoke);
  Serial.print(",MQ9=");
  Serial.print(sensorvalueMQ9);
  Serial.print(",MQ8=");
  Serial.print(sensorvalueMQ8);
  Serial.print(",tem_vazamento=");
  Serial.println(tem_vazamento);
  
  // aguarda 1 segundo antes de ler os valores dos sensores novamente
  delay(1000);
}

bool vazamento() {
  // leitura dos valores dos sensores
  int sensorvalueMQ2 = analogRead(pin);  
  int sensorvalueMQ8 = analogRead(MQ8);
  int sensorvalueMQ9 = analogRead(MQ9);

  // verificação se algum sensor está acima de 500
  if (sensorvalueMQ2 > 500 || sensorvalueMQ8 > 500 || sensorvalueMQ9 > 500) {
    return true; // retorna true indicando vazamento
  }
  else {
    return false; // retorna false indicando que não há vazamento
  }

}
