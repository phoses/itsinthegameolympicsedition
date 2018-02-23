import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlayerAdd from './PlayerAdd.jsx';
import TournamentAdd from './TournamentAdd.jsx';
import * as functions from "./Functions.jsx";

class Config extends Component {
    constructor() {
        super();

    };



    render() {
        return (
            <div>
                <PlayerAdd data={this.props.data}/>
                <br/><br/>
                <TournamentAdd data={this.props.data}/>
            </div>
        );
    }
}
export default Config;