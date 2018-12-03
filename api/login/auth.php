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
      $js = 'WEBDESK_CONFIG = '.json_encode($str, JSON_PRETTY_PRINT );

      file_put_contents('/etc/webdesk/webdesk_config.js',$js);

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
  $CONF = require('./config.php');
  $CONF["iconWidth"] = 100;
  $CONF["username"] = $session->getUsername();
  $CONF["navbar"] = buildNavBar($context,$session);
  $CONF["dock"] = buildDock($context,$session);

  return $CONF;
};

function buildNavBar($context,$session) {
  return [
    [
      "label" => $session->getUsername(),
      "submenu" => [
        [
          "label" => "Disconnect",
          "link" => "/login/logout.php"
        ]
      ]
    ]
  ];

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

  return [
    "default" => [
      [
        "uuid" => "about",
        "image"=> "/assets/flatjoy-circle-deviantart/Apple.png",
        "title"=> "Présentation",
        "text"=> "Welcome on OMV WebDesk, Please remember to configure your own 'Links' on the plugin page.",
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
  ];
};
