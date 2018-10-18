import React, { Component } from 'react';
import cookie from 'react-cookie';

class TournamentSelect extends Component {

    constructor( props ) {
        super( props );
        this.state = {
//                defaultTournamentId : cookie.load('defaultTournament')
                selectedTournament:null 
        }
     
        this.changeTournament = this.changeTournament.bind( this );
    }

    changeTournament( tournament ) {
        
        console.log("selected tournament " + tournament.name);
        
        if(this.state.selectedTournament == tournament){
            tournament = null;
        }
        
        this.setState({selectedTournament : tournament});
        this.props.changeTournament( tournament );
    }
    
    render() {
        return (

            <div className="tournamentSelect">
                <span className="formselect topic">Tournament:</span>
        
                <div className="tournamentList">
                    {this.props.data.tournaments.map(( tournament, i ) =>
                        <span className={"tournament selectable " + (this.state.selectedTournament == tournament ? "selected" : "")} key={i} onClick={() => this.changeTournament( tournament )}>
                            {tournament.name}
                        </span>
                    )}
                </div>
        
            </div>
        );
    }
}

export default TournamentSelect;