import React, { Component } from 'react';
import GameRow from './GameRow.jsx';
import * as functions from "./Functions.jsx";
import axios from 'axios';
import TournamentTable from './TournamentTable.jsx';
import TournamentSelect from './TournamentSelect.jsx';

class Stats extends Component {
    componentWillMount() {
        this.handleChange();
    }

    constructor( props ) {
        super( props );
        this.state = {
            tournamentindex: -1
        }

        this.clear = this.clear.bind( this );
        this.handleChange = this.handleChange.bind( this );
    };

    clear() {
        this.setState( {} );
    }

    handleChange( event ) {

        var selectedTournament = undefined;
        if ( event != undefined ) {
            this.state.tournamentindex = event.target.value;
            var selectedTournament = this.props.data.tournaments[this.state.tournamentindex];
        } else {
            if ( this.state.tournamentindex > -1 ) {
                var selectedTournament = this.props.data.tournaments[this.state.tournamentindex];
            }
        }

        if ( selectedTournament != undefined ) {
            axios.get( this.props.data.apilocation + '/api/games/tournament/' + selectedTournament.id ).then(( response ) => {
                console.log( "fetched games : " + JSON.stringify( response ) );
                this.props.data.games = response.data;
                this.setState( {} );
            } );

            axios.get( this.props.data.apilocation + '/api/scoretables/tournament/' + selectedTournament.id ).then(( response ) => {
                console.log( "fetched scoretables : " + JSON.stringify( response ) );
                this.props.data.scoretables = response.data;
                this.setState( {} );
            } );
        } else {
            axios.get( this.props.data.apilocation + '/api/games' ).then(( response ) => {
                console.log( "fetched games : " + JSON.stringify( response ) );
                this.props.data.games = response.data;
                this.setState( {} );
            } );

            axios.get( this.props.data.apilocation + '/api/scoretables' ).then(( response ) => {
                console.log( "fetched scoretables : " + JSON.stringify( response ) );
                this.props.data.scoretables = response.data;
                this.setState( {} );
            } );
        }

    }

    render() {
        return (
            <div className="renderContent">

                <TournamentSelect
                    changeTournament={this.handleChange}
                    tournamentindex={this.state.selectedtournament}
                    data={this.props.data}
                    emptySelect={true}
                />

                <TournamentTable scoretables={this.props.data.scoretables} />

                <h3>Games played</h3>

                <table className="table gamerowtable">
                    <tbody>
                        {this.props.data.games.map(( game, i ) =>
                            <GameRow key={i} game={game} action='Delete' data={this.props.data} postaction={this.handleChange} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stats;