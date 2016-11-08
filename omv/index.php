<?php
	session_start();
	if( isset($_SESSION['authenticated']) && $_SESSION['authenticated'] ){
		echo "<script> NG2OS_CONFIG['username'] = '".$_SESSION['username']."'; </script>";
		require("./index.html");
	}
	else{
		require("./login/login.php");
	}
	exit;
?>
