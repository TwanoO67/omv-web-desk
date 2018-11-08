<?php

/**
 * Copyright (C) 2009-2013 Volker Theile <volker.theile@openmediavault.org>
 * Copyright (C) 2013-2017 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

class OMVModuleWebDesk extends \OMV\Engine\Module\ServiceAbstract
    implements \OMV\Engine\Notify\IListener, \OMV\Engine\Module\IServiceStatus
{
    public function getName()
    {
        return "webdesk";
    }

    public function applyConfig()
    {
        $cmd = new \OMV\System\Process("omv-mkconf", "phpfpm.d/90-webdesk");
        $cmd->setRedirect2to1();
        $cmd->execute();

        $cmd = new \OMV\System\Process("omv-mkconf", "nginx.d/90-webdesk");
        $cmd->setRedirect2to1();
        $cmd->execute();
    }

    /*public function startService()
    {
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get("conf.service.webdesk");
        if (TRUE !== $object->get("enable"))
            return;
        // Start this service and enable the unit file.
        $systemCtl = new \OMV\System\SystemCtl("webdesk");
        $systemCtl->enable(TRUE);
    }

    public function stopService()
    {
        $systemCtl = new \OMV\System\SystemCtl("webdesk");
        $systemCtl->disable(TRUE);
    }*/

    public function getStatus()
    {
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get("conf.service.webdesk");
        //$systemCtl = new \OMV\System\SystemCtl("webdesk");
        return array(
            "name" => $this->getName(),
            "title" => gettext("WebDesk"),
            "enabled" => $object->get("enable"),
            "running" => false//$systemCtl->isActive()
        );
    }

    /*final public function onSharedFolder($type, $path, $object)
    {
        $db = \OMV\Config\Database::getInstance();
        if (TRUE === $db->exists("conf.service.webdesk.share", [
            "operator" => "stringEquals",
            "arg0" => "sharedfolderref",
            "arg1" => $object['uuid']
        ])) {
            $this->setDirty();
        }
    }*/

    public function bindListeners(\OMV\Engine\Notify\Dispatcher $dispatcher)
    {
        $dispatcher->addListener(
            OMV_NOTIFY_MODIFY,
            "org.openmediavault.conf.service.webdesk",
            [ $this, "setDirty" ]
        );
        $dispatcher->addListener(
            OMV_NOTIFY_CREATE | OMV_NOTIFY_MODIFY | OMV_NOTIFY_DELETE,
            "org.openmediavault.conf.service.webdesk.link",
            [ $this, "setDirty" ]
        );
        /*$dispatcher->addListener(
            OMV_NOTIFY_MODIFY,
            "org.openmediavault.conf.system.sharedfolder",
            [ $this, "onSharedFolder" ]
        );
        $dispatcher->addListener(
            OMV_NOTIFY_MODIFY,
            "org.openmediavault.conf.system.sharedfolder.privilege",
            [ $this, "onSharedFolder" ]
        );*/
    }
}
