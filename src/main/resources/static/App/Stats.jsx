import React, { Component } from 'react';
import GameRow from './GameRow.jsx';
import * as functions from "./Functions.jsx";

class Stats extends Component {
    constructor( props ) {
        super( props );   
        this.clear = this.clear.bind( this );
    };
    
    clear() {
        this.setState({});
    }
    
    render() {
        return (
            <div>
                <h3>Games played</h3>

                <table>
                    <tbody>
                        {this.props.data.games.map(( game, i ) =>
                            <GameRow key={i} game={game} action='delete' data={this.props.data} postaction={this.clear}/>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Stats;