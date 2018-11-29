/*
Local component state, also known as internal component state, allows you to save
, modify, and delete properties stored in your component
*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const DEFAULT_QUERY = 'redux';
const PATH_BASE = "http://hn.algolia.com/api/v1";
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

console.log(url);

const list = [
  {
    title:'Lord Of The Rings',
    url:'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings',
    author:'J. R. R. Tolkien',
    num_comments:34,
    points:10,
    objectID:0 
  },
  {
    title:'Harry Potter',
    url:'#',
    author:'J.K Rowling',
    num_comments:20,
    points:7,
    objectID:1
  },
  {
    title:'Serlock Holmes',
    url:'#',
    author:'Alexander Doyle',
    num_comments:20,
    points:7,
    objectID:2
  },
  {
    title:'Great Expectation',
    url:'#',
    author:'Charles Dicken',
    num_comments:2,
    points:34,
    objectID:3
  },
  {
    title:'Hard Times',
    url:'#',
    author:'Charles Dicken',
    num_comments:14,
    points:7,
    objectID:4
  },
  {
    title:'Harry Potter Deathly Hallow',
    url:'#',
    author:'J.K Rowling',
    num_comments:24,
    points:10,
    objectID:5
  },
];

// function isSearched(searchTerm){
//   return function(item){
//     // some condition
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

const isSearched = searchTerm =>item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchTerm:'', // search term state
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  
  onDismiss(id){
    const isNotId = item=> item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list:updatedList});
  }
  onSearchChange(event){
    this.setState({searchTerm:event.target.value});
  }
  render() {
    const {searchTerm, list} = this.state;

    return(
      <div className="page">
      <div className="interactions">
      <Search 
        value={searchTerm}
        onChange={this.onSearchChange}
      >
      Search
      </Search>
      </div>
      <Table
        list={list}
        pattern={searchTerm}
        onDismiss={this.onDismiss}
      />
      </div>
    );
  }

}

class Search extends Component {
  render(){
    const{value, onChange, children} = this.props;
    return(
      <form>
       {children} <input
            type="text"
            value={value}
            onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render(){
    const {list, pattern, onDismiss} = this.props;
    return (
      <div className='table'>
        {list.filter(isSearched(pattern)).map(item=>
        <div key={item.objectID} className='table-row'>
          <span style={{width:'40%'}}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{width:'30%'}}>{item.author}</span>
          <span style={{width:'10%'}}>{item.num_comments}</span>
          <span style={{width:'10%'}}>{item.points}</span>
          <span style={{width:'10%'}}>
            <button
              onClick={()=> onDismiss(item.objectID)}
              type="button"
              className='button-inline'
            >
            Dismiss
            </button>
          </span>
        </div>
        )}
      </div> 
    );
  }
}


class Button extends Component{
  // A reusable Button Component
  render(){
    const{
      onClick,
      className='',
      children,
    } = this.props;  // Destructering
    return(
      <button
        onClick={onClick}
        className={className}
        type='button'
      >
      {children}
      </button>
    ) 
  }
}
export default App;


// {list.map((item, key)=>{
//   return (
//     <div key={key}>
//       <span>
//         <a href={item.url}>{item.title}</a>
//       </span>
//       <span>{item.author}</span>
//       <span>{item.num_comments}</span>
//       <span>{item.points}</span>
//     </div>
//   )
// })}
