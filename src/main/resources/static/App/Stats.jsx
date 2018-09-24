import React, { Component } from 'react';
import GameRow from './GameRow.jsx';
import * as functions from "./Functions.jsx";
import axios from 'axios';
import TournamentTable from './TournamentTable.jsx';
import TournamentSelect from './TournamentSelect.jsx';
import Playerstats from './Playerstats.jsx';
import Charts from './Charts.jsx';

class Stats extends Component {
    componentWillMount() {
        this.handleChange();
    }

    constructor( props ) {
        super( props );
        this.state = {
            tournamentindex: -1,
            playerstatsvisible: false,
            player: null,
            playerstats: {
                "winswith": null,
                "loseswith": null,
                "winsagainst": null,
                "losesagainst": null
            },
            formCount: 0,
            scoreasteam: true
        }

        this.clear = this.clear.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.handleTournamentChange = this.handleTournamentChange.bind( this );
        this.playerclick = this.playerclick.bind( this );
        this.handleFormChange = this.handleFormChange.bind( this );
        this.scoreasteamChange = this.scoreasteamChange.bind( this );
        this.chartRef = React.createRef();
        
    };

    clear() {
        this.setState( {} );
    }

    scoreasteamChange(){
        this.state.scoreasteam = !this.state.scoreasteam;
        this.handleChange();
    }
    
    playerclick( player ) {

        if ( this.state.formCount == 6 || this.state.formCount == 12 ) {
            return;
        }

        var selectedTournament = undefined;
        if ( this.state.tournamentindex > -1 ) {
            selectedTournament = this.props.data.tournaments[this.state.tournamentindex];
        }

        var charttype = this.state.formCount == 777 ? 'week' : 'all';

        this.chartRef.current.playerClick( player, charttype, selectedTournament );
    }

    handleTournamentChange( event ) {

        var selectedTournament = undefined;
        if ( event != undefined ) {
            this.state.tournamentindex = event.target.value;
            var selectedTournament = this.props.data.tournaments[this.state.tournamentindex];
        } else {
            if ( this.state.tournamentindex > -1 ) {
                var selectedTournament = this.props.data.tournaments[this.state.tournamentindex];
            }
        }

        this.handleChange();
    }

    handleFormChange( newForm ) {
        this.state.formCount = newForm;
        this.handleChange();
    }

    handleChange() {
        
        if ( this.chartRef.current != undefined ) {
            this.chartRef.current.clear();
        }

        var selectedTournament = undefined;
        if ( this.state.tournamentindex > -1 ) {
            var selectedTournament = this.props.data.tournaments[this.state.tournamentindex];
        }

        var formurl = "";
        var gamesFormurl = "";
        var scoreasteamurl = this.state.scoreasteam ? "/true" : "";
        
        if ( this.state.formCount > 0 ) {
            if ( this.state.formCount == 777 ) {
                formurl = "/currentweek";
                gamesFormurl = "/currentweek";
            } else {
                formurl = "/playergamecount/" + this.state.formCount;
            }
        }

        if ( selectedTournament != undefined ) {
            axios.get( this.props.data.apilocation + '/api/games/tournament/' + selectedTournament.id + gamesFormurl ).then(( response ) => {
                console.log( "fetched games : " + JSON.stringify( response ) );
                this.props.data.games = response.data;
                this.setState( {} );
            } );

            axios.get( this.props.data.apilocation + '/api/scoretables/tournament/' + selectedTournament.id + formurl + scoreasteamurl).then(( response ) => {
                console.log( "fetched scoretables : " + JSON.stringify( response ) );
                this.props.data.scoretables = response.data;
                this.setState( {} );
            } );
        } else {
            axios.get( this.props.data.apilocation + '/api/games' + gamesFormurl ).then(( response ) => {
                console.log( "fetched games : " + JSON.stringify( response ) );
                this.props.data.games = response.data;
                this.setState( {} );
            } );

            axios.get( this.props.data.apilocation + '/api/scoretables' + formurl + scoreasteamurl).then(( response ) => {
                console.log( "fetched scoretables : " + JSON.stringify( response ) );
                this.props.data.scoretables = response.data;
                this.setState( {} );
            } );
        }

        if ( this.state.player != undefined && this.state.playerstatsvisible ) {
            this.playerclick( this.state.player );
        }

    }

    render() {
        return (
            <div className="renderContent">

                <TournamentSelect
                    changeTournament={this.handleTournamentChange}
                    tournamentindex={this.state.selectedtournament}
                    data={this.props.data}
                    emptySelect={true}
                />

                <br /> <br />

                <div onClick={() => { this.scoreasteamChange() }} className={"selecttoken " + ( this.state.scoreasteam ? 'selected' : '' )}><i className="fas fa-handshake"></i></div>
                
                <div className="right">
                    <span className={"tournamentformselect left " + ( this.state.formCount == 0 ? 'selected' : '' )} onClick={() => { this.handleFormChange( 0 ) }}>All</span>
                    <span className={"tournamentformselect " + ( this.state.formCount == 6 ? 'selected' : '' )} onClick={() => { this.handleFormChange( 6 ) }}>6</span>
                    <span className={"tournamentformselect " + ( this.state.formCount == 12 ? 'selected' : '' )} onClick={() => { this.handleFormChange( 12 ) }}>12</span>
                    <span className={"tournamentformselect right " + ( this.state.formCount == 777 ? 'selected' : '' )} onClick={() => { this.handleFormChange( 777 ) }}>Weekly</span>
                </div>

                <TournamentTable data={this.props.data} scoretables={this.props.data.scoretables} onplayerclick={this.playerclick} />

                <Charts data={this.props.data} ref={this.chartRef} />

                <span className="topic">Games played</span>

                <table className="table gamerowtable">
                    <tbody>
                        {this.props.data.games.map(( game, i ) =>
                            <GameRow key={i} game={game} newgame={false} data={this.props.data} postaction={this.handleChange} />
                        )}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Stats;