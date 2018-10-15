// Register a node in the navigation tree.
//
// id:
//     Set the ID of the node.
// path:
//     Parent path in the navigation view.
// Text:
//     Service name/title. This is displayed in the navigation.
// icon16:
//     16x16 pixel icon that is displayed in the navigation tree.
// iconSvg:
//     SVG icon that is displayed in the navigation view.
OMV.WorkspaceManager.registerNode({
    id: 'webdesk',
    path: '/service',
    text: _('Webdesk'),
    icon16: 'images/example.png',
    iconSvg: 'images/example.svg'
});
