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
// require("js/omv/workspace/grid/Panel.js")
// require("js/omv/workspace/window/Form.js")
// require("js/omv/workspace/window/plugin/ConfigObject.js")
// require("js/omv/Rpc.js")
// require("js/omv/data/Store.js")
// require("js/omv/data/Model.js")
// require("js/omv/data/proxy/Rpc.js")
// require("js/omv/form/field/SharedFolderComboBox.js")

Ext.define("OMV.module.admin.service.webdesk.Link", {
    extend : "OMV.workspace.window.Form",
    uses   : [
        //"OMV.form.field.SharedFolderComboBox",
        "OMV.workspace.window.plugin.ConfigObject"
    ],

    rpcService   : "WebDesk",
    rpcGetMethod : "getLink",
    rpcSetMethod : "setLink",
    plugins      : [{
        ptype : "configobject"
    }],

    getFormItems : function () {
        var me = this;
        return [
          {
            name: "image",
            xtype: "textfield",
            fieldLabel : _("Image"),
            plugins    : [{
              ptype : "fieldinfo",
              text  : _("example: /assets/flatjoy-circle-deviantart/Apple.png")
            }]
          },
          {
            name: "title",
            xtype: "textfield",
            fieldLabel : _("Title"),
            plugins    : [{
              ptype : "fieldinfo",
              text  : _("example: Finder")
            }]
          },
          {
            name: "text",
            xtype: "textfield",
            fieldLabel : _("Text"),
            plugins    : [{
              ptype : "fieldinfo",
              text  : _("example: empty if iframe")
            }]
          },
          {
            name: "iframe",
            xtype: "textfield",
            fieldLabel : _("Iframe"),
            plugins    : [{
              ptype : "fieldinfo",
              text  : _("example: /elfinder/elfinder.html")
            }]
          }
        ];
    }
});

Ext.define("OMV.module.admin.service.webdesk.Links", {
    extend   : "OMV.workspace.grid.Panel",
    requires : [
        "OMV.Rpc",
        "OMV.data.Store",
        "OMV.data.Model",
        "OMV.data.proxy.Rpc"
    ],
    uses     : [
        "OMV.module.admin.service.webdesk.Link"
    ],

    hidePagingToolbar : false,
    stateful          : true,
    stateId           : "9889057b-b2c0-4c48-a4c1-8c9b4fb54d7brandom",
    columns           : [{
      xtype     : "textcolumn",
      text      : _("Image"),
      sortable  : true,
      dataIndex : "image",
      stateId   : "image"
    },{
      xtype     : "textcolumn",
      text      : _("Title"),
      sortable  : true,
      dataIndex : "title",
      stateId   : "title"
    }],

    initComponent : function () {
        var me = this;
        Ext.apply(me, {
            store : Ext.create("OMV.data.Store", {
                autoLoad : true,
                model    : OMV.data.Model.createImplicit({
                    idProperty : "uuid",
                    fields     : [
                        { name  : "uuid", type: "string" },
                        { name  : "image", type: "string" },
                        { name  : "text", type: "string" },
                        { name  : "title", type: "string" },
                        { name  : "iframe", type: "string" }
                    ]
                }),
                proxy    : {
                    type    : "rpc",
                    rpcData : {
                        service : "WebDesk",
                        method  : "getLinkList"
                    }
                }
            })
        });
        me.callParent(arguments);
    },

    onAddButton: function () {
        var me = this;
        Ext.create("OMV.module.admin.service.webdesk.Link", {
            title     : _("Add link"),
            uuid      : OMV.UUID_UNDEFINED,
            listeners : {
                scope  : me,
                submit : function () {
                    this.doReload();
                }
            }
        }).show();
    },

    onEditButton: function () {
        var me = this;
        var record = me.getSelected();
        Ext.create("OMV.module.admin.service.webdesk.Link", {
            title     : _("Edit link"),
            uuid      : record.get("uuid"),
            listeners : {
                scope  : me,
                submit : function () {
                    this.doReload();
                }
            }
        }).show();
    },

    doDeletion: function (record) {
        var me = this;
        OMV.Rpc.request({
            scope    : me,
            callback : me.onDeletion,
            rpcData  : {
                service : "WebDesk",
                method  : "deleteLink",
                params  : {
                    uuid: record.get("uuid")
                }
            }
        });
    }
});

OMV.WorkspaceManager.registerPanel({
    id        : "links",
    path      : "/service/webdesk",
    text      : _("Links"),
    position  : 20,
    className : "OMV.module.admin.service.webdesk.Links"
});
