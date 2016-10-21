<?php
session_start();
//configuration
$endpoint_url = "http://YOUR-OPENMEDIAVAULT-IP/rpc.php";	


/* SCRIPT START */
?>

<!doctype html>
<html>
	<head>
	  <meta charset="utf-8">
	  <title>Bureau Virtuel</title>
	  <base href="/">
	  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	
	  <script type="text/javascript" src="ng2os_config.js"></script>
	  <script>
	  if(typeof NG2OS_CONFIG === "undefined"){
	    alert("Merci de configurer votre fichier ng2os_config.js");
	  }
	  </script>
	
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="icon" type="image/x-icon" href="favicon.ico">
	</head>
	
<body>
<?php

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
	
}


if( isset($_SESSION['authenticated']) && $_SESSION['authenticated'] ){
	//page normal en angular2
	?>
	<app-root>Loading...</app-root>
	<script type="text/javascript" src="inline.js"></script>
	<script type="text/javascript" src="styles.bundle.js"></script>
	<script type="text/javascript" src="scripts.bundle.js"></script>
	<script type="text/javascript" src="main.bundle.js"></script>


	<?php
}
else{
	//affichage du formulaire
	?>
	<h1>Bureau Virtuel</h1>
	<link rel="stylesheet" type="text/css" href="login/login.css" media="screen" /> 
	<div class="stand">
	  <div class="outer-screen">
	    <div class="inner-screen">
	      <div class="form">
		    <form method="post" action='#'>
		        <input type="text" class="zocial-dribbble" name="username" placeholder="Enter your username" />
		        <input type="password" name="password" placeholder="Password" />
		        <input type="submit" value="Login" />
		        <!--a href="">Lost your password?</a-->
		    </form>
	      </div> 
	    </div> 
	  </div> 
	</div>
	<?php 
}
?>
</body>
</html>