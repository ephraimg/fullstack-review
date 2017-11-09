import React from 'react';

const RepoList = (props) => (
  <div>
    There are currently {props.repoCount} repos stored.
    <ul className="repo-list">
    {props.repos.map(repo => (
      <li key={repo.id}>
        <div>
          <img src={repo.avatar_url} className="avatar"></img>
        </div>
        <div style={{float: "left"}}>
          <span className="repo-info"><a href={repo.html_url}>{repo.name}</a></span><br/>
          <span className="repo-info">Owner: {repo.owner_id}</span>
          <span className="repo-info">Watchers: {repo.watchers_count}</span>
          <span className="repo-info">Forks: {repo.forks_count}</span>
        </div>
      </li>
    ))}
    </ul>
  </div>
)

export default RepoList;