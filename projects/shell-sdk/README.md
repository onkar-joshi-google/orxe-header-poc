
# ShellSdk

  

A page orchestration library that provides routing, app resolver to resolve microapps with the help of Registry. This package drives the navigation, loading/unloading of microapps.

  
## Features

 - Page level navigation 
 - Navigation between microapps
 - Loads and injects microapps into DOM
 - Initializes the CoreSDKs
 - Provides OrxeRouterLink, OrxeRouterOutlet to handle microapps

## Usage

Import the core ShellSDKModule into the app and provide microapp configuration.

	import { ShellSDKModule } from 'shell-sdk';

Add above module into your AppModule imports -  
				
	@NgModule({
		...
		imports: [
			...
			ShellSdkModule
		],
		...
	})
	export  class  AppModule  {  } 

### Providing static microapp route configuration

`ShellSDKModule` can be initialized with microapp configuration. Microapp configuration needs to be defined first. This can be done with following - 

	export  const  microAppRoutes: MicroAppRouteConfig[] = [
		{
			path:  '/search',
			children: [
				{
					path:  'hotel',
					tagName:  'app-hotel-search'
				},
				...
			]
		},
		{
			path:  '/results',
			children: [
				{
					path:  'hotel',
					tagName:  'app-hotel-results'
				},
				...
			]
		}
	];

Once route configuration is defined, ShellSDKModule can be import with -

	 @NgModule({
		...
		imports: [
			...
			ShellSdkModule.forMicroApps({  routeConfigs:  microAppRoutes  })
		],
		...
	})
	export  class  AppModule  {  }

This will allow ShellSDK to listen for URL changes and reacts to it by loading matched microapps. 
