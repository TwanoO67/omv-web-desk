<?php

error_reporting(E_NOTICE && E_ALL); // Set E_ALL for debuging

require_once("openmediavault/autoloader.inc");
require_once("openmediavault/env.inc");
require_once("openmediavault/functions.inc");
require_once("openmediavault/globals.inc");

use OMV\Rpc\Rpc;
use OMV\System\MountPoint;

session_start();

//si on cherche a se connecter
if( isset( $_POST['username'] ) && isset($_POST['password'] ) ){

	// Load and initialize the RPC services that are not handled by the
	// engine daemon.
	$directory = build_path(DIRECTORY_SEPARATOR, \OMV\Environment::get("OMV_DOCUMENTROOT_DIR"), "rpc");
	foreach (listdir($directory, "inc") as $path) {
		require_once $path;
	}


	$rpcServiceMngr = \OMV\Rpc\ServiceManager::getInstance();
	$rpcServiceMngr->initializeServices();
	// Initialize the data models.
	$modelMngr = \OMV\DataModel\Manager::getInstance();
	$modelMngr->load();
	$session = &\OMV\Session::getInstance();


	if ( $session->isAuthenticated() && $session->isTimeout() ) {
		session_destroy();
		session_start();
		//$session = &\OMV\Session::getInstance();
	}

	$params = array(
		"username" => $_POST['username'],
		"password" => $_POST['password']
  );

  $context = ['username' => 'admin', 'role' => OMV_ROLE_ADMINISTRATOR];

	$object = \OMV\Rpc\Rpc::call("UserMgmt", "authUser", $params, $context , \OMV\Rpc\Rpc::MODE_REMOTE, TRUE);
		if (!is_null($object) && (TRUE === $object['authenticated'])) {
			if ( ! $session->isAuthenticated() ){
				// Initialize session.
				$role = ($params['username'] === "admin") ? OMV_ROLE_ADMINISTRATOR : OMV_ROLE_USER;
				$session->initialize($params['username'], $role);
				$session->commit();
      }

      //construction de la config
      $str = buildConfig($context,$session);
      file_put_contents('/etc/webdesk/webdesk_config.js',$str);

    }
		echo json_encode($object);
}
else{
	echo "{'error':'No login information sent.'}";
}

/*
  Construction de la config
*/

function buildConfig($context,$session) {
  return 'WEBDESK_CONFIG = {
    "iconWidth": 100,
    "username": "'.$session->getUsername().'",
    "navbar" : '.buildNavBar($context,$session).',
    "dock" : '.buildDock($context,$session).'
  }';
};

function buildNavBar($context,$session) {
  return '[
    {
      "label": "'.$session->getUsername().'",
      "submenu":[{
        "label": "Disconnect",
        "link":"/login/logout.php"
      }]
    },

  ]';

  /*{
      "label": "File",
      "submenu": [
        {"label": "New Window"},
        {"label": "New File"},
        {"label": "Save As"},
        {"label": "Save All"},
        {"label": "Close"},
        {"label": "Close All"}
      ]
    },
    {
      "label": "Edit",
      "submenu": [
        {"label": "New Window"},
        {"label": "New File"}
      ]
    },
    {
      "label": "View",
      "submenu": [
        {"label": "Close"},
        {"label": "Close All"}
      ]
    }*/
};

function buildDock($context,$session) {
  $links = \OMV\Rpc\Rpc::call("WebDesk", "getLinkList", [], $context , \OMV\Rpc\Rpc::MODE_REMOTE, TRUE);

  $prep = [];

  foreach($links['data'] as $link){
    //ajout des champs necessaires
    $link["opened"] = false;
    $link["selected"] = false;
    $ref["selected"] = false;

    $prep[] = $link;
  }

  return json_encode([
    "default" => [
      [
        "uuid" => "about",
        "image"=> "/assets/flatjoy-circle-deviantart/Apple.png",
        "title"=> "Présentation",
        "text"=> "Bienvenue, sur l\'interface de gestion de Bureau virtuel. N\'oubliez pas de changer les url d\'iframe et de configurer vos propres icones",
        "opened"=> false,
        "selected"=> false,
        "ref"=> null
      ],
      [
        "uuid"=> "elfinder",
        "image"=> "/assets/flatjoy-circle-deviantart/Folder%20Files.png",
        "iframe"=> "/elfinder/elfinder.html",
        "title"=> "Finder"
      ]
      ],
      $session->getUsername() => $prep
    ], JSON_PRETTY_PRINT );

  /*return '{
    "username": [
      {
        "id": "about",
        "image": "/assets/flatjoy-circle-deviantart/Apple.png",
        "title": "Présentation",
        "text": " TEST with your username",
        "opened": false,
        "selected": false,
        "ref": null
      }
    ],
    "default" : [
      {
        "id": "about",
        "image": "/assets/flatjoy-circle-deviantart/Apple.png",
        "title": "Présentation",
        "text": "Bienvenue, sur l\'interface de gestion de Bureau virtuel. N\'oubliez pas de changer les url d\'iframe et de configurer vos propres icones",
        "opened": false,
        "selected": false,
        "ref": null
      },
      {
        "id": "elfinder",
        "image": "/assets/flatjoy-circle-deviantart/Folder%20Files.png",
        "iframe": "/elfinder/elfinder.html",
        "title": "Finder"
      },
      {
        "id": "omv",
        "image": "/assets/flatjoy-circle-deviantart/Chip.png",
        "iframe": "http://your-omv-ip/",
        "title": "OpenMediaVault",
        "opened": false,
        "selected": false,
        "ref": null
      },
      {
        "id": "network",
        "image": "/assets/flatjoy-circle-deviantart/Devices.png",
        "iframe": "http://your-router",
        "title": "Réseau"
      },
      {
        "id": "sickrage",
        "image": "/assets/flatjoy-circle-deviantart/Cone.png",
        "iframe": "http://your-sickrage-install/",
        "title": "SickRage"
      }
    ]
  }';*/
};

