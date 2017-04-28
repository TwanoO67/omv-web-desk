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
	/*$directory = build_path(DIRECTORY_SEPARATOR, \OMV\Environment::get("OMV_DOCUMENTROOT_DIR"), "rpc");
	foreach (listdir($directory, "inc") as $path) {
		require_once $path;
	}*/


	$rpcServiceMngr = \OMV\Rpc\ServiceManager::getInstance();
	$rpcServiceMngr->initializeServices();
	// Initialize the data models.
	$modelMngr = \OMV\DataModel\Manager::getInstance();
	$modelMngr->load();
	$session = &\OMV\Session::getInstance();

	$params = array(
		"username" => $_POST['username'],
		"password" => $_POST['password']
	);

	$object = \OMV\Rpc\Rpc::call("UserMgmt", "authUser", $params, ['username' => 'admin', 'role' => OMV_ROLE_ADMINISTRATOR], \OMV\Rpc\Rpc::MODE_REMOTE, TRUE);
		if (!is_null($object) && (TRUE === $object['authenticated'])) {
			if ($session->isAuthenticated()) {
				// Is the current session registered to the user to be authenticated?
				if ($session->getUsername() !== $params['username']) {
					$session->commit();
					throw new \OMV\ErrorMsgException( \OMV\ErrorMsgException::E_SESSION_ALREADY_AUTHENTICATED );
				}
			} else {
				// Initialize session.
				$role = ($params['username'] === "admin") ? OMV_ROLE_ADMINISTRATOR : OMV_ROLE_USER;
				$session->initialize($params['username'], $role);
			}
			$session->commit();
		}
		echo json_encode($object);

}
else{
	echo "{'error':'No login information sent.'}";
}
