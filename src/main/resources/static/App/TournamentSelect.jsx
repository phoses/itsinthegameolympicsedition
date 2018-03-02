import React, { Component } from 'react';

class TournamentSelect extends Component {
    render() {
        return (

            <div className="tournamentSelect">
                <span className="formselect topic">Tournament:</span>
                <select className="select" value={this.props.tournamentindex} onChange={this.props.changeTournament}>
                    {this.props.emptySelect &&
                        <option value="">-- Select tournament --</option>
                    }
                    {this.props.data.tournaments.map(( tournament, i ) =>
                        <option key={i} name="tournament" value={i}>{tournament.name}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default TournamentSelect;