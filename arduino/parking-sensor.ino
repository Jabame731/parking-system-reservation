#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// --- Configuration ---
const char* ssid = "";
const char* password = "";

//NOTE CHANGE THE HTTPCLIENT HTTP TO HTTPS ON PRODUCTION

//PC's IP and Express port
const char* apiUrl = "http://192.168.1.15:8800/api/sensor";
// const char* apiUrl = "https://parking-system-reservation.vercel.app/api/sensor";

const int irPin = D5;
int lastState = -1;
String slotId = "";

void setup() {
  Serial.begin(9600);
  pinMode(irPin, INPUT);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  fetchActiveSlots();
}

void loop() {
  if (slotId.length() == 0) {
    delay(5000);
    fetchActiveSlots();
    return;
  }

  int raw = digitalRead(irPin);
  int currentState = (raw == LOW) ? 1 : 0; 

  if (currentState != lastState) {
    sendSensorUpdate(currentState);
    lastState = currentState;

    Serial.println(
      currentState == 1 ? ">> Car detected" : ">> Slot cleared"
    );
  }

  delay(500); 
}

void fetchActiveSlots() {
  WiFiClient client; 
  HTTPClient http;

  Serial.println("[HTTP] Fetching slots...");
  
  if (http.begin(client, apiUrl)) {
    int code = http.GET();
    
    if (code == HTTP_CODE_OK) {
      String response = http.getString();
      Serial.println("Response: " + response);

      StaticJsonDocument<512> doc;
      DeserializationError error = deserializeJson(doc, response);

      if (!error) {
        JsonArray arr = doc["data"].as<JsonArray>();

      
        if (!arr.isNull() && arr.size() > 0) {
            for (int i = 0; i < arr.size(); i++) {
              String s = arr[i].as<String>();
              Serial.print("Slot ");
              Serial.print(i);
              Serial.print(": ");
              Serial.println(s);
            }

          slotId = arr[0].as<String>();
          Serial.println("Assigned slotId: " + slotId);
        } else {
          Serial.println("No active slots in data array");
        }
      } else {
        Serial.print("JSON Parse Failed: ");
        Serial.println(error.c_str());
      }
    } else {
      Serial.printf("[HTTP] GET Failed, Error: %s\n", http.errorToString(code).c_str());
    }
    http.end();
  }
}

void sendSensorUpdate(int sensorValue) {
  WiFiClient client;
  HTTPClient http;

  if (http.begin(client, apiUrl)) {
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<128> doc;
    doc["slotId"] = slotId;
    doc["sensorValue"] = sensorValue;

    String payload;
    serializeJson(doc, payload);

    int code = http.POST(payload);

    if (code > 0) {
      Serial.printf("[HTTP] Update sent, Code: %d\n", code);
    } else {
      Serial.printf("[HTTP] Update failed: %s\n", http.errorToString(code).c_str());
    }
    http.end();
  }
}