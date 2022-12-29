#define led1 4
#define led2 5
#define led3 0
#define led4 8
#define Gas_analog A0
int gassensorAnalog;

void setup() {
  Serial.begin(9600);
  pinMode(led2, OUTPUT); 
}

void loop() {

  gassensorAnalog = analogRead(Gas_analog);
  Serial.print("Leitura entrada analogica ");
  Serial.println(gassensorAnalog);

  if(gassensorAnalog > 700){
    sirene(led1, led2, led3, led4);
    sirene(led2, led1, led3, led4);
    sirene(led3, led2, led1, led4);
    sirene(led4, led2, led3, led1);
  }
}


int sirene(int n1, int n2, int n3, int n4){
  digitalWrite(n1, HIGH);
  digitalWrite(n2, LOW);
  digitalWrite(n3, LOW);
  digitalWrite(n4, LOW);
  delay(150);
  digitalWrite(n1, LOW);
  return 0;
}
