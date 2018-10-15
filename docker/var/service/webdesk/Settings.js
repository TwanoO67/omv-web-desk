Ext.define('OMV.module.admin.service.webdesk.Settings', {
    extend: 'OMV.workspace.form.Panel',

    // This path tells which RPC module and methods this panel will call to get
    // and fetch its form values.
    rpcService: 'Webdesk',
    rpcGetMethod: 'getSettings',
    rpcSetMethod: 'setSettings',

    // getFormItems is a method which is automatically called in the
    // instantiation of the panel. This method returns all fields for
    // the panel.
    getFormItems: function() {
        return [{
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('General'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [{
                xtype: 'checkbox',
                // The name option is sent together with is value to RPC
                // and is also used when fetching from the RPC.
                name: 'enable',
                fieldLabel: _('Enable'),
                // checked sets the default value of a checkbox.
                checked: false
            },
            {
                xtype: 'numberfield',
                name: 'max_value',
                fieldLabel: _('Max value'),
                minValue: 0,
                maxValue: 100,
                allowDecimals: false,
                allowBlank: true
            }]
        }];
    }
});

// Register a panel into the GUI.
//
// path:
//     We want to add the panel in our webdesk node.
//     The node was configured with the path /service and the id webdesk.
//     The path is therefore /service/webdesk.
//
// className:
//     The panel which should be registered and added (refers to
//     the class name).
OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/service/webdesk',
    text: _('Settings'),
    position: 10,
    className: 'OMV.module.admin.service.webdesk.Settings'
});
