# ORXe Shell App

## Prerequisite 

Make sure the NPM registry points to ORXe Nexus Respository -  [https://packages.common.cnxloyalty.com/repository/npm-group/](https://packages.common.cnxloyalty.com/repository/npm-group/)

More information can be found here - [Working with Nexus Repository](https://tavisca.atlassian.net/wiki/spaces/ORXE3/pages/818250030/Publishing+private+NPM+packages+to+Nexus)

## Getting started

First, install the packages with following command - 

	npm install

## Starting local dev

ORXe app is divided into two parts - 

1. Shell SDK
2. ORXe Angular application

Shell SDK is a library project setup that provides core functionality needed by the ORXe Angular application. 
Angular application is actual application where pages are created.

To start development locally, you need two terminals. One for Shell SDK and one for running the angular application. 

Open terminal 1 and enter following command - 

	npm run serve:sdk
This will build Shell SDK and adds a *file watcher* that rebuilds SDK when changes are made. This will keep updating the ORXe Angular application with correct files it needs from SDK.

Open terminal 2 and enter following command - 
	
	npm run serve:app 
This will start Dev-server for angular application at default port which is 4200

Alternatively, you can do  -

	ng server --port <PORT_NUMBER>
 
 Running above command yields the same result ie starting Dev-server for ORXe Angular application.

## Building the application

Production ready ORXe application can be built in two sequential steps - 

1. Build the Shell SDK
2. Build ORXe Angular application

To build Shell SDK enter - 

	npm run build:sdk

After Shell SDK is built, ORXe application can be built by entering - 

	npm bun build:app

This will create a ***dist*** folder at root level with following contents - 

1. dist/shell-sdk
2. dist/orxe-shell

Only dist/orxe-shell is needed for deployment of the ORXe application.


More information on how to create the app is found at - [Creating ORXe application](https://tavisca.atlassian.net/wiki/spaces/ORXE3/pages/925303643/Creating+ORXe+Application) 
