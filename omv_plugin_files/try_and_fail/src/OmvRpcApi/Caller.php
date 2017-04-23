<?php
	namespace OMVWebDesk\OmvRpcApi;
	
	class Caller{
		
		private $CONF;
		
		public function __construct() {
			//conf
			$this->CONF = require('./config.php');
		}
		
		public function call($data){
			
			$ch = curl_init( $this->CONF["omv_api_rpc"] );
			# Setup request to send json via POST.
			$payload = json_encode( $data );
			curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
			curl_setopt($ch, CURLOPT_VERBOSE, true);
			curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
			# Return response instead of printing.
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			
			
			# Send request.
			$result = curl_exec($ch);
			curl_close($ch);
			
			$data = json_decode($result,true);
			return $data;
			
		}
		
	}