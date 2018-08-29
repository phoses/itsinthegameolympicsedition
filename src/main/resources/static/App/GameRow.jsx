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
        console.log( "newgame :" + this.props.newgame )
        console.log( "game :" + this.props.game.timeplayed );

        if ( this.props.newgame ) {
                        
            if(this.props.game.tournament == null){
                alert("Choose tournament");
                return;
            }else{
                this.savegame(); 
            }   
            
        } else {
            this.deletegame();
        }

        if ( this.props.postaction !== undefined ) {
            this.props.postaction();
        }
    }

    deletegame() {
        console.log( "this.props.data :" + JSON.stringify( this.props.data ) )
        functions.deleteGame( this.props, this.props.game, this.props.postaction );
    }

    savegame() {
        console.log( "this.props.data :" + JSON.stringify( this.props.data ) )        
        functions.saveGame( this.props, this.props.game, this.props.postaction );
    }

    handlechange( event ) {
        this.props.game.overtime = event.target.checked;
        this.setState( {} );
    }

    render() {
        return (
            <tr className={"gamerow " + (this.props.newgame ? "newgame" : "gamelist")}>

                {this.props.game.id != undefined &&
                    <td>
                        <Moment format="DD.MM.YYYY HH:mm">{this.props.game.timeplayed}</Moment>
                    </td>
                }
                <td className="tdright" style={( this.props.newgame ) ? { width: '20%' } : {}}>
                    {this.props.game.homeplayers.map(( player, i ) => {
                        if ( this.props.newgame )
                            return <div className="name" key={i}>{i > 0 ? '  ' : ''} {player != null ? player.name : ''}</div>

                        return <span key={i}>{i > 0 ? '  ' : ''} {player != null ? player.name : ''}</span>

                    }
                    )}
                </td>
                <td className="tdcenter">-</td>
                <td className="tdleft" style={( this.props.newgame ) ? { width: '20%' } : {}}>
                    {this.props.game.awayplayers.map(( player, i ) => {
                        if ( this.props.newgame )
                            return <div className="name" key={i}>{i > 0 ? '  ' : ''} {player != null ? player.name : ''}</div>

                        return <span key={i}>{i > 0 ? '  ' : ''} {player != null ? player.name : ''}</span>

                    }
                    )}
                </td>
                <td className="tdcenter"></td>
                <td className="tdcenter"><span>{this.props.game.homegoals}</span></td>
                <td className="tdcenter">-</td>
                <td className="tdcenter"><span>{this.props.game.awaygoals}</span></td>
                <td className="tdcenter">
                    {this.props.newgame ? (
                        <input type="checkbox" checked={this.props.game.overtime} onChange={this.handlechange} />
                    ) : (
                            <span>{this.props.game.overtime == true ? 'ot' : ''}</span>
                        )}

                </td>
                <td className="tdright">
                    {this.props.newgame ? (
                        <span className="actionbutton save" onClick={this.action}><i className="far fa-save"></i></span>
                    ) : (
                            <span className="actionbutton delete" onClick={this.action}><i className="far fa-trash-alt"></i></span>
                        )}
                </td>
            </tr>
        );
    }
}

export default GameRow;