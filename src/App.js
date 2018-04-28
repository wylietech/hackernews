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

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  //The constructor in the base class stores the propertes for us
  constructor(props) {
    super(props);

    this.state = { list, searchTerm : '' };

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
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          />
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

//THis is the class version of a search component
//actually overkill, since the component has no state
class SearchClz extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

//This is the same as the class version above, but written as a simple function
//This is preferable when you dont need to modify state or lifecycle
//Note that there is no this instance is a function
function SearchFn({ value, onChange, children }) {
  return (
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

//If we turn the function into a lambda without a body then the return is implicit
//This looks *too* concise but it works. We are storing the function as a const,
//but because it returns JSX then React knows its a component
const Search = ({value, onChange, children}) => 
  <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>

function Table({list, pattern, onDismiss}) {
  return (
    <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%'}} >
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%'}}>{item.author}</span>
        <span style={{ width: '10%'}}>{item.num_comments}</span>
        <span style={{ width: '10%'}}>{item.points}</span>
        <span style={{ width: '10%'}}>
          <Button onClick = {() => onDismiss(item.objectID)}>
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>
  )
}

function Button({onClick, className, children}) {  
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

export default App;
