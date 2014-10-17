<?PHP 

$user = $_GET['username'];
$pass = $_GET['password'];

$url = "http://iaca3.web.vianetcon.com.ar/ws.json!login!username=".$user."&password=".$pass;

$json =  file_get_contents($url);

/* 
// Agrego PHPSESSID al JSON
$array = json_decode($json,true);

$phpsessid = "";

foreach ($http_response_header as $hdr) {
    if (preg_match('/PHPSESSID=(.*?)(?:;|\r\n)/', $hdr, $matches)) {
        $phpsessid = $matches[1];
    }
}

$array['PHPSESSID'] = $phpsessid;

$json = json_encode($array);
*/

echo $json;


 ?>