<?PHP

// Para forzar login
// echo file_get_contents('Shift_login_112233.xml'); exit;


/* Proxy para invocación a webservice evitando error de same-origin-policy */
// Se debe indicar SOAPAction en header

$ws_url = "http://181.30.97.58/shift/lis/iaca/elis/s01.util.b2b.integracaoMobile.Webserver.cls";

$request_headers = getallheaders();
$soap_action = $request_headers['SOAPAction'];

$post_body =  file_get_contents('php://input');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$ws_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: text/xml; charset=utf-8",
    "SOAPAction: ".$soap_action
]);
curl_setopt($ch, CURLOPT_POSTFIELDS,$post_body);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


$response = curl_exec ($ch);
echo $response;