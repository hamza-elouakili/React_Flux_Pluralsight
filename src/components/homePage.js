"use strict";					//tells the browser to evaluate everything we are doing in strict mode

var React = require('react');	//imports react into this file, so we can use it, this is using the CommonJS pattern


//Define our react component 
//React.createClass allows us to define a class which will allow us to contain our component 
//using the ES5 syntax 
var Home = React.createClass({
	//the one function we need to define our react component is render
	//This required on any React component
	//and the render function is where we put our JSX
	//Whatever the render function returns is what will be displayed to the screen
	render: function(){
		
		//we will wrap our JSX between parentheses, these parentheses are necessary if you have multiple line of JSX that you're working with
		//we had to use the className tag because class is a reserved keyword in JavaScript, when we will compile to HTML the className will become just the class keyword
		return (
			<div className="jumbotron">
				<h1>Pluralsight Administration</h1>
				<p> React, React Router, and Flux for ultra-responsive web apps. </p>
			</div>
		);
	}
});

//The final piece that we need is to export this so that it can be used elsewhere in the application
//this is how we do it -->
//typically you can use any name you want, but mostly you want to use the same name as your main react component 

module.exports = Home;


