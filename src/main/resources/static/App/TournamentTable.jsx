import React, { Component } from 'react';

class TournamentTable extends Component {
    render() {
        return (

            <table>
                <tbody>

                    <tr>
                        <td>Player</td>
                        <td>GP</td>
                        <td>W</td>
                        <td>L</td>
                        <td>D</td>
                        <td>OTW</td>
                        <td>OTL</td>
                        <td>PTS</td>
                        <td>A.GF</td>
                        <td>A.GA</td>
                        <td>A.PTS</td>
                        <td>WIN%</td>
                    </tr>

                    {this.props.scoretables.map(( scoretable, i ) =>
                        <tr key={i}>
                            <td>{scoretable.player.name}</td>
                            <td>{scoretable.gamesplayed}</td>
                            <td>{scoretable.wins}</td>
                            <td>{scoretable.loses}</td>
                            <td>{scoretable.draws}</td>
                            <td>{scoretable.otwins}</td>
                            <td>{scoretable.otloses}</td>
                            <td>{scoretable.points}</td>
                            <td>{scoretable.avggoalsfor}</td>
                            <td>{scoretable.avggoalsagainst}</td>
                            <td>{scoretable.avgpoints}</td>
                            <td>{scoretable.winpros}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        );
    }
}

export default TournamentTable;