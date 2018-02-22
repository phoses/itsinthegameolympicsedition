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
            games: [],
            tournaments:[],
            scoretables:[]
        }
     
    };
    
    componentDidMount() {        
        axios.get( 'http://localhost:8080/api/tournaments' ).then( ( response ) => {
            console.log( "fetched tournaments : " + JSON.stringify( response ) );
            this.setState({tournaments:response.data});
        } );
        
        axios.get( 'http://localhost:8080/api/players' ).then( ( response ) => {
            console.log( "fetched players : " + JSON.stringify( response ) );
            this.setState({players:response.data});
        } );
        
        axios.get( 'http://localhost:8080/api/games' ).then( ( response ) => {
            console.log( "fetched games : " + JSON.stringify( response ) );
            this.setState({games:response.data});
        } );
        
        axios.get( 'http://localhost:8080/api/scoretables' ).then( ( response ) => {
            console.log( "fetched scoretables : " + JSON.stringify( response ) );
            this.setState({scoretables:response.data});
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
                        <Route exact path='/' component={()=> <Stats data={this.state} fetchGames={this.fetchGames}/>} />
                        <Route exact path='/Newgame' component={()=> <Newgame data={this.state}/>} />
                        <Route exact path='/Config' component={()=> <Config data={this.state}/>} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
export default App;