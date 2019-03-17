#include <ESP8266WiFi.h>                                                    
#include <FirebaseArduino.h>                                                

#define FIREBASE_HOST "hpiuser-7a9b0.firebaseio.com"                          
#define FIREBASE_AUTH "hOCIux1rXygoRmEULVnPvFWYQOLxhfqYYAowWZO4"            

#define WIFI_SSID "Kachi Monkey"                                             
#define WIFI_PASSWORD "ascent3651"                                                                                   

int WET = 16; // Wet Indicator at Digital pin D0
int DRY = 2;  // Dry Indicator at Digital pin D4
int sense_Pin = 0; // sensor input at Analog pin A0
int value = 0;

void setup() {
  Serial.begin(9600);
  delay(1000);                
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                     
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());                                            
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                              
  pinMode(WET, OUTPUT);
  pinMode(DRY, OUTPUT);
}

void loop() {
  Serial.print("Moisture Level: ");
  value= analogRead(sense_Pin);
  value= value/10;
  Serial.print(value);
  Serial.println("%");
    if(value<50){
      digitalWrite(WET, HIGH);
    }
    else{
      digitalWrite(DRY,HIGH);
    }
  String fireMois = String(value);

  delay(5000);

  digitalWrite(WET,LOW);
  digitalWrite(DRY, LOW);
  
  Firebase.setString("/Soil_Sensor/Moisture", fireMois);
}
