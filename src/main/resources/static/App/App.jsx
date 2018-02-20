import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Stats from './Stats.jsx';
import Newgame from './Newgame.jsx';
import Config from './Config.jsx';
import * as functions from "./Functions.jsx";
import axios from 'axios';

class App extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            players: [],
            games: [{
                homePlayers: [{name:'olli'}],
                awayPlayers: [{name:'antti'}],
                homeGoals: 2,
                awayGoals: 2,
                timeplayed: new Date()
            }],
            tournaments:[]
        }
     
    };
    
    componentDidMount() {        
        axios.get( 'http://localhost:8080/api/tournaments' ).then( ( response ) => {
            console.log( "fetched tournaments : " + JSON.stringify( response.data._embedded.tournaments ) );
            this.setState({tournaments:response.data._embedded.tournaments});
        } );
        
        axios.get( 'http://localhost:8080/api/players' ).then( ( response ) => {
            console.log( "fetched players : " + JSON.stringify( response.data._embedded.players ) );
            this.setState({players:response.data._embedded.players});
        } );
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <ul className="header">
                        <li><NavLink exact to={'/'}>Stats</NavLink></li>
                        <li><NavLink to={'/Newgame'}>New game</NavLink></li>
                        <li><NavLink to={'/Config'}>Config</NavLink></li>
                    </ul>
                    <hr />

                    <div className="content">
                        <Route exact path='/' component={()=> <Stats data={this.state}/>} />
                        <Route exact path='/Newgame' component={()=> <Newgame data={this.state}/>} />
                        <Route exact path='/Config' component={()=> <Config data={this.state}/>} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
export default App;