import React, { Component } from 'react';

class PlayerList extends Component {
    
    constructor( props ) {
        super( props );

        this.state = {
            selectedPlayers:[]
        }
    };
    
    playerClick(player){ 
        if(this.state.selectedPlayers.includes(player)){
            var index = this.state.selectedPlayers.indexOf( player )         
            this.state.selectedPlayers.splice(index, 1);
        }else{       
            
            if(this.state.selectedPlayers.length == 4){
                return;
            }
            
            this.state.selectedPlayers = this.state.selectedPlayers.concat(player);
        }
        this.setState( {} );

        this.props.selectPlayer(player);
    }
    
    render() {
        return (
            <div className="center">

                {this.props.players.map(( player, i ) =>
                    <div className={"player selectable " + (this.state.selectedPlayers.includes(player) ? "selected" : "")} key={i} onClick={() => this.playerClick( player )}>
                        {player.name}
                    </div>
                )}

            </div>
        );
    }
}

export default PlayerList;