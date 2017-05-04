
//"use strict";  --> we don't use it here because we use a global variable $ = jQuery, so the lint parser will give errors for not using it
//you could go around it by using an IEFFI, and wrap your body into that IIFFE and using your use strict within that IIFFE

//This page is our main entry point for the application


//add references to Jquery and bootstrap that browserify is aware that these files are necessary 

//All these variables will sit in the global space, so they are not effected by the "use strict;" statement within the IIFE
$ = jQuery = require('jquery');				//two ways to reference jquery by the dollar sign or by the jquery variable 

var React = require('react');							//reference to the React library
var Home = require('./components/homePage');			// reference to the homePage.js component page
var About = require('./components/about/aboutPage');	// reference to the AboutPage.js component page
var Header = require('./components/common/header');				//reference the header.js component page

var Authors = require('./components/authors/authorPage');			//reference the authorPage.js



// We create a helper react component that helps us to render multiple components instead of hardcoding one single component

(function(win) {		//creating IIFFE so everything within can be evaluated using strict mode, we get the window reference as a parameter 
	"use strict";
	var App = React.createClass({
		render: function(){														//within render it's just plain javascript, so any common conventions can be used, 
			var Child;					//this variable will keep track of which child we want to render, home versus about is going to depend on what the URL looks like

			switch(this.props.route){		//this switch statement will look at the properties and the route for this particular app, based on the route it will either load Home or About
				case 'about': Child = About; break;					//if the case is about the child will be the About component
				case 'authors': Child = Authors; break;				//if the case is authors the child be the Authors component 
				default: Child = Home;							//otherwise the child will be the Home component
			}

			//Then we can finally return our mark up, add the components to our JSX code, of the components we want to render

			return (
				<div>
					<Header/>
					<Child/>									
				</div>
			);
		}
	});

	function render(){
		var route = win.location.hash.substr(1);					//getting the route by getting a piece of the URL, everything after the hash localhost:9005/#about,  win is the reference of the window argument the IIFE received 
		React.render(<App route={route} />, document.getElementById('app'));		//we give it component App, which is defined above with the parameter route, which will have the route and the DOM element where we want to render the component
	}

	win.addEventListener('hashchange', render);						//We need to watch for hashchange, we are going to add an eventListener on it(the window), haschange is the event that occurs when there is a hasChange in the URL. On hasChange render needs to occur and then we call the render function
	render();												//then we call the render function which we defined above
}(window));		//We pass the IIFE the reference of window, to use with win.location.hash.substr(1); and win.addEventListener('hasChange', render);	


//The code that will be used to render our page, we need to render the code from HomePage.js to a certain dom element from our index.html
//React.render takes two parameters, the first is the component we would like to render, which in this case is Home, and it's passed as JSX
//The second parameters is the DOM element that you would like to attach the application to
//In the line below we hardcoded the component we wanted to render, we made this more dynamic by being able to choose which component to render --> see above lines
//React.render(<Home />, document.getElementById('app'));			//This means got get our Home component and attach it to the DOM element with Id app in our index.html




/************************************************************************************* Learning phase *****************************************/ 
//Broweserify uses the CommonJS Pattern 
//The commonJS patterns uses the module.exports at the bottom to define what the file exports, in this case the variable App
//Broweserify will go through all the files that we utilize and then wrap each one of those App into their own context or modules, so it's a bundler
// this following line --> var App = console.log('Hello world from Browserify');, will not be global paired but it will be in its own module 
//and the module is exporting what is defined in App

//test = 1;   --> this will upset eslint and get an error in the commandline -->  test is not defined no-undef

//we are going to use this file to test if our browserify is working


//var App = console.log('Hello world from Browserify');					--> We used these lines to test the browersify 



//module.exports = App;						--> we used this in a earlier stage to test browserify



