import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Charts extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            showGraph: false,
            data: {
                labels: [],
                datasets: []
            }
        };

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split( '' );
            var color = '#';
            for ( var i = 0; i < 6; i++ ) {
                color += letters[Math.floor( Math.random() * 16 )];
            }
            return color;
        }

        this.getRandomColor = this.getRandomColor.bind( this );
        this.addPlayer = this.addPlayer.bind( this );
        this.removePlayer = this.removePlayer.bind( this );
        this.playerClick = this.playerClick.bind( this );
        this.updateState = this.updateState.bind( this );

    };

    clear() {
        this.setState( {
            showGraph: false,
            data: {
                labels: [],
                datasets: []
            }
        } );

    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split( '' );
        var color = '#';
        for ( var i = 0; i < 6; i++ ) {
            color += letters[Math.floor( Math.random() * 16 )];
        }
        return color;
    }

    playerClick( player, type, tournament ) {

        // bug in chart.js(?) when array lenght 2 and deleting first object - temp row fixes problem
        this.addPlayer('temp',[0]);
        
        if ( this.removePlayer( player.name ) ) {
            this.removePlayer('temp');
            return;
        }

        var graphUrl = '/api/graphdata/' + type + '/' + player.id;
        if ( tournament != undefined ) {
            graphUrl += '?tournament=' + tournament.id;
        }

        axios.get( this.props.data.apilocation + graphUrl ).then(( response ) => {
            this.setLabels( response.data.dates );
            this.addPlayer( player.name, response.data.values );

        } );

        this.removePlayer('temp');
    }


    addPlayer( playername, data ) {

        var newData = {
            label: playername,
            fill: false,
            borderColor: this.getRandomColor(),
            data: data
        }

        this.state.data.datasets.push( newData );
        this.updateState();
    }

    removePlayer( playername ) {

        for ( var i = 0; i < this.state.data.datasets.length; i++ ) {
            if ( this.state.data.datasets[i].label == playername ) {
                this.state.data.datasets.splice( i, 1 );
                this.updateState();
                return true;
            }
        }


        return false;
    }

    updateState() {
        this.state.showGraph = this.state.data.datasets.length > 0;
        this.setState( {} );
    }

    setLabels( labels ) {
        this.state.data.labels = labels;
    }


    render() {
        return (
            <div>
                {this.state.showGraph ?
                    <Line
                        data={this.state.data}
                        options={{
                            elements: { point: { radius: this.state.data.labels.length == 1 ? 5 : 0 } },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }} />
                    : null}
            </div>
        );
    }
}

export default Charts;