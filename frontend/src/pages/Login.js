import React from 'react';

import twitterLogo from '../twitter.svg'
import './Login.css'

class Login extends React.Component {

    state = {
        username: '',
    };

    handleInputChange = (event) => {
        
        this.setState({username: event.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()

        const { username } = this.state

        if(!username.length) return;

        localStorage.setItem('@GoTwitter:username', username)

        this.props.history.push('/timeline')

    }

    render(){
        return  (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitte"/>
                <form onSubmit={this.handleSubmit}>
                    <input  placeholder="Nome de Usuário"
                            value={this.state.username} 
                            onChange={this.handleInputChange}/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}

export default Login;