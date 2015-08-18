<?php 

include 'GCMPushMessage.php';

$apiKey = "AIzaSyDjcFIrX3PiZlnOnjf6lw5-zg2aUDmIGAU";
$devices = array('APA91bExGvPAWRZiusem-8AAk7y6ycnlQ_72Hs3YP4FZ_HIIcwvJYJgW-HmQw8WD_BQiTLDmRC-rFoPJQMU0z_fIGM09WtKj326h6WfmegfTvZQNJq6netouoeDq1PuPaT50VYOIb4qYj2VxDT_PG9IewmYqlk6ahXzqqwdAoLjYeo_x9dOe8Qo');
$username = "USUARIO";
$message = "IACA Laboratorios | ".$username;

$gcpm = new GCMPushMessage($apiKey);
$gcpm->setDevices($devices);
$response = $gcpm->send($message, array('title' => 'Nuevo resultado de análisis'));

echo $response;
