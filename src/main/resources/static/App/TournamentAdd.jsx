import React, { Component } from 'react';
import * as functions from "./Functions.jsx";

class TournamentAdd extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            name: '',
            winpoints: 2,
            otwinpoints: 2,
            otlosepoints: 1,
            drawpoints: 1,
        };

        this.handleInputChange = this.handleInputChange.bind( this );
        this.afterSave = this.afterSave.bind( this );
        this.saveTournament = this.saveTournament.bind( this );
        this.deleteTournament = this.deleteTournament.bind( this );
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
        this.setState({name: '',
            winpoints: 2,
            otwinpoints: 2,
            otlosepoints: 1,
            drawpoints: 1});
    }
    
    saveTournament(){
        functions.saveTournament(this.props, this.state, this.afterSave);
    }
    
    deleteTournament(tournament){
        functions.deleteTournament(this.props, tournament, () => this.setState({}));
    }

    render() {
        return (
            <div>

                <h2>Tournaments</h2>

                {this.props.data.tournaments.map(( tournament, i ) =>
                    <div key={i} onClick={() => this.deleteTournament( tournament )}>
                        <span>name: {tournament.name}</span>,
                        <span>win points: {tournament.winpoints}</span>,
                        <span>OT win points: {tournament.otwinpoints}</span>,
                        <span>OT lose points: {tournament.otlosepoints}</span>,
                        <span>draw points: {tournament.drawpoints}</span>
                    </div>
                )}

                <h4>Add new Tournament:</h4>
                <div>
                    <span>name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/> </span> <br />
                    <span>win points: <input type="text" size="3" name="winpoints" value={this.state.winpoints} onChange={this.handleInputChange}/> </span>
                    <span>OT win points: <input type="text" size="3" name="otwinpoints" value={this.state.otwinpoints} onChange={this.handleInputChange}/> </span>
                    <span>OT lose points: <input type="text" size="3" name="otlosepoints" value={this.state.otlosepoints} onChange={this.handleInputChange}/> </span>
                    <span>draw points: <input type="text" size="3" name="drawpoints" value={this.state.drawpoints} onChange={this.handleInputChange}/> </span>
                    <input type="button" value="save" onClick={this.saveTournament}/>
                </div>
            </div>
        );
    }
}

export default TournamentAdd;