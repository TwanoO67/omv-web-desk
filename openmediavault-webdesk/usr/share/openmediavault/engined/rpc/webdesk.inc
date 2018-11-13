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

class OMVRpcServiceWebDesk extends \OMV\Rpc\ServiceAbstract
{
    public function getName()
    {
        return "WebDesk";
    }

    public function initialize()
    {
        $this->registerMethod("getSettings");
        $this->registerMethod("setSettings");
        $this->registerMethod("getLinkList");
        $this->registerMethod("getLink");
        $this->registerMethod("setLink");
        $this->registerMethod("deleteLink");
        $this->registerMethod("doRescan");
    }

    public function getSettings($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Get the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get("conf.service.webdesk");
        // Remove useless properties from the object.
        $object->remove("links");
        return $object->getAssoc();
    }

    public function setSettings($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, "rpc.webdesk.setsettings");
        // Get the existing configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get("conf.service.webdesk");
        $object->setAssoc($params);
        $db->set($object);
        // Remove useless properties from the object.
        $object->remove("links");
        // Return the configuration object.
        return $object->getAssoc();
    }

    public function getLinkList($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, "rpc.common.getlist");
        // Get the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $objects = $db->get("conf.service.webdesk.link");
        // Add additional link informations.
        $objectsAssoc = [];
        foreach ($objects as $objectk => &$objectv) {
          // Add the new property 'sharedfoldername'.
          /*$objectv->add("sharedfoldername", "string", gettext("n/a"));
          // Get the shared folder configuration object.
          $sfObject = $db->get("conf.system.sharedfolder",
              $objectv->get("sharedfolderref"));
          // Update the 'sharedfoldername' property.
          $objectv->set("sharedfoldername", $sfObject->get("name"));*/
          $objectsAssoc[] = $objectv->getAssoc();
      }
      // Filter the result.
      return $this->applyFilter($objectsAssoc, $params['start'], $params['limit'],
          $params['sortfield'], $params['sortdir']);
    }

    public function getLink($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, "rpc.common.objectuuid");
        // Get the configuration object.
        $db = \OMV\Config\Database::getInstance();
        return $db->getAssoc("conf.service.webdesk.link", $params['uuid']);
    }

    public function setLink($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, "rpc.webdesk.setlink");
        // Prepare the configuration object.
        $object = new \OMV\Config\ConfigObject("conf.service.webdesk.link");
        $object->setAssoc($params);
        // Set the configuration object.
        $isNew = $object->isNew();
        $db = \OMV\Config\Database::getInstance();
        /*if (TRUE === $isNew) {
            // Check uniqueness - Linkd folder
            $db->assertIsUnique($object, "uuid");
        }*/
        $db->set($object);
        // Return the configuration object.
        return $object->getAssoc();
    }

    public function deleteLink($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, "rpc.common.objectuuid");
        // Delete the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get("conf.service.webdesk.link", $params['uuid']);
        $db->delete($object);
        // Return the deleted configuration object.
        return $object->getAssoc();
    }

    public function doRescan($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ["role" => OMV_ROLE_ADMINISTRATOR]);
        // Get the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get("conf.service.webdesk");
        if (TRUE !== $object->get("enable"))
            return;
        exec("systemctl force-reload webdesk", $output);
    }
}
