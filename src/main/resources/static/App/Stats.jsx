import React, { Component } from 'react';
import GameRow from './GameRow.jsx';
import * as functions from "./Functions.jsx";
import axios from 'axios';
import TournamentTable from './TournamentTable.jsx';
import TournamentSelect from './TournamentSelect.jsx';
import Playerstats from './Playerstats.jsx';

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
            }
        }

        this.clear = this.clear.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.playerclick = this.playerclick.bind( this );
    };

    clear() {
        this.setState( {} );
    }
                
    playerclick(player){
        console.log("fetch playerstats " + player.name);
        
        axios.get( this.props.data.apilocation + '/api/playerstats/' + player.id ).then(( response ) => {
            console.log( "fetched playerstats : " + JSON.stringify( response ) );

            console.log("this.props.playerstats " + JSON.stringify(response.data));
//            console.log("this.props.playerstats.winswith !== null" + JSON.stringify(response.data).playerstats.winswith == undefined);
            
            this.setState( {
                player: player,
                playerstatsvisible: true,
                playerstats: response.data
            } );
        } );
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
        
        if(this.state.player != undefined && this.state.playerstatsvisible){
            this.playerclick(this.state.player);
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

                <TournamentTable data={this.props.data} scoretables={this.props.data.scoretables} onplayerclick={this.playerclick}/>
                   
                {this.state.playerstatsvisible && 
                    <Playerstats playerstats={this.state.playerstats} hide={() => {this.setState({playerstatsvisible:false})} } player={this.state.player}/>
                }
                
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