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

class Developer {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get isManager() {
    return this.name === "Matthew Wylie";
  } 

  isSenior() {
    return this.age > 35;
  }
}

let matthew = new Developer("Matthew Wylie", 46);
console.info(matthew.age);
console.info(matthew.isSenior());
console.info(matthew.isManager);


function isIncludedInSearch(searchTerm)  {
  return function(item) {
    return 
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  //The constructor in the base class stores the propertes for us
  constructor(props) {
    super(props);

    this.title = props.title;
    
    this.state = {
      list: list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    console.info("Search Chamged...");
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(itemIdToDismiss){
    const updatedList = this.state.list.filter(item => item.objectID !== itemIdToDismiss);
    
    //Set state will cause React to redraw
    this.setState( {list : updatedList})
  }

  render() {

    return (
      <div className="App">

        <form>
          <input type="text" onChange={this.onSearchChange}/>
        </form>
         {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => 
              <div key={item.objectID}>
                
                <span>  
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{this.title}</span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button onClick={() => this.onDismiss(item.objectID)} type="button">
                    Dismiss   
                  </button>
                </span>
              </div>
         )}
      </div>
    );
  }
}



export default App;
