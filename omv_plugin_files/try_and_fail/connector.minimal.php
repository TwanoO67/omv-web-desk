<?php

error_reporting(0); // Set E_ALL for debuging

//AW - verif si session omv
session_start();
if(
	!isset($_SESSION['authenticated'])
	|| !$_SESSION['authenticated']
	|| !$_SESSION['username']
	|| !$_SESSION['username'] === ""
){
	exit;
}

//Verif si le username est clean pour déduire un nom de dossier
$dossier = "../files/anonymous/";
if( strpos($_SESSION['username'],'.') === false && strpos($_SESSION['username'],'/') === false){
	$dossier = "../files/".$_SESSION['username']."/";
}
/*
//$output = shell_exec ( "omv-rpc ShareMgmt getList \"{'start':1,'limit':20}\"" );
//var_dump($output);
//echo "test".$_SESSION['username'];

try {
	require_once("openmediavault/autoloader.inc");
	require_once("openmediavault/env.inc");
	require_once("openmediavault/functions.inc");
	
	// Load and initialize the RPC services that are not handled by the
	// engine daemon.
	$directory = build_path(DIRECTORY_SEPARATOR, \OMV\Environment::get(
	  "OMV_DOCUMENTROOT_DIR"), "rpc");
	  echo $directory;
	foreach (listdir($directory, "inc") as $path) {
		require_once $path;
	}
	
	
	$rpcServiceMngr = &\OMV\Rpc\ServiceManager::getInstance();
	$rpcServiceMngr->initializeServices();
	// Initialize the data models.
	$modelMngr = \OMV\DataModel\Manager::getInstance();
	$modelMngr->load();
	$session = &\OMV\Session::getInstance();
	$session->start();
	//$session->initialize("admin", \OMV\ControlPanel\Administration::MODE_ADMINISTRATOR );
	
	//var_dump($session->getUsername().$session->getRole());
	
	$service = "ShareMgmt";
	$method = "getList";
	$params = array(
	"start" => 0 ,
	"limit" => null
	);
	$context = \OMV\Rpc\Rpc::createContext($session->getUsername(), $session->getRole());
	$result = \OMV\Rpc\Rpc::call($service, $method, $params, $context);
	var_dump($result);

	//$server = new \OMV\Rpc\Proxy\Json();
	//$server->handle();
	//$server->cleanup();
	
	
	
} catch(\Exception $e) {
	if (isset($server))
		$server->cleanup();
	header("Content-Type: application/json");
	print json_encode_safe(array(
		"response" => null,
		"error" => array(
			"code" => $e->getCode(),
			"message" => $e->getMessage(),
			"trace" => $e->__toString()
		)
	));
}
exit;
*/

// load composer autoload before load elFinder autoload If you need composer
//require './vendor/autoload.php';

// elFinder autoload
require './autoload.php';
// ===============================================

// Enable FTP connector netmount
elFinder::$netDrivers['ftp'] = 'FTP';
// ===============================================

/**
 * # Dropbox volume driver need `composer require dropbox-php/dropbox-php:dev-master@dev`
 *  OR "dropbox-php's Dropbox" and "PHP OAuth extension" or "PEAR's HTTP_OAUTH package"
 * * dropbox-php: http://www.dropbox-php.com/
 * * PHP OAuth extension: http://pecl.php.net/package/oauth
 * * PEAR's HTTP_OAUTH package: http://pear.php.net/package/http_oauth
 *  * HTTP_OAUTH package require HTTP_Request2 and Net_URL2
 */
// // Required for Dropbox.com connector support
// // On composer
// elFinder::$netDrivers['dropbox'] = 'Dropbox';
// // OR on pear
// include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeDropbox.class.php';

// // Dropbox driver need next two settings. You can get at https://www.dropbox.com/developers
// define('ELFINDER_DROPBOX_CONSUMERKEY',    '');
// define('ELFINDER_DROPBOX_CONSUMERSECRET', '');
// define('ELFINDER_DROPBOX_META_CACHE_PATH',''); // optional for `options['metaCachePath']`
// ===============================================

// // Required for Google Drive network mount
// // Installation by composer
// // `composer require nao-pon/flysystem-google-drive:~1.1 google/apiclient:~2.0@rc nao-pon/elfinder-flysystem-driver-ext`
// // Enable network mount
// elFinder::$netDrivers['googledrive'] = 'FlysystemGoogleDriveNetmount';
// // GoogleDrive Netmount driver need next two settings. You can get at https://console.developers.google.com
// // AND reuire regist redirect url to "YOUR_CONNECTOR_URL?cmd=netmount&protocol=googledrive&host=1"
// define('ELFINDER_GOOGLEDRIVE_CLIENTID',     '');
// define('ELFINDER_GOOGLEDRIVE_CLIENTSECRET', '');
// ===============================================

/**
 * Simple function to demonstrate how to control file access using "accessControl" callback.
 * This method will disable accessing files/folders starting from '.' (dot)
 *
 * @param  string  $attr  attribute name (read|write|locked|hidden)
 * @param  string  $path  file path relative to volume root directory started with directory separator
 * @return bool|null
 **/
function access($attr, $path, $data, $volume) {
	return strpos(basename($path), '.') === 0       // if file/folder begins with '.' (dot)
		? !($attr == 'read' || $attr == 'write')    // set read+write to false, other (locked+hidden) set to true
		:  null;                                    // else elFinder decide it itself
}


// Documentation for connector options:
// https://github.com/Studio-42/elFinder/wiki/Connector-configuration-options
$opts = array(
	// 'debug' => true,
	'roots' => array(
		array(
			'driver'        => 'LocalFileSystem',           // driver for accessing file system (REQUIRED)
			'path'          => $dossier,                 // path to files (REQUIRED)
			'URL'           => dirname($_SERVER['PHP_SELF']) . '/'.$dossier, // URL to files (REQUIRED)
			//'uploadDeny'    => array('all'),                // All Mimetypes not allowed to upload
			'uploadAllow'   => array('all'),//array('image', 'text/plain'),// Mimetype `image` and `text/plain` allowed to upload
			'uploadOrder'   => array('deny', 'allow'),      // allowed Mimetype `image` and `text/plain` only
			'accessControl' => 'access'                     // disable and hide dot starting files (OPTIONAL)
		)
	)
);

// run elFinder
$connector = new elFinderConnector(new elFinder($opts));
$connector->run();
