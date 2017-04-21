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
    id: 'ng2os',
    path: '/service',
    text: _('ng2os'),
    icon16: 'images/ng2os.png',
    iconSvg: 'images/ng2os.svg'
});