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
### Working with <img src="https://angularjs.org/img/AngularJS-large.png">

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
       
       exports[Component] = Component
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