import React, { Component } from 'react';

class PlayerList extends Component {
    render() {
        return (
            <div className="center">

                {this.props.players.map(( player, i ) =>
                    <div className="player" key={i} onClick={() => this.props.selectPlayer( player )}>{player.name}</div>
                )}

            </div>
        );
    }
}

export default PlayerList;