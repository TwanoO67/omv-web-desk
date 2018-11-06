<?php

	require_once("openmediavault/autoloader.inc");
	require_once("openmediavault/env.inc");
	use OMV\Rpc\Rpc;

	// Display errors if debugging is enabled.
	if (TRUE === \OMV\Environment::getBoolean("OMV_DEBUG_PHP")){
		ini_set("display_errors", 1);
	}

	$session = &\OMV\Session::getInstance();
	$session->start();

	$roots = [];

	if ($session->isAuthenticated() /*&& !$session->isTimeout()*/) {

		if($session->getUsername() == 'admin'){
			$roots = [
				[
					'driver'        => 'LocalFileSystem',           // driver for accessing file system (REQUIRED)
					'path'          => "/media",                 // path to files (REQUIRED)
					'URL'           => dirname($_SERVER['PHP_SELF']) . '/media', // URL to files (REQUIRED)
					//'uploadDeny'    => array('all'),                // All Mimetypes not allowed to upload
					'uploadAllow'   => array('all'),//array('image', 'text/plain'),// Mimetype `image` and `text/plain` allowed to upload
					'uploadOrder'   => array('deny', 'allow'),      // allowed Mimetype `image` and `text/plain` only
					'accessControl' => 'access'                     // disable and hide dot starting files (OPTIONAL)
				]
			];
		}
		else{
			//echo "<script> OMV = {}; OMV.USERNAME = '".$session->getUsername()."'; </script>";
			$rpcServiceMngr = \OMV\Rpc\ServiceManager::getInstance();
			$rpcServiceMngr->initializeServices();
			// Initialize the data models.
			$modelMngr = \OMV\DataModel\Manager::getInstance();
			$modelMngr->load();

			$service = "ShareMgmt";
			$method = "getList";
			$params = array(
			"start" => 0 ,
			"limit" => null
			);
			//$context = Rpc::createContext($session->getUsername(), $session->getRole());
			//var_dump($context);exit;
			$admin_context = Rpc::createContext("admin", OMV_ROLE_ADMINISTRATOR);

			$result = Rpc::call($service, $method, $params, $admin_context, Rpc::MODE_REMOTE);

			foreach($result['data'] as $folder){
				if($folder['privileges'] !== '' && is_array($folder['privileges']['privilege']) ){
					foreach($folder['privileges']['privilege'] as $perm){
						if($perm['name'] === $session->getUsername()){
							$dossier = $folder['mntent']['dir'].'/'.$folder['reldirpath'];

							$conf = array(
								'driver'        => 'LocalFileSystem',        // driver for accessing file system (REQUIRED)
								'path'          => $dossier,                 // path to files (REQUIRED)
								'URL'           => dirname($_SERVER['PHP_SELF']) .$dossier, // URL to files (REQUIRED)
								'uploadOrder'   => array('deny', 'allow'),      // allowed Mimetype `image` and `text/plain` only
								'accessControl' => 'access'                     // disable and hide dot starting files (OPTIONAL)
							);

							//ecriture
							if($perm['perms'] === 7){
								//All Mimetypes, or array('image', 'text/plain') allowed to upload
								$conf = array_merge($conf, ['uploadAllow'   => ['all']]);
							}
							else{
								$conf = array_merge($conf, ['uploadDeny'   => ['all']]);
							}

							$roots[] = $conf;
						}
						/*else{
							echo "coucou";
						}*/
					}
				}
			}
		}
	}
	else{
		echo "pas de session";
		exit;
	}

	//exit;

// elFinder autoload
require './autoload.php';
// ===============================================

// Enable FTP connector netmount
elFinder::$netDrivers['ftp'] = 'FTP';
// ===============================================
function access($attr, $path, $data, $volume) {
	return strpos(basename($path), '.') === 0       // if file/folder begins with '.' (dot)
		? !($attr == 'read' || $attr == 'write')    // set read+write to false, other (locked+hidden) set to true
		:  null;                                    // else elFinder decide it itself
}


// Documentation for connector options:
// https://github.com/Studio-42/elFinder/wiki/Connector-configuration-options
$opts = array(
	// 'debug' => true,
	'locale' => "fr_FR.UTF-8",
	'roots' => $roots);

// run elFinder
$connector = new elFinderConnector(new elFinder($opts));
$connector->run();
