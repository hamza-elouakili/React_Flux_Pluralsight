"use strict";   //begin each javascript file with this statement

var gulp = require('gulp');     		//similar to the C# using statements or Java import statements
var connect = require('gulp-connect'); 	//runs a local dev server
var open = require('gulp-open');		//open a URL in a web browser

var browserify = require('browserify'); 		//Bundles JS
var reactify = require('reactify'); 			//Transforms React JSX to JS
var source = require('vinyl-source-stream');	//Use conventional text streams with Gulp

var concat = require('gulp-concat');			//concatenates files

var lint = require('gulp-eslint');				//Lint JS files, including JSX  --> is here to check that our javascript coding style remains clean, check our javascript coding standards and keeps us in check if we are using best practices 

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',						//path to html, go into my source folder and find everything with the html extension
		js:   './src/**/*.js',						//path to javascript files, we will also be looking into subdirectories to find any .js files 
		images: './src/images/*',					//any images within this folder
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist: './dist',								//path to dist folder
		mainJs: './src/main.js'						//path to mainJs folder		
	}
}

//Start a local development server
//The second parameter is a function, connect to the server and pass it a chunk of JSON
//gulp, connect and open are defined as a variable in the beginning of the file and we are using the libraries of it
//connect is an object of which we are using its variables 

gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,					//referencing a config var
		base: config.devBaseUrl,			//referencing a config var
		livereload: true
	});
});

//another task named, open --> with a depency on the task connect --> in other words what is said here, whenever you start the task open, run the task connect first
gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));				//pipe commands togheter, gulp get this file from this path and open it in the browser with this url	
});


//a task to get our html files form the src folder to the dist folder to be pushed to the server
gulp.task('html', function(){
	gulp.src(config.paths.html)					// go get any html files from this path
		.pipe(gulp.dest(config.paths.dist))		//place those html files in this path
		.pipe(connect.reload());				//after we have done so, reload using connect and connect is our dev server we have downloaded from npm
});

//JS task
gulp.task('js', function(){
	browserify(config.paths.mainJs)						//using browserify, passing the path of the main.js file				
		.transform(reactify)							//transform any javascript we get using reactify, useful for compiling our JSX
		.bundle()										//bundle everything we get into one file, no matter how many js files we have
		.on('error', console.error.bind(console))		//if error messages happen we want to see them in the console
		.pipe(source('bundle.js'))						//define what our bundle will be named
		.pipe(gulp.dest(config.paths.dist + '/scripts'))	//define the destination where this bundle will be placed, in the dist folder under /scripts folder
		.pipe(connect.reload());							//anytime that this tasks runs, we want to reload our browser, so we know we our running the latest javascript in the browser
});

//css task 
gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))								//pipe that to concatenate, and bundle all the css files and name them bundle.css
		.pipe(gulp.dest(config.paths.dist + '/css'));			//place that bundle in the dist folder under /css folder
});

//Lint task
gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))			//A file where we can create our rules, calling the lint variable defined above 
		.pipe(lint.format());									//then we want to see those results, in a specified format, in this case we want to see the results in the style defined by format()
});

//Migrates images to dist folder
//Note that I could even optimize my images here
gulp.task('images', function(){										//task named images
	gulp.src(config.paths.images)									//all the images from this folder
		.pipe(gulp.dest(config.paths.dist + '/images'))				//place all the files that you receive from the above command into the dist folder under images
		.pipe(connect.reload());									//reload the browser

		//publish favicon
		gulp.src('./src/favicon.ico')								//search for the favicon 
			.pipe(gulp.dest(config.paths.dist));					//get the result from the above command, the favicon and place it in the dist folder
});



//each time we make a change to our source folder html and js files and save them, gulp knows about it and reloads the page
gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);					//watching the html path('./src/*.html') and each time something changes there and is saved, I want to run the html task 
	gulp.watch(config.paths.js, ['js', 'lint']);						//watching the js path './src/**/*.js', and each time something changes there and is saved, I want to run the js and lint task
});

//default task, if you go to the command line and type gulp, provide array of tasks that should run when you go to the command line and press gulp, it should run the html, open, js, css, lint and watch tasks
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);			