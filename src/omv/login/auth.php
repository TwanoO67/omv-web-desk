<?php
session_start();
//conf
$endpoint_url = "http://YOUR-OPENMEDIAVAULT-DOMAIN/rpc.php";

	
//si on cherche a se connecter
if( isset( $_POST['username'] ) && isset($_POST['password'] ) ){
	$ch = curl_init( $endpoint_url );
	# Setup request to send json via POST.
	$payload = json_encode( array( 
	"service"=> "Session", 
	"method" => "login", 
	"params" => array(
		"username" => $_POST['username'],
		"password" => $_POST['password']
	) ) );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
	curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
	# Return response instead of printing.
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	# Send request.
	$result = curl_exec($ch);
	curl_close($ch);
	
	$data = json_decode($result,true);
	$_SESSION['authenticated'] = $data['response']['authenticated'];
	$_SESSION['username'] = $data['response']['username'];
	echo $result;
}
else{
	echo "{'error':'No login information sent.'}";
}
