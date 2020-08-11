import React from 'react';

import api from '../services/api'
import socket from 'socket.io-client'

import twitterLogo from '../twitter.svg'
import './Timeline.css'
import Tweet from '../compoment/Tweet';

class Timeline extends React.Component {
    
    state = {
        tweets:[],
        newTweet: '',
    }

    async componentDidMount(){
        this.subscribeToEvents()
        const response = await api.get('tweets')

        this.setState({tweets: response.data})
    }

    handleInputChange = e => {
        this.setState({newTweet: e.target.value})
    }

    handleNewTweet = async e => {
        if(e.keyCode !== 13 ) return

        const content = this.state.newTweet
        const author = localStorage.getItem("@GoTwitter:username")

        await api.post('tweets',{content,author})

        this.setState({newTweet: ''})
    }
    
    subscribeToEvents = () => {
        const io = socket('http://localhost:3000')

        io.on('tweet', data =>{
            this.setState({ tweets: [data, ...this.state.tweets] })
        })
        io.on('like', data => {
            this.setState({tweets: this.state.tweets.map(tweet =>
                tweet._id == data._id ? data : tweet    
            )})
        })
    }

    render(){
        return  (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />

                <form>
                    <textarea   
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo"
                        />
                </form>
                
                <ul className="tweet-list">
                    {this.state.tweets.map(tweet => ( 
                         <Tweet key={tweet._id} tweet={tweet}/>    
                        // <h1 key={tweet._id}>{tweet.content}</h1>
                        ))}

                </ul>

            </div>
        )
    }
}

export default Timeline;