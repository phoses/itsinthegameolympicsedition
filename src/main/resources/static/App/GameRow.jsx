import React, { Component } from 'react';
import Moment from 'react-moment';
import * as functions from "./Functions.jsx";

class GameRow extends React.Component {
    constructor( props ) {
        super( props );
        this.action = this.action.bind( this );
        this.savegame = this.savegame.bind( this );
        this.deletegame = this.deletegame.bind( this );
        this.handlechange = this.handlechange.bind( this );
        
    };

    action() {
        console.log( "action :" + this.props.action )
        console.log( "game :" + this.props.game.timeplayed );
        
        if(this.props.action == 'Save'){
            this.savegame();
        }
        
        if(this.props.action == 'Delete'){
            this.deletegame();
        }
        
        if(this.props.postaction !== undefined){
            this.props.postaction();
        }
    }
    
    deletegame() {
        console.log( "this.props.data :" + JSON.stringify(this.props.data) )
        functions.deleteGame(this.props, this.props.game, this.props.postaction);
    }
    
    savegame() {
        console.log( "this.props.data :" + JSON.stringify(this.props.data) )
        functions.saveGame(this.props, this.props.game, this.props.postaction);
    }
    
    handlechange(event){
        this.props.game.overtime = event.target.checked;
        this.setState({});
    }
    
    render() {
        return (
            <tr className="table gamerow">
             
                <td>
                    <Moment format="DD.MM.YYYY HH:mm">{this.props.game.timeplayed}</Moment>
                </td>
                <td>
                    {this.props.game.homeplayers.map(( player, i ) =>
                        <span key={i}>{i > 0 ? '  ' : ''} {player.name}</span>
                    )}
                </td>
                <td>-</td>
                <td>
                    {this.props.game.awayplayers.map(( player, i ) =>
                        <span key={i}>{i > 0 ? '  ' : ''}{player.name}</span>
                    )}
                </td>
                <td>:</td>
                <td className="tdcenter"><span>{this.props.game.homegoals}</span></td>
                <td className="tdcenter">-</td>
                <td className="tdcenter"><span>{this.props.game.awaygoals}</span></td>
                <td>
                    {this.props.action =='Save' ? (
                        <span>ot<input type="checkbox" checked={this.props.game.overtime} onChange={this.handlechange}/></span>
                    ) : (
                        <span>{this.props.game.overtime == true ? 'ot' : ''}</span>    
                    )}        
                   
                </td>
                <td><button onClick={this.action}>{this.props.action}</button></td>
            </tr>

        );
    }
}

export default GameRow;