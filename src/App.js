import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

class App extends Component {

  //The constructor in the base class stores the propertes for us
  constructor(props) {
    super(props);

    this.state = { 
      searchTerm : DEFAULT_QUERY,
      result : null
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    
  }

  setSearchTopStories(result) {
    this.setState( {result} );
  }

  fetchSearchTopStories(searchTerm) {
    fetch (`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  //As the user types into the field each keystroke will update this automatically
  onSearchChange(event) {
    console.info("Search Chamged to be " + event.target.value);
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    console.info("Submitting search request for " + searchTerm);
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onDismiss(itemIdToDismiss){

    //Create a function to do our filtering
    const isNotId = item => item.objectID !== itemIdToDismiss;

    //Create a filtered list of hits
    console.info("Before filtering we had " + this.state.result.hits.length + " items");
    const updatedHits = this.state.result.hits.filter(isNotId);

    console.info("After filtering we had " + updatedHits.length + " items");
    
    //We've updated the list of hits, but the UI is bound to the API response 
    //(which is a complex object). Rather than change the results we clone them and
    //replace the original hits with our modified vesrion
    //The assign function takes the first object and then overwrites with each argument in turn
    const updatedResult = Object.assign({}, this.state.result, {hits: updatedHits});

    //Set state will cause React to redraw
    this.setState({result : updatedResult})
  }

  render() {
    const { searchTerm, result } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

//If we turn the function into a lambda without a body then the return is implicit
//This looks *too* concise but it works. We are storing the function as a const,
//but because it returns JSX then React knows its a component
const Search = ({value, onChange, onSubmit, children}) => 
  <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type='submit'>
        {children}
      </button>
    </form>

function Table({list, pattern, onDismiss}) {
  return (
    <div className="table">
    {list.map(item =>
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
