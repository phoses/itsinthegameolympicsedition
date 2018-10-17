import axios from 'axios';

export function deleteGame( state, game, afterFunc ) {
    console.log( "deleteGame : " + JSON.stringify( game ) );

    if ( confirm( "Delete game?" ) ) {
                
        axios.delete( state.data.apilocation+'/api/games/'+game.id )
        .then( function( response ) {
            console.log( "deleted game : " + JSON.stringify( response ) );
            
            var index = state.data.games.indexOf( game )
            state.data.games.splice( index, 1 );
            
            afterFunc();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}

export function deletePlayer( state, player, afterFunc) {
    console.log( "deletePlayer : " + JSON.stringify( player ) );

    if ( confirm( "Delete player?" ) ) {
        
        axios.delete( state.data.apilocation+'/api/players/'+player.id)
        .then( function( response ) {
            console.log( "deleted player : " + JSON.stringify( response ) );
            
            var index = state.data.players.indexOf( player )
            state.data.players.splice( index, 1 );
            
            afterFunc();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}

export function deleteTournament( state, tournament, afterFunc) {
    console.log( "deleteTournament : " + JSON.stringify( tournament ) );

    if ( confirm( "Delete tournament?" ) ) {
        
        axios.delete( state.data.apilocation+'/api/tournaments/'+tournament.id )
        .then( function( response ) {
            console.log( "deleted tournament : " + JSON.stringify( response ) );
            
            var index = state.data.tournaments.indexOf( tournament )
            state.data.tournaments.splice( index, 1 );
            
            afterFunc();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}

export function saveGame( state, game, afterfunction ) {

    console.log( "saveGame : " + JSON.stringify( game ) );
    
    axios.post( state.data.apilocation+'/api/games', game )
    .then( function( response ) {
        console.log( "saved game : " + JSON.stringify( response.data ) );
        
        window.location.href = "/";
    })
    .catch(function (error) {
        console.log(error);
    });

}

export function savePlayer( state, player, afterfunction ) {

    console.log( "savePlayer : " + JSON.stringify( player ) );

    for ( var i = 0; i < state.data.players.length; i++ ) {
        if ( state.data.players[i].name == player.name ) {
            return false;
        }
    }

    if ( player.name.length > 0 ) {
     
        axios.post( state.data.apilocation+'/api/players', player )
        .then( function( response ) {
            console.log( "saved players : " + JSON.stringify( response.data ) );
            
            state.data.players.push( response.data );
            afterfunction();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}

export function saveTournament(state, tournament, afterfunction ){
    
    console.log( "saveTournament : " + JSON.stringify( tournament ) );

    for ( var i = 0; i < state.data.tournaments.length; i++ ) {
        if ( state.data.tournaments[i].name == tournament.name ) {
            return false;
        }
    }

    if ( tournament.name.length > 0 ) {

        axios.post( state.data.apilocation+'/api/tournaments', tournament )
        .then( function( response ) {
            console.log( "saved tournament : " + JSON.stringify( response.data ) );
            
            state.data.tournaments.push( response.data );
            afterfunction();
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}