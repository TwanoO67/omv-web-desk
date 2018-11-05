/**
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @author    OpenMediaVault Plugin Developers <plugins@omv-extras.org>
 * @copyright Copyright (c) 2009-2013 Volker Theile
 * @copyright Copyright (c) 2013-2017 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")

Ext.define("OMV.module.admin.service.webdesk.Settings", {
    extend : "OMV.workspace.form.Panel",

    rpcService   : "WebDesk",
    rpcGetMethod : "getSettings",
    rpcSetMethod : "setSettings",

    plugins : [{
        ptype        : "linkedfields",
        correlations : [{
            name        : [
               "enable"
            ],
            conditions  : [
                { name : "enable", value : true }
            ],
            properties : function(valid, field) {
                this.setButtonDisabled("rescan", !valid);
            }
        }]
    }],

    getButtonItems : function() {
        var me = this;
        var items = me.callParent(arguments);
        items.push({
            id       : me.getId() + "-rescan",
            xtype    : "button",
            text     : _("Rescan"),
            icon     : "images/reboot.png",
            iconCls  : Ext.baseCSSPrefix + "btn-icon-16x16",
            disabled : true,
            scope    : me,
            handler  : function() {
                // Execute RPC.
                OMV.Rpc.request({
                    scope       : this,
                    callback    : function(id, success, response) {
                        this.doReload();
                    },
                    relayErrors : false,
                    rpcData     : {
                        service  : "WebDesk",
                        method   : "doRescan"
                    }
                });
            }
        });
        return items;
    },

    getFormItems : function () {
        return [{
            xtype         : "fieldset",
            title         : _("General settings"),
            fieldDefaults : {
                labelSeparator : ""
            },
            items : [{
                xtype      : "checkbox",
                name       : "enable",
                fieldLabel : _("Enable"),
                checked    : false
            },{
                xtype      : "textfield",
                name       : "name",
                value      : _("MiniDLNA on OpenMediaVault"),
                fieldLabel : _("Name")
            },{
                xtype         : "numberfield",
                name          : "port",
                fieldLabel    : _("Port"),
                vtype         : "port",
                minValue      : 1,
                maxValue      : 65535,
                allowDecimals : false,
                allowBlank    : false,
                value         : 8200
            }/*,{
                xtype      : "checkbox",
                name       : "strict",
                fieldLabel : _("Strict DLNA"),
                boxLabel   : _("Strictly adhere to DLNA standards."),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "tivo",
                fieldLabel : _("TiVo support"),
                checked    : false
            },{
                xtype         : "combo",
                name          : "rootcontainer",
                fieldLabel    : _("Root Container"),
                queryMode     : "local",
                store : [
                    [ ".", _("Standard") ],
                    [ "B", _("Browse") ],
                    [ "M", _("Music") ],
                    [ "P", _("Pictures") ],
                    [ "V", _("Video") ]
                ],
                editable      : false,
                triggerAction : "all",
                value         : "."
            },{
                xtype      : "combo",
                name       : "loglevel",
                fieldLabel : _("Log Level"),
                mode       : "local",
                store      : new Ext.data.SimpleStore({
                    fields  : [ "value", "text" ],
                    data    : [
                        [ "off", _("Off") ],
                        [ "fatal", _("Fatal") ],
                        [ "error", _("Error") ],
                        [ "warn", _("Warn") ],
                        [ "info", _("Info") ],
                        [ "debug", _("Debug") ]
                    ]
                }),
                displayField  : "text",
                valueField    : "value",
                allowBlank    : false,
                editable      : false,
                triggerAction : "all",
                value         : "error"
            },{
                xtype      : "textarea",
                name       : "extraoptions",
                fieldLabel : _("Extra options"),
                allowBlank : true
            }*/]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id        : "settings",
    path      : "/service/webdesk",
    text      : _("Settings"),
    position  : 10,
    className : "OMV.module.admin.service.webdesk.Settings"
});
