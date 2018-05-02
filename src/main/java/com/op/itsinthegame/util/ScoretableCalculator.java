package com.op.itsinthegame.util;

import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Scoretable;

public class ScoretableCalculator {

	public static void calcScoretable(Game game, Scoretable scoretable, boolean homeplayer) {
		
		scoretable.addGamesplayed(1);
		
		if(homeplayer){
			scoretable.addGoalsfor(game.getHomegoals());
			scoretable.addGoalsagainst(game.getAwaygoals());
		}else{
			scoretable.addGoalsfor(game.getAwaygoals());
			scoretable.addGoalsagainst(game.getHomegoals());
		}
		
		if((homeplayer && game.getHomegoals() > game.getAwaygoals())
				|| (!homeplayer && game.getHomegoals() < game.getAwaygoals())){
			
			if(game.isOvertime()){
				scoretable.addOtwins(1);
				scoretable.addPoints(game.getTournament().getOtwinpoints());
			}else{
				scoretable.addWins(1);
				scoretable.addPoints(game.getTournament().getWinpoints());
			}
			
		}else if(game.getHomegoals() == game.getAwaygoals()){
			
			scoretable.addDraws(1);
			scoretable.addPoints(game.getTournament().getDrawpoints());
			
		}else{
			
			if(game.isOvertime()){
				scoretable.addOtloses(1);
				scoretable.addPoints(game.getTournament().getOtlosepoints());
			}else{
				scoretable.addLoses(1);
			}
			
		}

	}
}
