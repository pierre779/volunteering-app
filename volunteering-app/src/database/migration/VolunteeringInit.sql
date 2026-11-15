CREATE DATABASE volunteer_tracker;
USE volunteer_tracker;

CREATE USER 'app_user'@'localhost'
IDENTIFIED BY 'YOUR_PASSWORD!';

GRANT ALL PRIVILEGES
ON volunteer_tracker.*
TO 'app_user'@'localhost';
