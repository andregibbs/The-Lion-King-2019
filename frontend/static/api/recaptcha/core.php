<?php
$response = trim($_POST['g-recaptcha-response']);
$secret_key = '6LdwOKAUAAAAAHl6wrzFfUqLXGTg6vGMUnNeeyHa';
	
//assemble url
$url = "https://www.google.com/recaptcha/api/siteverify?secret=".$secret_key."&response=".$response."&remoteip=".$_SERVER['REMOTE_ADDR'];

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_TIMEOUT, 10);
curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16");
$curlData = curl_exec($curl);

curl_close($curl);
$response = $curlData;
echo $response;