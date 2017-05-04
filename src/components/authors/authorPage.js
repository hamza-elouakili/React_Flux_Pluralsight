//This page is now a proper controller view --> meaning it has child components which it passes data to via props <AuthorList	authors={this.state.authors} />			

"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({

	getInitialState: function(){					//life-cycle method
		return {
			authors: []				//give back an object, in this case an empty array --> in case there aren't any authors
		};	
	},

	componentDidMount: function(){					////life-cycle method
		if (this.isMounted){						//the this reference the component
			this.setState({authors: AuthorApi.getAllAuthors()});	//we set the state by making an synchronous call to our mock API, and place the array object in authors
		}
	},

	//Because we separated the mark up and state definition, we simply have to make call to the AuthorList component and pass it the state of the component
	//Separating components, is like separating smart components and dumb components, this component is a smart component because it posses all the data
	//whereas the AuthorList component is the dumb component because it gets its data passed down from this component and can only know what is set here in this component
	render: function(){
		return (
			<div>
				<h1>Authors</h1>
				<AuthorList	authors={this.state.authors} />			
			</div>
		);
	}
	
});

module.exports = AuthorPage;

