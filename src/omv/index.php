<?php
	session_start();
	if( isset($_SESSION['authenticated']) && $_SESSION['authenticated'] ){
		require("./index.html");
	}
	else{
		require("./login/login.html");
	}
	exit;
?>