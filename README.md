# OMV Web Desk

![Preview](https://github.com/TwanoO67/ng2-os/raw/master/src/demo.gif)

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
* get [ElFinder](https://github.com/Studio-42/elFinder/archive/2.1.23.zip)
* Unzip it in your webdesk folder, in a folder name "elfinder"
* Copy the content of "dist" in the same folder (and overwrite the duplicate files)
* It's ready !
* Plus: Now you can configure your own icons/settings in "webdesk_config.js"


##  NOT USEFULL ANYMORE - Securisation
Pour securiser cet écran derriere une page de login, vous pouvez utiliser le contenu du dossier "omv".
Celui-ci limite l'accès au index.html, avec un index.php dans lequel votre session OpenMediaVault, pour vous servir de son login.

dans /login/config.php renseigner l'adresse de votre serveur OMV API

dans votre conf nginx rajouter:

	#empecher l'acces a index.html
	location index.html{
       rewrite ^(.*)$ index.php break;
    }
    #rediriger les pages inexistante vers index.php
    location / {
      if (!-e $request_filename){
        rewrite ^(.*)$ /index.php break;
      }
    }
