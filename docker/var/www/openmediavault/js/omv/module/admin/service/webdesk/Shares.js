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

Ext.define("OMV.module.admin.service.webdesk.Share", {
    extend : "OMV.workspace.window.Form",
    uses   : [
        "OMV.form.field.SharedFolderComboBox",
        "OMV.workspace.window.plugin.ConfigObject"
    ],

    rpcService   : "WebDesk",
    rpcGetMethod : "getShare",
    rpcSetMethod : "setShare",
    plugins      : [{
        ptype : "configobject"
    }],

    getFormItems : function () {
        var me = this;
        return [{
            xtype      : "sharedfoldercombo",
            name       : "sharedfolderref",
            fieldLabel : _("Shared Folder"),
            readOnly   : (me.uuid !== OMV.UUID_UNDEFINED),
            plugins    : [{
                ptype : "fieldinfo",
                text  : _("Shared folder containing media files")
            }]
        },{
            xtype         : "combo",
            name          : "mtype",
            fieldLabel    : _("Content Type"),
            queryMode     : "local",
            store : [
                [ "A", _("Audio") ],
                [ "P", _("Images") ],
                [ "V", _("Video") ],
                [ "", _("All media") ]
            ],
            editable      : false,
            triggerAction : "all",
            value         : ""
        }];
    }
});

Ext.define("OMV.module.admin.service.webdesk.Shares", {
    extend   : "OMV.workspace.grid.Panel",
    requires : [
        "OMV.Rpc",
        "OMV.data.Store",
        "OMV.data.Model",
        "OMV.data.proxy.Rpc"
    ],
    uses     : [
        "OMV.module.admin.service.webdesk.Share"
    ],

    hidePagingToolbar : false,
    stateful          : true,
    stateId           : "9889057b-b2c0-4c48-a4c1-8c9b4fb54d7b",
    columns           : [{
        xtype     : "textcolumn",
        text      : _("Shared Folder"),
        sortable  : true,
        dataIndex : "sharedfoldername",
        stateId   : "sharedfoldername"
    },{
        xtype     : "textcolumn",
        text      : _("Content Type(s)"),
        sortable  : true,
        dataIndex : "mtype",
        stateId   : "mtype",
        renderer  : function (value) {
            var content;
            switch (value) {
            case 'A':
                content = _("Audio");
                break;
            case 'P':
                content = _("Images");
                break;
            case 'V':
                content = _("Video");
                break;
            default:
                content = _("All Media");
                break;
            }
            return content;
        }
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
                        { name  : "sharedfoldername", type: "string" },
                        { name  : "mtype", type: "string" }
                    ]
                }),
                proxy    : {
                    type    : "rpc",
                    rpcData : {
                        service : "WebDesk",
                        method  : "getShareList"
                    }
                }
            })
        });
        me.callParent(arguments);
    },

    onAddButton: function () {
        var me = this;
        Ext.create("OMV.module.admin.service.webdesk.Share", {
            title     : _("Add media share"),
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
        Ext.create("OMV.module.admin.service.webdesk.Share", {
            title     : _("Edit media share"),
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
                method  : "deleteShare",
                params  : {
                    uuid: record.get("uuid")
                }
            }
        });
    }
});

OMV.WorkspaceManager.registerPanel({
    id        : "shares",
    path      : "/service/webdesk",
    text      : _("Shares"),
    position  : 20,
    className : "OMV.module.admin.service.webdesk.Shares"
});
