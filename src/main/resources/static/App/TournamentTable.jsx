import React, { Component } from 'react';
import axios from 'axios';

class TournamentTable extends Component {

    render() {
        return (

            <table className="table tournamenttable">
                <tbody>

                    <tr>
                        <td>Player</td>
                        <td>GP</td>
                        <td>W</td>
                        <td>L</td>
                        <td>D</td>
                        <td>OTW</td>
                        <td>OTL</td>
                        <td className="right">STR</td>
                        <td>&nbsp;</td>
                        <td>A.GF</td>
                        <td>A.GA</td>
                        <td>A.PTS</td>
                        <td>WIN%</td>
                    </tr>

                    {this.props.scoretables.map(( scoretable, i ) =>
                        <tr key={i}>
                            <td>
                                <span onClick={() => { this.props.onplayerclick( scoretable.player ) }}>
                                    {scoretable.player.name}
                                </span>
                            </td>
                            <td>{scoretable.gamesplayed}</td>
                            <td>{scoretable.wins}</td>
                            <td>{scoretable.loses}</td>
                            <td>{scoretable.draws}</td>
                            <td>{scoretable.otwins}</td>
                            <td>{scoretable.otloses}</td>
                            <td>{scoretable.streakCount}</td>
                            <td className="left">{scoretable.streakType}</td>
                            <td>{Number(( scoretable.avggoalsfor ).toFixed( 2 ) )}</td>
                            <td>{Number(( scoretable.avggoalsagainst ).toFixed( 2 ) )}</td>
                            <td>{Number(( scoretable.avgpoints ).toFixed( 2 ) )}</td>
                            <td>{Number(( scoretable.winpros * 100 ).toFixed( 2 ) )}</td>
                        </tr>
                    )}

                </tbody>
            </table>

        );
    }
}

export default TournamentTable;