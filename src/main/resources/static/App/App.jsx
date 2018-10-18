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
const hostname = window && window.location && window.location.hostname;

class App extends Component {
    constructor( props ) {
        super( props );

        var apilocation='';
        if(hostname=='localhost'){
            apilocation='http://localhost:8082';
        }
        
        this.state = {
            apilocation:apilocation,
            players: [],
            games: [],
            tournaments:[],
            scoretables:[]
        }
     
        console.log("this.state.apilocation="+this.state.apilocation);
    };
    
    componentDidMount() {        
        axios.get( this.state.apilocation+'/api/tournaments' ).then( ( response ) => {
//            console.log( "fetched tournaments : " + JSON.stringify( response ) );
            this.setState({tournaments:response.data});
        } );
        
        axios.get( this.state.apilocation+'/api/players' ).then( ( response ) => {
//            console.log( "fetched players : " + JSON.stringify( response ) );
            this.setState({players:response.data});
        } );
        
        axios.get( this.state.apilocation+'/api/games' ).then( ( response ) => {
//            console.log( "fetched games : " + JSON.stringify( response ) );
            this.setState({games:response.data});
        } );
        
        axios.get( this.state.apilocation+'/api/scoretables/true' ).then( ( response ) => {
//            console.log( "fetched scoretables : " + JSON.stringify( response ) );
            this.setState({scoretables:response.data});
        } );
    }
    
    render() {
        return (
            <HashRouter>
                <div id="router">
                    <ul className="header">
                        <li><NavLink exact to={'/'}><i className="fas fa-list-ul"></i></NavLink></li>
                        <li><NavLink to={'/Newgame'}><i className="fas fa-plus"></i></NavLink></li>
                        <li><NavLink to={'/Config'}><i className="fas fa-cog"></i></NavLink></li>
                    </ul>
                    
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