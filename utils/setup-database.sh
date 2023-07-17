#!/bin/bash

# Specify the database name
DB_NAME="eggsapp"

# Create the database
echo "Creating the $DB_NAME database..."
createdb $DB_NAME

# Create a user for the $DB_NAME database
echo "Creating a user for the $DB_NAME database..."
psql -d $DB_NAME -c "CREATE USER eggsapp_user WITH PASSWORD 'kiki';"

# Grant privileges to the user
echo "Granting privileges to the eggsapp user..."
psql -d $DB_NAME -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO eggsapp_user;"

# Connect to the database
echo "Connecting to the $DB_NAME database..."
psql -d $DB_NAME << EOF


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

\dt


INSERT INTO users (username, password) VALUES ('admin', 'admin');

EOF



echo "Done! The $DB_NAME database, user, and users table have been created with a dummy user 'admin' for testing."
