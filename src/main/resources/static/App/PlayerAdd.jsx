import React, { Component } from 'react';
import PlayerList from './PlayerList.jsx';
import * as functions from "./Functions.jsx";

class PlayerAdd extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            name: ''
        }

        this.handleInputChange = this.handleInputChange.bind( this );
        this.afterSave = this.afterSave.bind( this );
        this.savePlayer = this.savePlayer.bind( this );
        this.deletePlayer = this.deletePlayer.bind( this );
    }

    handleInputChange( event ) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState( {
            [name]: value
        } );
    }
    
    afterSave(){        
        this.setState({
            name: ''
        });
    }
    
    savePlayer(){
        functions.savePlayer(this.props, this.state, this.afterSave);
    }
    
    deletePlayer(player){
        functions.deletePlayer(this.props, player, () => this.setState({}));
    }

    render() {
        return (
            <div className="renderContent">
                <h2>Players</h2>
                <PlayerList players={this.props.data.players} selectPlayer={this.deletePlayer} />

                <span>Add new player</span> <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
                <input type="button" value="Add" onClick={this.savePlayer} />
            </div>
        );
    }
}

export default PlayerAdd;