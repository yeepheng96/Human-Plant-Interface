#include <ESP8266WiFi.h>                                                    
#include <FirebaseArduino.h>                                                

#define FIREBASE_HOST "hpiuser-7a9b0.firebaseio.com"                          
#define FIREBASE_AUTH "hOCIux1rXygoRmEULVnPvFWYQOLxhfqYYAowWZO4"            

#define WIFI_SSID "Kachi Monkey"                                             
#define WIFI_PASSWORD "ascent3651"                                                                                   

int sense_Pin = A0; // sensor input at Analog pin A0
int value;

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
}

void loop() {
  value= analogRead(sense_Pin);
  value= map(value,550,0,0,100);
  Serial.print("Moisture Level: ");
  Serial.print(value);
  Serial.println("%");
  String fireMois = String(value);

  delay(5000);
  
  Firebase.setString("/Soil_Sensor/Moisture", fireMois);
}
