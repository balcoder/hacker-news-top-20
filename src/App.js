import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    const top = "https://hacker-news.firebaseio.com/v0/topstories.json";
    const storie = "https://hacker-news.firebaseio.com/v0/item/";
    fetch(top)
      .then(res => res.json())
      //.then(stories => this.setState({stories}))
      .then(stories => {
         let promises = [];
         for(let i = 0; i < 20; i++) { //loop through the top 20 stories
           promises.push(fetch(`${storie}${stories[i]}.json`)
             .then(res => res.json()));
         }
         Promise.all(promises,)
           .then(val => this.setState({stories: val}))
       })
  }
  render() {
    const top = this.state.stories.map(s =>{
      return <li key={s.id}><a href={s.url}>{s.title}</a></li>
    })
    return(
      <div className="app">
        <h1>Hacker News Top 20 Stories</h1>
        <div className="list">
        <ol>
          {top}
        </ol>
        </div>
      </div>
    );
  }
}

export default App;
