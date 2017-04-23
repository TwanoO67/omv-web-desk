# NG2OS


Bureau virtuel (basé sur Angular2 et Ventus )

![Preview](https://github.com/TwanoO67/ng2-os/raw/master/src/assets/demo.gif)

Configurez vos propres icones en modifiant le fichier "ng2os_config.js"


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







This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.17.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
