NG2OS_CONFIG = {
  'iconWidth': 100,
  'topmenu' : [
    {
      "label": "File",
      "selected": false,
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
      "selected": false,
      "submenu": [
        {"label": "New Window"},
        {"label": "New File"}
      ]
    },
    {
      "label": "View",
      "selected": false,
      "submenu": [
        {"label": "Close"},
        {"label": "Close All"}
      ]
    }
  ],
  'windows' : [{
	  "id": "about",
	  "image": "/assets/flatjoy-circle-deviantart/Apple.png",
	  "title": "Présentation",
	  "text": "Bienvenue, sur l'interface de gestion de Bureau virtuel. N'oubliez pas de changer les url d'iframe et de configurer vos propres icones",
	  "opened": false,
	  "selected": false,
	  "ref": null
	},
	{
	  "id": "jeedom",
	  "image": "/assets/flatjoy-circle-deviantart/Camcorder.png",
	  "iframe": "http://your-cam-recorder",
	  "title": "JeeDom",
	  "opened": false,
	  "selected": false,
	  "ref": null
	},
	{
	  "id": "elfinder",
	  "image": "/assets/flatjoy-circle-deviantart/Drawers.png",
	  "iframe": "http://your-finder",
	  "title": "Finder",
	  "opened": false,
	  "selected": false,
	  "ref": null
	},
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
	  "title": "Réseau",
	  "opened": false,
	  "selected": false,
	  "ref": null
	},
	{
	  "id": "sickrage",
	  "image": "/assets/flatjoy-circle-deviantart/Cone.png",
	  "iframe": "http://your-sickrage-install/",
	  "title": "SickRage",
	  "opened": false,
	  "selected": false,
	  "ref": null
	}]
}
