CREATE TABLE "parking_slot" (
  "id" char(36) NOT NULL,
  "slotName" varchar(50) NOT NULL,
  "carOccupied" varchar(20) DEFAULT NULL,
  "sensorValue" varchar(50) DEFAULT NULL,
  "slotStatus" varchar(20) DEFAULT NULL,
  "sensorStatus" varchar(20) DEFAULT NULL,
  "createdBy" varchar(50) DEFAULT NULL,
  "createdAt" datetime DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "fk_slot_created_by" ("createdBy"),
  CONSTRAINT "fk_slot_created_by" FOREIGN KEY ("createdBy") REFERENCES "users" ("id") ON DELETE CASCADE
)

CREATE TABLE "reservation" (
  "id" char(36) NOT NULL,
  "slotId" char(36) NOT NULL,
  "userId" char(36) NOT NULL,
  "licensePlate" varchar(20) NOT NULL,
  "carType" varchar(50) DEFAULT NULL,
  "startTime" datetime DEFAULT NULL,
  "endTime" datetime DEFAULT NULL,
  "amount" decimal(10,2) NOT NULL,
  "paymentMethod" varchar(50) DEFAULT NULL,
  "paymentStatus" varchar(20) DEFAULT NULL,
  "paymentResult" json DEFAULT NULL,
  "isPaid" tinyint(1) DEFAULT NULL,
  "paidAt" datetime DEFAULT NULL,
  "reservationDate" datetime DEFAULT NULL,
  "createdAt" datetime DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "fk_res_slot" ("slotId"),
  KEY "fk_res_user" ("userId"),
  KEY "fk_res_plate" ("licensePlate"),
  CONSTRAINT "fk_res_plate" FOREIGN KEY ("licensePlate") REFERENCES "vehicle" ("licensePlate") ON UPDATE CASCADE,
  CONSTRAINT "fk_res_slot" FOREIGN KEY ("slotId") REFERENCES "parking_slot" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_res_user" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE
)


CREATE TABLE "users" (
  "id" char(36) NOT NULL,
  "firstName" varchar(50) NOT NULL,
  "lastName" varchar(50) NOT NULL,
  "contactNumber" varchar(50) DEFAULT NULL,
  "email" varchar(100) NOT NULL,
  "password" varchar(255) NOT NULL,
  "image" varchar(255) DEFAULT NULL,
  "address" varchar(100) DEFAULT NULL,
  "userRole" varchar(20) NOT NULL,
  "createdAt" datetime DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "email" ("email")
)


CREATE TABLE "vehicle" (
  "licensePlate" varchar(20) NOT NULL,
  "ownerId" char(36) NOT NULL,
  "carType" varchar(50) DEFAULT NULL,
  "updatedAt" datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("licensePlate"),
  KEY "fk_vehicle_owner" ("ownerId"),
  CONSTRAINT "fk_vehicle_owner" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE CASCADE
)
