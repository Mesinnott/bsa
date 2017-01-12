# BOY SCOUTS OF AMERICA
# Cub Scout Summer Day Camp Web Application
#### Ore-Ida Council

This service is to be used by the BSA, their members, and administrators, to register for, regulate, and govern their summer day camp system.

There are three main sections of this application:

### Scoutmaster Portal

Scoutmasters and den and pack leaders will use this application to register for summer camp.  The reservation form ensures there are always enough leaders for the number of cub scouts being registered.

Once a camp reservation has been completed, space will be reserved at the desired camp, pending the BSA office's receipt of payment and health forms for each child.
After one week, if the reservation remains unpaid, it will deactivate and another pack will be able to reserve space at that same camp in their place.

Leaders can also log back in to the website which will give them access to their previously saved registration through use of a confirmation number.  
They can make limited changes to their registration without traveling to the office.  However, if more scouts are added to a previously paid-in-full registration, they will once again have a week to solidify their place at the camp.

### Camp Director Portal

It is the responsibility of camp directors, some time previous to each of their camps beginning, to log in to the system to review their camps, and more importantly, to build the rotation groups for camp operations.

In years past, it has been the job of the directors to manually arrange the scouts attending their camps into equally-sized groups in such a way that large scout units are split between as few groups as possible.  
This process is now automated through an algoritm that sorts the scouts twenty times and then chooses the grouping with the fewest disruptions to the individual groups.

Upon completion of this process, each scoutmaster and reservation holder is emailed a list of the breakdown of their individual packs.  They can then notify the camp director of any potential problems with the proposed groups.  The director can change the groups by hand to align with these suggestions.

### Administrator Portal

Admins have other powers that the rest of the users of this application do not.  They can search for anything and edit the information that they receive.  They can appoint and give permissions to directors and initiate reservations in the office if that is required.

However, only the Master Admin may appoint other administrators.

Admins are responsible for starting the next year of camps.  They create the year, set camp dates and locations, and attach directors to each camp.

They take payments and solidify camp reservations, as well as collect health forms and verify in the digital records that they have been received.

--------------------------

This application is designed to be extendable and to be in use for many years.  All data is stored in a database on Google Firebase, and authentication is handled through that medium.

Help files will be available, coming soon.




The CodeWorks Starter Pack :briefcase:
=================
*a short story by McCall Alexander*
* Live-compiles ES6/Next to ES5 with **Babel**
* Live-compiles **Sass**
* Packages and minifies JavaScript assets
* Live reloads changes
### Getting Started
* Clone or download repository :arrow_down:

* Install dependencies

		npm install
### Running Dev Server :computer:
* Run

 		npm run dev
     :runner:
* Runs on **localhost:8080** by default
	* to change this, open index.<i></i>js and change the 	`dev:{ port:` property value to whatever you desire



### Build for Production
* Run

		npm run build
### Working with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/2000px-AngularJS_logo.svg.png" style='height:2em;margin-top:-0.25em'>

* All components are nested within their own modules and injected into your main app module (in components/App.<span></span>js) at runtime.
	* IIFE's are not neccessary because your code will be compiled by Node, thus global scope is not an issue.
* To rename your app:
	```javascript
    
    import angular from 'angular'
    import {dependencies} from './components/components'
	import myTemplate from './path-to-my-template'

  let App = angular.module('myAppName', dependencies)

  App.component('app', {
    	template: template,
    	controller() { 
    	}
  })

  export {
    	App
  }
  ```
  then change your index.html accordingly:
  ```html
  [...]
  <div ng-app="myAppName">
    <app></app>
  </div>
  [...]
  <!-- built files will be auto injected so don't worry about the lack of script tags -->
  ```
* To add a new component:
	1. Create the file under /src/components/
	2. Components must be modularized before they can be injected. Create your component with the following syntax:
		
        ```javascript
		const Component = 'myComponentName'
        // No need to import Angular
        
		angular.module(`app.components.${Component}`, [])
        
       [...]
       
       exports.component = Component
       ```
     3. Set up your component for compilation in /src/components/components.js:
     	```javascript
        import {myComponentName} from './my-component-file.js'
       
        let components = [
        	myComponentName
        ]

        const dependencies = components.map(c => { return `app.components.${c}`})

        export {
          dependencies
        }

		```
 * Styling your components:
  
      `my-component.js`
   
      ```javascript
      	import './my-component-styles.scss'
        // will be compiled to CSS and injected upon neccessity 
      ```