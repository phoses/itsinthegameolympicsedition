import React, { Component } from 'react';
import * as functions from "./Functions.jsx";

class GameRow extends React.Component {
    constructor( props ) {
        super( props );
        this.action = this.action.bind( this );
        this.savegame = this.savegame.bind( this );
        this.deletegame = this.deletegame.bind( this );
    };

    action() {
        console.log( "action :" + this.props.action )
        console.log( "game :" + this.props.game.timeplayed.toLocaleDateString() );
        
        if(this.props.action == 'save'){
            this.savegame();
        }
        
        if(this.props.action == 'delete'){
            this.deletegame();
        }
        
        if(this.props.postaction !== undefined){
            this.props.postaction();
        }
    }
    
    deletegame() {
        console.log( "this.props.data :" + JSON.stringify(this.props.data) )
        functions.deleteGame(this.props, this.props.game);
        this.setState( {} );
    }
    
    savegame() {
        console.log( "this.props.data :" + JSON.stringify(this.props.data) )
        functions.saveGame(this.props, this.props.game);
        this.setState( {} );
    }
    
    render() {
        return (
            <tr>
                <td>{this.props.game.timeplayed.toLocaleDateString()}</td>
                <td>
                    {this.props.game.homePlayers.map(( player, i ) =>
                        <span key={i}>{i > 0 ? '  ' : ''} {player.name}</span>
                    )}
                </td>
                <td>-</td>
                <td>
                    {this.props.game.awayPlayers.map(( player, i ) =>
                        <span key={i}>{i > 0 ? '  ' : ''}{player.name}</span>
                    )}
                </td>
                <td>:</td>
                <td><span>{this.props.game.homeGoals}</span></td>
                <td>-</td>
                <td><span>{this.props.game.awayGoals}</span></td>
                <td><button onClick={this.action}>{this.props.action}</button></td>
            </tr>

        );
    }
}

export default GameRow;