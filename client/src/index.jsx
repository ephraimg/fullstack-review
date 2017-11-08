import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import GITHUB_TOKEN from '../../config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);

$.ajax({
  type: "POST",
  url: '/repos',
  data: JSON.stringify('hello'),
  processData: false,
  success: () => {},
  contentType: 'application/json'
});
    
    //$.post('localhost:1128/repos', 'hello', () => {});
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));