"use strict";

//Our AuthorList component its only task is to mark up some data and receives its data via properties from the authorPage component which is its parent component

var React = require('react');

var AuthorList = React.createClass({

		propTypes: {					//static object
			authors: React.PropTypes.array.isRequired			//if the array authors is not passed down from parent component it will notify us with an error
		},

	
		//render a table and iterate over a list
		//In react you always need a toplevel component that's we always use a dive to wrap all of our mark up(child components)in, You can have only a single top level component
		
			//we need to provide a proper key, so when removing or adding elements, React can maintain a proper state for these elements and maintains the proper ordering of these elements, as we re-render the application
			//normally using the primary key from the database, because it's always unique
			//curly brackets are used to reference a variable 

			//{this.state.authors.map(createAuthorRow, this)}, check in the state for this particular component and grab authors and map(iterate over each value) over each value
			//it is given the parameters the function createAuthorRow and this(so it know the context where it's being executed)
			//the function has a purpose, that each element of the authors array is given as a argument into the function createAuthorRow which it creates a row
			//and then returns the row and the next element of the author array is then given as a argument, until all elements are iterated over

			//Phase two --> instead of receiving its data via state {this.state.authors.map(createAuthorRow, this)} it will receive its data via props
			//****{this.props.authors.map(createAuthorRow, this)}, because the properties are passed down from the parent component 
			//authors exists because its passed down as a prop form its parent component and thats why we can reference it below 


		render: function(){
			var createAuthorRow = function(author){
				return (
						<tr key={author.id}>
							<td><a href={"/#authors/" + author.id}>{author.id}</a></td>	
							<td>{author.firstName} {author.lastName}</td>						
						</tr>
				);
		};

		return (
			<div>
				<table className = "table">
					<thead>
						<th>ID</th>
						<th>Name</th>
					</thead>
					<tbody>
						{this.props.authors.map(createAuthorRow, this)}						
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = AuthorList;