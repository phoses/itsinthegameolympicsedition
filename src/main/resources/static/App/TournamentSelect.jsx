import React, { Component } from 'react';
import cookie from 'react-cookie';

class TournamentSelect extends Component {

    constructor( props ) {
        super( props );
        this.state = {
                defaultTournamentId : cookie.load('defaultTournament')
        }
     
        this.changeTournament = this.changeTournament.bind( this );
    }

    changeTournament( event ) {
        
        for (var i = 0; i < this.props.data.tournaments.length; i++) {            
            if(event.target.value == i){
                cookie.save('defaultTournament', this.props.data.tournaments[i].id);    
            }

        }

        this.props.changeTournament( event );
    }
    
    render() {
        return (

            <div className="tournamentSelect">
                <span className="formselect topic">Tournament:</span>
                <select className="select" value={this.props.tournamentindex} onChange={this.changeTournament}>
                    {this.props.emptySelect &&
                        <option value="">-- Select tournament --</option>
                    }
                    {this.props.data.tournaments.map(( tournament, i ) =>
                        <option key={i} name="tournament" value={i} >{tournament.name}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default TournamentSelect;