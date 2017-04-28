WEBDESK_CONFIG = {
  'iconWidth': 100,
  'navbar' : [
    {
      "label": "User",
      "submenu":[{
        "label": "Disconnect",
        "link":"/login/logout.php"
      }]
    },
    {
      "label": "File",
      "submenu": [
        {"label": "New Window"},
        {"label": "New File"},
        {"label": "Save As"},
        {"label": "Save All"},
        {"label": "Close"},
        {"label": "Close All"}
      ]
    },
    {
      "label": "Edit",
      "submenu": [
        {"label": "New Window"},
        {"label": "New File"}
      ]
    },
    {
      "label": "View",
      "submenu": [
        {"label": "Close"},
        {"label": "Close All"}
      ]
    }
  ],
  'dock' : {
    'username': [
      {
    	  "id": "about",
    	  "image": "/assets/flatjoy-circle-deviantart/Apple.png",
    	  "title": "Présentation",
    	  "text": " TEST with your username",
    	  "opened": false,
    	  "selected": false,
    	  "ref": null
    	}
    ],
    'default' : [
      {
    	  "id": "about",
    	  "image": "/assets/flatjoy-circle-deviantart/Apple.png",
    	  "title": "Présentation",
    	  "text": "Bienvenue, sur l'interface de gestion de Bureau virtuel. N'oubliez pas de changer les url d'iframe et de configurer vos propres icones",
    	  "opened": false,
    	  "selected": false,
    	  "ref": null
    	},
    	{
    	  "id": "elfinder",
    	  "image": "/assets/flatjoy-circle-deviantart/Folder%20Files.png",
    	  "iframe": "/elfinder/elfinder.html",
    	  "title": "Finder"
    	}/*,
    	{
    	  "id": "omv",
    	  "image": "/assets/flatjoy-circle-deviantart/Chip.png",
    	  "iframe": "http://your-omv-ip/",
    	  "title": "OpenMediaVault",
    	  "opened": false,
    	  "selected": false,
    	  "ref": null
    	},
    	{
    	  "id": "network",
    	  "image": "/assets/flatjoy-circle-deviantart/Devices.png",
    	  "iframe": "http://your-router",
    	  "title": "Réseau"
    	},
    	{
    	  "id": "sickrage",
    	  "image": "/assets/flatjoy-circle-deviantart/Cone.png",
    	  "iframe": "http://your-sickrage-install/",
    	  "title": "SickRage"
    	}*/
    ]
  }
}
