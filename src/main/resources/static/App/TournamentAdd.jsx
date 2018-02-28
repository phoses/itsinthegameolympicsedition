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
            <div className="renderContent">

                <div className="topic">Tournaments</div>

                {this.props.data.tournaments.map(( tournament, i ) =>
                    <div className="tournamentadd" key={i} onClick={() => this.deleteTournament( tournament )}>
                        <span className="name">name: {tournament.name}</span><br/>
                        <span>win points: {tournament.winpoints}</span><br/>
                        <span>OT win points: {tournament.otwinpoints}</span><br/>
                        <span>OT lose points: {tournament.otlosepoints}</span><br/>
                        <span>draw points: {tournament.drawpoints}</span>
                    </div>
                )}
                <br/><br/>
                <div>Add new Tournament:</div>
                <div>
                    <span>name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/> </span> <br />
                    <span>win points: <input type="text" size="2" name="winpoints" value={this.state.winpoints} onChange={this.handleInputChange}/> </span> <br />
                    <span>OT win points: <input type="text" size="2" name="otwinpoints" value={this.state.otwinpoints} onChange={this.handleInputChange}/> </span> <br />
                    <span>OT lose points: <input type="text" size="2" name="otlosepoints" value={this.state.otlosepoints} onChange={this.handleInputChange}/> </span> <br />
                    <span>draw points: <input type="text" size="2" name="drawpoints" value={this.state.drawpoints} onChange={this.handleInputChange}/> </span> <br />
                    <input type="button" value="Add" onClick={this.saveTournament}/>
                </div>
            </div>
        );
    }
}

export default TournamentAdd;