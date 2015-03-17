<?php 
$DB_HOST = 'localhost';
$DB_USER = 'alvin';
$DB_PASS = '';
$DB_NAME = 'tasty_talk';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
$mysqli->set_charset("utf8"); // for chinese characters
?>
