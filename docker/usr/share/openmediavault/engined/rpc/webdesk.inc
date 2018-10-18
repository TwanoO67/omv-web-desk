<?php

require_once 'openmediavault/config.inc';
require_once 'openmediavault/error.inc';
require_once 'openmediavault/notify.inc';
require_once 'openmediavault/rpcservice.inc';

class OMVRpcServiceWebdesk extends OMVRpcServiceAbstract
{
	/**
	 * The main event message path.
	 *
	 * @var string
	 */
	private $eventMessagePath = 'org.openmediavault.services.webdesk';

	/**
	 * Get the base XPath of the service. This is a helper function to avoid
	 * "magic numbers".
	 *
	 * @return string
	 */
	private function getXpath()
	{
		return '/config/services/webdesk';
	}

	/**
	 * Get the name of the RPC service.
	 *
	 * @return string
	 */
	public function getName()
	{
		return 'Webdesk';
	}

	/**
	 * Initialize the RPC service. The RPC methods are registered in this
	 * function with $this->registerMethod.
	 *
	 * @return void
	 */
	public function initialize()
	{
		$this->registerMethod('getSettings');
		$this->registerMethod('setSettings');
	}

	public function getSettings($params, $context)
	{
		// $xmlConfig is needed when reading and writing from the configuration.
		global $xmlConfig;

		// Validate the RPC caller context.
		//
		// validateMethodContext takes the currentcontext as the first
		// parameter. The second paramter is the valid context and that can be
		// OMV_ROLE_ADMINISTRATOR, OMV_ROLE_USER or OMV_ROLE_EVERYONE.
		// This is used to make sure that the right user accesses the method.
		$this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

		// Get the configuration object.
		$object = $xmlConfig->get($this->getXpath());

		// If no data was found, throw an exception and provide the XPath that
		// failed.
		if (is_null($object)) {
			throw new OMVException(
				OMVErrorMsg::E_CONFIG_GET_OBJECT_FAILED,
				$this->getXpath()
			);
		}

		// Modify the result data.
		// boolval and intval converts strings and numbers to their boolean
		// and integer value.
		$object['enable'] = boolval($object['enable']);
		$object['port'] = intval($object['port']);

		return $object;
	}

	public function setSettings($params, $context)
	{
		global $xmlConfig;

		$this->validateMethodContext($context, array(
			"role" => OMV_ROLE_ADMINISTRATOR
		));

		// Validate the parameters of the RPC service method.
		//
		// OpenMediavault uses JSON Schema to validate parameters. A more
		// detailed specification is provided here http://json-schema.org/
		$this->validateMethodParams(
			$params,
			'{
				"type": "object",
				"properties": {
					"enable": {
						"type": "boolean"
					},
					"port":{
						"type": "integer",
						"minimum": 80,
						"maximum": 30000
					}
				}
			}'
		);

		// Update the configuration object.
		$object = [
			'enable' => boolval($params['enable']),
			'port' => $params['port'],
		];

		// Update the configuration file. If it fails it throws an exception.
		if ($xmlConfig->replace($this->getXpath(), $object) === false) {
			throw new OMVException(
				OMVErrorMsg::E_CONFIG_SET_OBJECT_FAILED,
				$this->getXpath()
			);
		}

		// Notify configuration changes.
		//
		// This will notify event listeners such as the service module
		// to perform certain tasks. The most common one is to mark the
		// service as dirty.
		$dispatcher = &OMVNotifyDispatcher::getInstance();
		$dispatcher->notify(OMV_NOTIFY_MODIFY, $this->eventMessagePath, $object);

		return $object;
	}
}

// Register the RPC service.
$rpcServiceMgr = &OMVRpcServiceMgr::getInstance();
$rpcServiceMgr->registerService(new OMVRpcServiceWebdesk());
