<?php

require_once 'openmediavault/config.inc';
require_once 'openmediavault/error.inc';
require_once 'openmediavault/initscript.inc';
require_once 'openmediavault/module.inc';

class OMVModuleNg2os extends OMVModuleServiceAbstract implements
	OMVINotifyListener,
	OMVIModuleServiceStatus
{
	/**
	 * The main event message path.
	 *
	 * @var string
	 */
	private $eventMessagePath = 'org.openmediavault.services.ng2os';
	}
	
	/**
	 * Get the base XPath of the service. This is a helper function to avoid 
	 * "magic numbers".
	 *
	 * @return string
	 */
	private function getXpath()
	{
		return '/config/services/ng2os';
	}

	/**
	 * Get the module name.
	 *
	 * @return string
	 */
	public function getName()
	{
		return 'ng2os';
	}

	/**
	 * Get the module status.
	 *
	 * @return array
	 *
	 * @throws OMVException
	 */
	public function getStatus()
	{
		global $xmlConfig;

		// Get the configuration object.
		$object = $xmlConfig->get($this->getXpath());

		if (is_null($object)) {
			throw new OMVException(
				OMVErrorMsg::E_CONFIG_GET_OBJECT_FAILED,
				$this->getXpath()
			);
		}
		
		// Return the status of the service. This information is displayed
		// under Diagnostics/Services.
		return array(
			'name' => $this->getName(),
			'title' => gettext('Ng2os'),
			'enabled' => boolval($object['enable']),
			'running' => false
		);
	}

	/**
	 * Generate the configuration.
	 *
	 * @return void
	 *
	 * @throws OMVException
	 */
	public function applyConfig()
	{
		global $xmlConfig;

		$cmd = sprintf('export LANG=C; omv-mkconf %s 2>&1', $this->getName());

		if (0 !== $this->exec($cmd, $output)) {
			throw new OMVException(
				OMVErrorMsg::E_EXEC_FAILED,
				$cmd,
				implode(PHP_EOL, $output)
			);
		}
	}

	/**
	 * Bind listeners.
	 *
	 * @param OMVNotifyDispatcher $dispatcher
	 * @return void
	 */
	public function bindListeners(OMVNotifyDispatcher $dispatcher)
	{
		$moduleMgr = &OMVModuleMgr::getInstance();
		
		// Add listeners here. The most common thing is to monitor configuration
		// changes on the service. When the config is changed the module
		// sets itself as dirty (as seen below). Setting a module as dirty
		// makes the apply button appear in the web interface (which in turn
		// calls the applyConfig function on each module with a dirty state).
		$dispatcher->addListener(
			OMV_NOTIFY_MODIFY,
			$this->eventMessagePath,
			[$this, 'setDirty']
		);
	}
}

// Register the module.
$moduleMgr = &OMVModuleMgr::getInstance();
$moduleMgr->registerModule(new OMVModuleNg2os());