# NG2OS


Bureau virtuel pour OMV.

Le but de ce projet est de faire une interface simple d'accés pour votre NAS sous OpenMediaVault.

La partie administration reste géré dans l'interface web de OMV.

Cette interface là sera pour mettre à disposition de vos invités.

Elle permettra de mettre rapidement les fichiers du nas à disposition.


(Ce projet est basé sur Angular2 et Ventus )

![Preview](https://github.com/TwanoO67/ng2-os/raw/master/src/assets/demo.gif)



## Installation

Compiler une version "dist" ( `npm install` et `ng build --prod`)

Déposez les fichiers du dossier "dist" et "omv" dans un hebergement web sur votre nas OMV (par exemple dans un vhost Nginx)

Configurez vos propres icones en modifiant le fichier "ng2os_config.js"

### Ajouter le finder

Pour ajouter le navigateur de fichier, vous pouvez télécharger [ElFinder](https://github.com/Studio-42/elFinder/archive/2.1.23.zip)

et le placer dans le même dossier que précédemment (en utilisant les fichier se trouvant dans "elfinder")


## Securisation 
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

