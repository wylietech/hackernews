import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux2',  
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function filterListItem(item) {
  return item >= 5;
}

let itemsArray = [1,2,3,4,5,6];

let filteredArray = itemsArray.filter(filterListItem);
let otherFilteredArray = itemsArray.filter(item => item >= 2);
let againFilterdArray = itemsArray.filter(item => {
  return item >= 2;
});

console.info(otherFilteredArray.length);

if (filteredArray.length !== 2) {
  console.error("Something went wrong");
} else {
  console.info("Array Length is " + filteredArray.length);
}



class App extends Component {

  render() {

    return (
      <div className="App">
         {list.map(item => 
              <div key={item.objectID}>
                <span>  
                  <a href={item.url}>item.title</a>
                </span>
                <span>This is a text based field</span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
         )}
      </div>
    );
  }
}



export default App;
