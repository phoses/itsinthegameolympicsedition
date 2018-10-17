import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayerList from './PlayerList.jsx';
import GameRow from './GameRow.jsx';
import TournamentSelect from './TournamentSelect.jsx';
import { Redirect } from 'react-router';

class Newgame extends Component {
        
    constructor( props ) {
        super( props );

        this.state = {
            game: {
                homeplayers: [],
                awayplayers: [],
                homegoals: 0,
                awaygoals: 0,
                tournament: null,
                overtime: false
            },
            tournamentindex: -1,
            random: true,
            evenfill: true
        }

        this.selectPlayer = this.selectPlayer.bind( this );
        this.setPlayerToRandomTeam = this.setPlayerToRandomTeam.bind( this );
        this.clear = this.clear.bind( this );
        this.changeHomeGoal = this.changeHomeGoal.bind( this );
        this.changeAwayGoal = this.changeAwayGoal.bind( this );
        this.changeTournament = this.changeTournament.bind( this );
    };

    changeHomeGoal( changevalue ) {
        console.log( "changeHomeGoal " + changevalue );
        if ( this.state.game.homegoals + changevalue > -1 ) {
            this.state.game.homegoals = this.state.game.homegoals + changevalue;
            this.setState( {} );
        }


    }

    changeAwayGoal( changevalue ) {
        console.log( "changeAwayGoal " + changevalue );
        if ( this.state.game.awaygoals + changevalue > -1 ) {
            this.state.game.awaygoals = this.state.game.awaygoals + changevalue;
            this.setState( {} );
        }
    }

    changeTournament( event ) {

        this.state.tournamentindex = event.target.value;
        if(this.state.tournamentindex == -1){
            this.state.game.tournament = null;
        }else{
            this.state.game.tournament = this.props.data.tournaments[this.state.tournamentindex];
        }
            
        console.log( JSON.stringify( event.target.value ) );
    }

    clear() {
        console.log("clear new game");
        this.setState( {
                game: {
                    homeplayers: [],
                    awayplayers: [],
                    homegoals: 0,
                    awaygoals: 0,
                    tournament: null,
                    overtime: false
                }
            }
        );
 
    }

    setPlayerToRandomTeam( player ) {

        if ( this.state.game.homeplayers.length == 0 && this.state.game.awayplayers.length == 0 ) {
            this.state.game.timeplayed = new Date().getTime();
        }

        if ( this.state.game.homeplayers.includes( player )
            || this.state.game.awayplayers.includes( player )
            || this.state.game.homeplayers.length + this.state.game.awayplayers.length == 4 ) {
            return;
        }

        console.log( "selectPlayer " + player );

        if ( this.state.random ) {
            if ( ( Math.random() * 100 > 50 && this.state.game.homeplayers.length < 2 ) || this.state.game.awayplayers.length == 2 ) {
                this.state.game.homeplayers.push( player );
            } else {
                this.state.game.awayplayers.push( player );
            }
        }
        else if ( this.state.evenfill ) {
            if ( this.state.game.homeplayers.length < 2 ) {
                this.state.game.homeplayers.push( player );
            } else {
                this.state.game.awayplayers.push( player );
            }
        } else {
            if ( this.state.game.homeplayers.length <= this.state.game.awayplayers.length ) {
                this.state.game.homeplayers.push( player );
            } else {
                this.state.game.awayplayers.push( player );
            }
        }

        console.log( "this.state.game.homeplayers " + this.state.game.homeplayers );
        console.log( "this.state.game.awayplayers " + this.state.game.awayplayers );
    }
    
    selectPlayer( player ) {
        
        if(this.state.game.homeplayers.includes(player)){
            var index = this.state.game.homeplayers.indexOf( player )         
            this.state.game.homeplayers.splice(index, 1);
            
            this.setState( {} );
            return;
        }else if(this.state.game.awayplayers.includes(player)){
            var index = this.state.game.awayplayers.indexOf( player )         
            this.state.game.awayplayers.splice(index, 1);
            
            this.setState( {} );
            return;
        }
        
        var tempPlayerList = this.state.game.homeplayers.concat(this.state.game.awayplayers);
        this.state.game.homeplayers = [];
        this.state.game.awayplayers = [];
        
        tempPlayerList.push(player);
        
        for(var i = 0 ; i < tempPlayerList.length ; i++){
        	this.setPlayerToRandomTeam(tempPlayerList[i]);
        }
        
        this.setState( {} );
    }    

    render() {

        return (
            <div className="renderContent newgame">
                <div onClick={() => { this.setState( { random: !this.state.random } ) }} className={"selecttoken playerselecttoken " + ( this.state.random ? 'selected' : '' )}><i className="fas fa-random"></i></div>
                <div onClick={() => { this.setState( { evenfill: !this.state.evenfill } ) }} className={"selecttoken playerselecttoken " + ( this.state.evenfill ? 'selected' : '' )}><i className="fas fa-th-list"></i></div>
                <div className="topic">Select players</div>

                <PlayerList players={this.props.data.players} selectPlayer={this.selectPlayer} />

                {(this.state.game.timeplayed != undefined && this.state.game.homeplayers.length == 2 && this.state.game.awayplayers.length == 2) && 
                    <Result game={this.state.game}
                        clear={this.clear}
                        changeHomeGoal={this.changeHomeGoal}
                        changeAwayGoal={this.changeAwayGoal}
                        changeTournament={this.changeTournament}
                        data={this.props.data} />
                }
            </div>
        );
    } s
}

class Result extends React.Component {
    render() {
        return (
            <div className="newgame">

                <TournamentSelect changeTournament={this.props.changeTournament} tournamentindex={this.props.tournamentindex} data={this.props.data} />

                <table className="table newgametable">
                    <tbody>
                        <tr>
                            <td colSpan="4"></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeHomeGoal( 1 )}><i className="fa fa-plus"></i></span></td>
                            <td className="tdcenter"></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeAwayGoal( 1 )}><i className="fa fa-plus"></i></span></td>
                            <td className="tdcenter">OT</td>
                            <td></td>
                        </tr>

                        <GameRow data={this.props.data} game={this.props.game} newgame={true} postaction={this.props.clear} />

                        <tr>
                            <td colSpan="4"></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeHomeGoal( -1 )}><i className="fa fa-minus"></i></span></td>
                            <td></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeAwayGoal( -1 )}><i className="fa fa-minus"></i></span></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className="center">
                    <span className="actionbutton" onClick={() => this.props.clear()}><i className="fa fa-undo"></i></span>
                </div>
            </div>
        );
    }
}

export default Newgame;