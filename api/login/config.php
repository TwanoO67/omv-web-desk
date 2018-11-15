<?php

use OMV\Rpc\Rpc;
$context = ['username' => 'admin', 'role' => OMV_ROLE_ADMINISTRATOR];
$object = \OMV\Rpc\Rpc::call("WebDesk", "getSettings", [], $context , \OMV\Rpc\Rpc::MODE_REMOTE, TRUE);

$config = [
  "name" => "Webdesk on OpenMediaVault",
	"desktop_background" => "/assets/img/bg.jpg",
	"login_background" => "http://i.imgur.com/W8IdvVk.jpg",
	"login_avatar" => "https://pbs.twimg.com/profile_images/1453596088/dessin_antoine_400x400.png"
];

//recupération des valeurs de config si elle existe
foreach( $config as $key => $value){
  if( isset( $object[$key] )){
    $config[$key] = $object[$key];
  }
}

return $config;
