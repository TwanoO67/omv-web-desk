<?php
	$CONF = require('./login/config.php');
?>
<html>
	<body>
		<style>
			body{
				font-family: "Helvetica Neue", sans-serif;
				background:url("<?php echo $CONF["login_background"]; ?>");
			  background-position:top center;
			}
			a{
				color:#fff;
				text-decoration: none;
				text-shadow:#000 0px 1px 3px;
			}
			.wrap{
			  width:600px;
			  margin:auto;
				text-align: center;
			  opacity:0.8;
			}
			.wrap:hover{
			  opacity:1;
			}

			.login-wrap{
				width:290px;
				height:320px;
				margin:15% auto 0;
				position: relative;
			}

			.login{
				display: block;
				margin:auto;
				padding:40px 40px 30px;
				position: absolute;
				background-color:#f8f8f8;
				background-image:-webkit-linear-gradient(top, #f0f0f0, #ddd);
			  background-image:-moz-linear-gradient(top, #f0f0f0, #ddd);
			  background-image:linear-gradient(top, #f0f0f0, #ddd);
				border-radius:5px;
				border:#fff 1px solid;
				box-shadow: rgba(0,0,0,0.5) 0px 3px 20px;
				text-align: center;
			}

			.avatar{
				display:block;
				margin:0 auto 15px;
				width:100px;
				height:100px;
				border-radius:100%;
				border:#fff 3px solid;
				box-shadow:rgba(0,0,0,0.4) 0px 2px 4px, inset rgba(0,0,0,0.4) 0px 3px 2px;
				overflow:hidden;
				background-image:-webkit-linear-gradient(top left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 50%), url("<?php echo $CONF["login_avatar"]; ?>");
			  background-image:-moz-linear-gradient(top left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 50%), url("<?php echo $CONF["login_avatar"]; ?>");
			  background-image:linear-gradient(top left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 50%), url("<?php echo $CONF["login_avatar"]; ?>");
				background-size: auto, 100%;
			}
			.user{
				padding:10px 0;
				font-size: 0.95em;
			  text-shadow:rgba(255,255,255,0.7) 0px 1px 0px;
			}

			.pass{
				display: block;
				width:170px;
				margin:20px auto;
				padding:10px 25px 10px 10px;
				border-radius:3px;
				border:#CCC 1px solid;
			}
			.login-form{
				position: relative;
			}
			.arrow{
				position: absolute;
				right:10px;
				top:8px;
				display: block;
				z-index:999;
				color:#999;
				opacity:0;
				-webkit-transition:all 0.5s ease-in-out;
			  -moz-transition:all 0.5s ease-in-out;
			  transition:all 0.5s ease-in-out;
			}

			.arrow.opac{
				opacity: 1;
			}

			.init-shake{
				-webkit-animation:shake 0.7s ease-in-out;
			  -moz-animation:shake 0.7s ease-in-out;
			  animation:shake 0.7s ease-in-out;
			}
			.hint{
				position: absolute;
				bottom:0;
				left:0;
				padding:20px;
				color:#fff;
				text-shadow:#000 0px 1px 5px;
			}
			.info{
			  display:block;
			  color:#CCC;
			  margin:10px 0;
			  font-size:0.95em;
			}
			.spinner {
			    background: url(../assets/img/spinnerSmall.gif) no-repeat;
			    background-size: 35px 35px;
			    width: 35px;
			    height: 35px;
			    position: absolute;
			    left: 50%;
			    top: 75%;
			    margin-left: -18px;
			    margin-top: -19px;
			    visibility: hidden;
			    -webkit-animation: initLoading 8s 2s linear forwards;
			    -moz-animation: initLoading 8s 2s linear forwards;
			}
			.visible{
				visibility: visible;
			}
			.hide{
				visibility: hidden;
			}
			@-webkit-keyframes shake{
				0% { left:0; }
				20% { left:10px; }
				40% { left:-10px; }
				60% { left:10px; }
				80% { left:-10px; }
				100% { left:0px; }

			}
			@-moz-keyframes shake{
				0% { left:0; }
				20% { left:10px; }
				40% { left:-10px; }
				60% { left:10px; }
				80% { left:-10px; }
				100% { left:0px; }

			}
			@keyframes shake{
				0% { left:0; }
				20% { left:10px; }
				40% { left:-10px; }
				60% { left:10px; }
				80% { left:-10px; }
				100% { left:0px; }

			}
</style>


	<div class="login-wrap">
		<div class="login" id="loginbox">
			<div class="avatar">
			</div>
			<div id="load" class="spinner"></div>
			<form id="login" class="login-form" onsubmit="login()">
				<input type="text" placeholder="Utilisateur" class="pass" id="inputuser" onkeypress="return runScript(event)" /><span class="arrow" id="arrow">&rarr;</span>
				<input type="password" placeholder="Mot de passe" class="pass" id="inputpass" onkeypress="return runScript(event)" /><span id="arrow_pass" class="arrow" id="arrow">&rarr;</span>

			</form>
		</div>
	</div>
<div class="wrap">
  Project OpenSource on <a href="https://github.com/TwanoO67/omv-web-desk">GitHub</a><br />
  <span class="info"><?php echo $CONF["name"]; ?></span>
 </div>


<script>
	var input_user = document.getElementById("inputuser");
	var input_pass = document.getElementById("inputpass");
	var login_box = document.getElementById("loginbox");
	var loader = document.getElementById("load");
	var arrow = document.getElementById("arrow_pass");

	function runScript(e) {
		if(e.srcElement === input_pass){
			arrow.classList.add('opac');
		}
	    if(e.keyCode == 13){
	        e.preventDefault();
	        //si on a taper un user, on va vers le pass
	        if(e.srcElement === input_user){
		        input_pass.focus();
	        }
	        //sinon on submit le form
	        else {
		        login();
	        }
	        console.log(e);
	        return false;
	    }
	}

	function login(){
		input_user.classList.add("hide");
		input_pass.classList.add("hide");
		arrow.classList.remove('opac');
		loader.classList.add("visible");
		post("/login/auth.php",{
			username: input_user.value,
			password: input_pass.value
		},function(data){
			result = JSON.parse(data);
			console.log(result);
			if(result.authenticated === true){
				document.location = "/";
			}
			else{
				input_user.classList.remove("hide");
				input_pass.classList.remove("hide");
				loader.classList.remove("visible");
				shake();
			}
		});
	}

	function shake(){
		login_box.classList.add("init-shake");
		setTimeout(function(){
			login_box.classList.remove("init-shake");
		}, 1000);
	}

	function post(url,obj,callback){
		var http = new XMLHttpRequest();
		var str = "";
		for (var key in obj) {
		    if (str != "") {
		        str += "&";
		    }
		    str += key + "=" + encodeURIComponent(obj[key]);
		}
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		http.onreadystatechange = function() {//Call a function when the state changes.
		    if(http.readyState == 4 && http.status == 200) {
		        callback(http.responseText);
		    }
		}
		http.send(str);
	}
</script>


</body>
	</html>
