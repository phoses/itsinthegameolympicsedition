import React, { Component } from 'react';
import axios from 'axios';

class Playerstats extends Component {
    render() {
        return (
                <div className="playerstats" onClick={this.props.hide}>

                    <span><b>{this.props.player.name}</b></span>
                    <table>
                        <tbody>
                            {this.props.playerstats.winswith !== null &&
                                <tr>
                                    <td>Wins with:</td>
                                    <td>{this.props.playerstats.winswith.player.name} ({Number(( this.props.playerstats.winswith.winpros * 100 ).toFixed( 1 ) )}%)</td>
                                </tr>
                            }    
    
                            {this.props.playerstats.loseswith !== null &&
                                <tr>
                                    <td>Loses with:</td>
                                    <td>{this.props.playerstats.loseswith.player.name} ({Number(( this.props.playerstats.loseswith.losepros * 100 ).toFixed( 1 ) )}%)</td>
                                </tr>
                            }        
    
                            {this.props.playerstats.winsagainst !== null &&
                            <tr>
                                <td>Wins againts:</td>
                                <td>{this.props.playerstats.winsagainst.player.name} ({Number(( this.props.playerstats.winsagainst.losepros * 100 ).toFixed( 1 ) )}%)</td>
                            </tr>
                            }
                            
                            {this.props.playerstats.losesagainst !== null &&
                            <tr>
                                <td>Loses against:</td>
                                <td>{this.props.playerstats.losesagainst.player.name} ({Number(( this.props.playerstats.losesagainst.winpros * 100 ).toFixed( 1 ) )}%)</td>
                            </tr>
                            }
                        </tbody>
    
                    </table>
            </div>
        );
    }
}

export default Playerstats;