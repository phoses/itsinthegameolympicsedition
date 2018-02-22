import React, { Component } from 'react';
import GameRow from './GameRow.jsx';
import * as functions from "./Functions.jsx";
import axios from 'axios';
import TournamentTable from './TournamentTable.jsx';

class Stats extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            selectedtournament: ''
        }

        this.clear = this.clear.bind( this );
        this.handleChange = this.handleChange.bind( this );
    };

    clear() {
        this.setState( {} );
    }

    handleChange( event ) {
        this.setState({selectedtournament: event.target.value});
        
        if(event.target.value != ''){
            axios.get( 'http://localhost:8080/api/games/tournament/'+event.target.value ).then( ( response ) => {
                console.log( "fetched games : " + JSON.stringify( response ) );
                this.props.data.games = response.data;
                this.setState({});
            } );
            
            axios.get( 'http://localhost:8080/api/scoretables/tournament/'+event.target.value ).then( ( response ) => {
                console.log( "fetched scoretables : " + JSON.stringify( response ) );
                this.props.data.scoretables = response.data;
                this.setState({});
            } );
        }else{
            axios.get( 'http://localhost:8080/api/games' ).then( ( response ) => {
                console.log( "fetched games : " + JSON.stringify( response ) );
                this.props.data.games = response.data;
                this.setState({});
            } );
            
            axios.get( 'http://localhost:8080/api/scoretables' ).then( ( response ) => {
                console.log( "fetched scoretables : " + JSON.stringify( response ) );
                this.props.data.scoretables = response.data;
                this.setState({});
            } );
        }

    }

    render() {
        return (
            <div>
                <span>Tournament:</span>
                <select onChange={this.handleChange} value={this.state.selectedtournament}>
                    <option value="">--select tournament--</option>
                    {this.props.data.tournaments.map(( tournament, i ) =>
                        <option key={i} value={tournament.id}>{tournament.name}</option>
                    )}
                </select>
        
                <TournamentTable scoretables={this.props.data.scoretables} />
        
                <h3>Games played</h3>

                <table>
                    <tbody>
                        {this.props.data.games.map(( game, i ) =>
                            <GameRow key={i} game={game} action='delete' data={this.props.data} postaction={this.clear} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stats;