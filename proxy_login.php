<?PHP 

$user = $_GET['username'];
$pass = $_GET['password'];

$url = "http://iaca3.web.vianetcon.com.ar/ws.json!login!username=".$user."&password=".$pass;

echo file_get_contents($url).'<br/><br/>';

$phpsessid = "";

foreach ($http_response_header as $hdr) {
    if (preg_match('/PHPSESSID=(.*?)(?:;|\r\n)/', $hdr, $matches)) {
        $phpsessid = $matches[1];
    }
}
echo "PHPSESSID=".$phpsessid;

 ?>