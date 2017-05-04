"use strict";

//This file is mocking a web API by hitting hard coded data.
var authors = require('./authorData').authors;
var _ = require('lodash');

/*Lodash is a Javascript library that helps programmers write more concise and easier to maintain Javascript. It can be broken down into several main areas:

Utilities - for simplifying common programming tasks such as determining type as well as simplifying math operations.
Function - simplifying binding, decorating, constraining, throttling, debouncing, currying, and changing the pointer.
String - conversion functions for performing basic string operations, such as trimming, converting to uppercase, camel case etc.
Array - creating, splitting, combining, modifying, and compressing
Collection - iterating, sorting, filtering, splitting, and building
Object - accessing, extending, merging, defaults, and transforming
Seq - chaining, wrapping, filtering, and testing. */

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(author) {
	return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by references,
											// Create JSON string from a JavaScript object.,
											// Parse the data with JSON.parse(), and the data becomes a JavaScript object.
											//We make it a JSON string first, then we parse it into a javaScript object, so another object is created with a pointer
};

var AuthorApi = {
	getAllAuthors: function() {
		return _clone(authors); 
	},

	getAuthorById: function(id) {
		var author = _.find(authors, {id: id});
		return _clone(author);
	},
	
	saveAuthor: function(author) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the author to the DB via AJAX call...');
		
		if (author.id) {
			var existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id})); 
			authors.splice(existingAuthorIndex, 1, author);						//add to array
		} else {
			//Just simulating creation here.
			//The server would generate ids for new authors in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			author.id = _generateId(author);
			authors.push(_clone(author));
		}

		return author;
	},

	deleteAuthor: function(id) {
		console.log('Pretend this just deleted the author from the DB via an AJAX call...');
		_.remove(authors, { id: id});
	}
};

module.exports = AuthorApi;