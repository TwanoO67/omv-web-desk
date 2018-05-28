# OMV Web Desk [![Build Status](https://travis-ci.org/TwanoO67/omv-web-desk.svg?branch=master)](https://travis-ci.org/TwanoO67/omv-web-desk)

![Preview](https://github.com/TwanoO67/ng2-os/raw/master/demo.gif)

# English description

OMV Web Desk, is a project to add a public "front" part to an OpenMediaVault server.
It will consist of a web app using OMV's info, to show some easy functionnality to your users.
It will be based on user and folder sharing defined in the OMV administration UI.
It looks like a Desktop UI, where your user would have some "App" providing easy access, like:
* File Explorer (done)
* Iframes to your plugins web-view (done)
* Photo Gallery (work in progress)
* Music player (todo)

Technically it's based on OMV (for the php part), Angular (as TS framework), Ventus (as Desktop manager)

# Description Français

Bureau virtuel pour OMV.

Le but de ce projet est de faire une interface simple d'accés pour votre NAS sous OpenMediaVault.

La partie administration reste géré dans l'interface web de OMV.

Cette interface là sera pour mettre à disposition de vos invités.

Elle permettra de mettre rapidement les fichiers du nas à disposition.


(Ce projet est basé sur OMV, Angular et Ventus )

## Installation


* Create a new user "webdesk"
* Create a new group "webdesk"
* Edit user "webdesk" and put it in groups "users, www-data, openmediavault-config, openmediavault-engined, openmediavault-webgui, webdesk"
* Create a shared dir, where you want to host the project files, named "webdesk"
* Using the plugin "Nginx (websites)"
* Create a new php pool "webdesk", using user "webdesk" and group "webdesk"
* Create a new server, using pool "webdesk", and shared dir "webdesk", with the port you want
* get [OMV WebDesk](http://dl.weberantoine.fr/download.php?file=dist-omv-web-desk.tar.gz) untar it in your webdesk folder,
* Update the file "login/config.php" with your omv server url
* It's ready !
* Now you can configure your own icons/settings in "webdesk_config.js" .
