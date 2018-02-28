import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayerList from './PlayerList.jsx';
import GameRow from './GameRow.jsx';
import TournamentSelect from './TournamentSelect.jsx';

class Newgame extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            game: {
                homeplayers: [],
                awayplayers: [],
                homegoals: 0,
                awaygoals: 0,
                tournament: '',
                overtime: false 
            },
            tournamentindex:0
        }

        this.selectPlayer = this.selectPlayer.bind( this );
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
    
    changeTournament( event ){
        
        this.state.tournamentindex = event.target.value;
        this.state.game.tournament = this.props.data.tournaments[this.state.tournamentindex];
        
        console.log(JSON.stringify(event.target.value));
    }

    clear() {
        this.setState( {
            game: {
                homeplayers: [],
                awayplayers: [],
                homegoals: 0,
                awaygoals: 0,
                tournament: '',
                overtime: false    
            }
        }
        );
    }

    selectPlayer( player ) {
        
        if ( this.state.game.homeplayers.length == 0 && this.state.game.awayplayers.length == 0) {
            this.state.game.timeplayed = new Date().getTime();
            this.state.game.tournament = this.props.data.tournaments[0];
        }
        
        if ( this.state.game.homeplayers.includes( player )
            || this.state.game.awayplayers.includes( player ) ) {
            return;
        }

        console.log( "selectPlayer " + player );

        if ( this.state.game.homeplayers.length <= this.state.game.awayplayers.length ) {
            this.state.game.homeplayers.push( player );
        } else {
            this.state.game.awayplayers.push( player );
        }
        this.setState( {} );

        console.log( "this.state.game.homeplayers " + this.state.game.homeplayers );
    }

    render() {
        return (
            <div className="renderContent">
                <div className="topic">Select players</div>
                
                <PlayerList players={this.props.data.players} selectPlayer={this.selectPlayer} />
                
                {this.state.game.homeplayers.length > 0 &&
                    <Result game={this.state.game}
                        clear={this.clear}
                        changeHomeGoal={this.changeHomeGoal}
                        changeAwayGoal={this.changeAwayGoal} 
                        changeTournament={this.changeTournament}
                        data={this.props.data}/>
                }
            </div>
        );
    } s
}

class Result extends React.Component {
    render() {
        return (
            <div className="renderContent">
                <span className="topic">Game</span><br/>
                <button onClick={this.props.clear}>clear</button><br /><br />

                <TournamentSelect changeTournament={this.props.changeTournament} tournamentindex={this.props.tournamentindex} data={this.props.data}/>
                
                <table className="table newgametable">
                    <tbody>
                        <tr>
                            <td colSpan="4"></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeHomeGoal( 1 )}><i class="fa fa-plus"></i></span></td>
                            <td></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeAwayGoal( 1 )}><i class="fa fa-plus"></i></span></td>
                            <td>OT</td>
                            <td></td>
                        </tr>
                            
                        <GameRow data={this.props.data} game={this.props.game} action='Save' postaction={this.props.clear}/>  
                        
                        <tr>
                            <td colSpan="4"></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeHomeGoal( -1 )}><i class="fa fa-minus"></i></span></td>
                            <td></td>
                            <td className="tdcenter"><span className="actionbutton default" onClick={() => this.props.changeAwayGoal( -1 )}><i class="fa fa-minus"></i></span></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Newgame;