#include <ESP8266WiFi.h>                                                                // esp8266 library
#include <FirebaseArduino.h>                                                            // firebase library
#include <DHT.h>                                                                        // dht11 temperature and humidity sensor library

#define FIREBASE_HOST "hpiuser-7a9b0.firebaseio.com"                                    // the project name address from firebase id
#define FIREBASE_AUTH "hOCIux1rXygoRmEULVnPvFWYQOLxhfqYYAowWZO4"                        // the secret key generated from firebase

#define WIFI_SSID "Kachi Monkey"                                                       // input your home or public wifi name 
#define WIFI_PASSWORD "ascent3651"                                                                // password of wifi ssid
 
#define DHTPIN D4                                                                       // what digital pin we're connected to
#define DHTTYPE DHT11                                                                   // select dht type as DHT 11 or DHT22
DHT dht(DHTPIN, DHTTYPE);                                                     

void setup() {
  Serial.begin(9600);
  delay(1000);                
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                                 // try to connect with wifi
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
  Serial.println(WiFi.localIP());                                                       // print local IP address
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                                          // connect to firebase
  dht.begin();                                                                           // Start reading dht sensor
}

void loop() { 
  float h = dht.readHumidity();                                                          // Reading temperature or humidity takes about 250 milliseconds!
  float t = dht.readTemperature();                                                       // Read temperature as Celsius (the default)
    
  if (isnan(h) || isnan(t)) {                                                            // Check if any reads failed and exit early (to try again).
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  
  Serial.print("Humidity: ");  Serial.print(h);
  String fireHumid = String(h);                                                          // convert integer humidity to string humidity 
  Serial.print("%  Temperature: ");  Serial.print(t);  Serial.println("°C ");
  String fireTemp = String(t);                                                           // convert integer temperature to string temperature

  unsigned int lightValue;
  lightValue = analogRead(A0);
  Serial.print("Light Density: "); Serial.print(lightValue); Serial.println("lx");
  String fireLight = String(lightValue);
  
  delay(5000);
  
  Firebase.setString("/DHT11_Humidity/Humidity", fireHumid);                             // setup path and send readings
  Firebase.setString("/DHT11_Temperature/Temperature", fireTemp);                        
  Firebase.setString("/Light_Sensor/Density", fireLight);
}
