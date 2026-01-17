#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>

const char* ssid = "";
const char* password = "";

const char* apiUrl = "https://parking-system-reservation.vercel.app/api/sensor";


const int irPin = D5;
int lastState = -1;

String slotId = "";


void setup() {
  Serial.begin(9600);
  pinMode(irPin, INPUT);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to the WiFi");


  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("\nNot connected to the WiFi");
  }

  Serial.println("\nWiFi Connected");

  fetchActiveSlots();
}


void loop() {
  if (slotId.length() == 0) return;

  int raw = digitalRead(irPin);
  int currentState = (raw == LOW) ? 1 : 0;

  if (currentState != lastState) {
    sendSensorUpdate(currentState);
    lastState = currentState;

    Serial.println(
      currentState == 1 ? "Car detected" : "Car left"
    );
  }

  delay(300);
}


void fetchActiveSlots() {
  WiFiClientSecure client;
  HTTPClient https;

  client.setInsecure();

  https.begin(client, apiUrl);
  int code = https.GET();

  Serial.println("HTTP Code: " + String(code));

  if (code == HTTP_CODE_OK) {
    String response = https.getString();
    Serial.println("Slots response: " + response);

    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, response);

    if (!error) {
      JsonObject obj = doc.as<JsonObject>();
      JsonArray arr = obj["data"].as<JsonArray>();

      if (!arr.isNull() && arr.size() > 0) {
        slotId = arr[0].as<String>();
        Serial.println("Assigned slotId: " + slotId);
      } else {
        Serial.println("No active slots available");
      }
    } else {
      Serial.println("JSON parse error");
    }
  } else {
    Serial.println("Failed to fetch slots");
  }

  https.end();

}

void sendSensorUpdate(int sensorValue) {
  WiFiClientSecure client;
  HTTPClient https;

  client.setInsecure();

  https.begin(client, apiUrl);
  https.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"slotId\":\"" + slotId + "\",";
  payload += "\"sensorValue\":" + String(sensorValue);
  payload += "}";

  int code = https.POST(payload);

  Serial.println("Update sent. HTTP code: " + code);

  https.end();

}



