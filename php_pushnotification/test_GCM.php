<?php 

include 'GCMPushMessage.php';

$apiKey = "AIzaSyDjcFIrX3PiZlnOnjf6lw5-zg2aUDmIGAU";
$devices = array('APA91bG5n4yS4mwnzrO4YVP6MHLDPBVDQEySTukdLMSWNC9Nz3YhGYbmF3zY66dJo48XDdcCaCy4NoODsRO9QvXwBrP2YRIWg9eaFUqti2EGJhVEd0qszn_XMkaN__poubYS_cOeGuP9ovdQbLaFKgstCiIkgwcL4hYnNOX-Ao_kqNQGwfyHpYs');
$username = "USUARIO";
$message = "IACA Laboratorios | ".$username;

$gcpm = new GCMPushMessage($apiKey);
$gcpm->setDevices($devices);
$response = $gcpm->send($message, array('title' => 'Nuevo resultado de análisis'));

echo $response;