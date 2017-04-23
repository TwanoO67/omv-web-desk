<?php
	
	
	include_once('./vendor/autoload.php');
	
	$RPCCaller = new OMVWebDesk\OmvRpcApi\Caller();
	
	$data = array( 
		"service"=> "UserMgmt", 
		"method" => "getUser", 
		"params" => array(
			"name" => "admin"
		)

	);
		
	$data = $RPCCaller->call($data);
	echo json_encode($data);



exit;

include_once('./vendor/autoload.php');
use Docker\Docker;                   
use Docker\API\Model\ContainerConfig;
use Docker\API\Model\HostConfig;

$docker = new Docker();
$containerManager = $docker->getContainerManager();
$containers = $docker->getContainerManager()->findAll();
//var_dump($containers);

$datas = [];
foreach($containers as $container){
	$data = [
		"id" => $container->getID(),
		"name" => $container->getNames()[0],
		"image" => $container->getImage(),
		"state" => $container->getState(),
		"status" => $container->getStatus(),
		"ports" => $container->getPorts()
	];
	$datas[] = $data;
}
echo json_encode($datas);
