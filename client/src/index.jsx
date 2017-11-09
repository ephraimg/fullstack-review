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

  componentDidMount () {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (topRepos) => {
        this.setState({repos: topRepos});
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: '/repos',
      data: JSON.stringify(term),
      processData: false,
      success: () => {},
      contentType: 'application/json'
    });
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