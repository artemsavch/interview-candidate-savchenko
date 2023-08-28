-- DO NOT MODIFY THIS FILE

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  "email" VARCHAR PRIMARY KEY,
  "admin" BOOLEAN,
  "subscription_ends" TIMESTAMP
);

DROP TABLE IF EXISTS firmware_versions;
CREATE TABLE firmware_versions
(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "major" INTEGER,
  "minor" INTEGER,
  "patch" INTEGER
);

DROP TABLE IF EXISTS devices;
CREATE TABLE devices
(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name" VARCHAR,
  "user_email" VARCHAR,
  "firmware_version_id" INTEGER
);

DROP TABLE IF EXISTS updates;
CREATE TABLE updates
(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "device_id" INTEGER,
  "finished" TIMESTAMP
);
