import React from 'react';

var listStyle = {
  listStyleType: "none",
  paddingLeft: "0px",
  marginLeft: "0px"
};

var listItemStyle = {
  height: "35px",
  maxWidth: "500px",
  border: "1px dotted black",
  padding: "5px",
  margin: "5px 20px 10px 0"
};

var imgStyle = {
  height: "35px",
  width: "35px",
  marginRight: "15px",
  float: "left"
};

var textStyle = {
  marginRight: "10px"
};


const RepoList = (props) => (
  <div>
    <h4> Github Repos </h4>
    There are {props.repoCount} repos stored.
    <ul style={listStyle}>
    {props.repos.map(repo => (
      <li key={repo.id} style={listItemStyle}>
        <div>
          <img src={repo.avatar_url} style={imgStyle}></img>
        </div>
        <div style={{float: "left"}}>
          <span style={textStyle}><a href={repo.html_url}>{repo.name}</a></span><br/>
          <span style={textStyle}>Owner: {repo.owner_id}</span>
          <span style={textStyle}>Watchers: {repo.watchers_count}</span>
          <span style={textStyle}>Forks: {repo.forks_count}</span>
        </div>
      </li>
    ))}
    </ul>
  </div>
)

export default RepoList;