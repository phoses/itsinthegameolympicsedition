import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayerList from './PlayerList.jsx';
import GameRow from './GameRow.jsx';

class Newgame extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            game: {
                homePlayers: [],
                awayPlayers: [],
                homeGoals: 0,
                awayGoals: 0,
                tournament:{}
            }
        }

        this.selectPlayer = this.selectPlayer.bind( this );
        this.clear = this.clear.bind( this );
        this.changeHomeGoal = this.changeHomeGoal.bind( this );
        this.changeAwayGoal = this.changeAwayGoal.bind( this );
    };

    changeHomeGoal( changevalue ) {
        console.log( "changeHomeGoal " + changevalue );
        if ( this.state.game.homeGoals + changevalue > -1 ) {
            this.state.game.homeGoals = this.state.game.homeGoals + changevalue;
            this.setState( {} );
        }


    }

    changeAwayGoal( changevalue ) {
        console.log( "changeAwayGoal " + changevalue );
        if ( this.state.game.awayGoals + changevalue > -1 ) {
            this.state.game.awayGoals = this.state.game.awayGoals + changevalue;
            this.setState( {} );
        }
    }

    clear() {
        this.setState( {
            game: {
                homePlayers: [],
                awayPlayers: [],
                homeGoals: 0,
                awayGoals: 0
            }
        }
        );
    }

    selectPlayer( player ) {

        if ( this.state.game.homePlayers.length == 0 && this.state.game.awayPlayers.length == 0) {
            this.state.game.timeplayed = new Date();
        }
        
        if ( this.state.game.homePlayers.includes( player )
            || this.state.game.awayPlayers.includes( player ) ) {
            return;
        }

        console.log( "selectPlayer " + player );

        if ( this.state.game.homePlayers.length <= this.state.game.awayPlayers.length ) {
            this.state.game.homePlayers.push( player );
        } else {
            this.state.game.awayPlayers.push( player );
        }
        this.setState( {} );

        console.log( "this.state.game.homePlayers " + this.state.game.homePlayers );
    }

    render() {
        return (
            <div>
                <h2>Select players</h2>
                
                <PlayerList players={this.props.data.players} selectPlayer={this.selectPlayer} />
                
                {this.state.game.homePlayers.length > 0 &&
                    <Result game={this.state.game}
                        clear={this.clear}
                        savegame={this.savegame}
                        changeHomeGoal={this.changeHomeGoal}
                        changeAwayGoal={this.changeAwayGoal} 
                        data={this.props.data}/>
                }
            </div>
        );
    } s
}

class Result extends React.Component {
    render() {
        return (
            <div>
                <h3>Game</h3>
                <button onClick={this.props.clear}>clear</button><br /><br />

                <span>Tournament:</span>
                <select onChange="">
                    {this.props.data.tournaments.map(( tournament, i ) =>
                        <option key={i} name="tournament" value={tournament}>{tournament.name}</option>
                    )}
                </select>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td colSpan="4"></td>
                            <td><button onClick={() => this.props.changeHomeGoal( 1 )}>+</button></td>
                            <td></td>
                            <td><button onClick={() => this.props.changeAwayGoal( 1 )}>+</button></td>
                            <td></td>
                        </tr>
                            
                        <GameRow data={this.props.data} game={this.props.game} action='save' postaction={this.props.clear}/>  
                        
                        <tr>
                            <td colSpan="5"></td>
                            <td><button onClick={() => this.props.changeHomeGoal( -1 )}>-</button></td>
                            <td></td>
                            <td><button onClick={() => this.props.changeAwayGoal( -1 )}>-</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Newgame;