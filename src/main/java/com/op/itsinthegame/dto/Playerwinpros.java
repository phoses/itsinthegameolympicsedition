package com.op.itsinthegame.dto;

import java.util.Comparator;

import lombok.Data;

@Data
public class Playerwinpros implements Comparable<Playerwinpros>{

	private Player player;
	private Integer games;
	private Integer wins;
	private Integer loses;
	private Double winpros;
	private Double losepros;
	
	public Playerwinpros(Player player){
		this.player = player;
		this.games = new Integer(0);
		this.wins = new Integer(0);
		this.loses = new Integer(0);
		this.winpros = new Double(0);
		this.losepros = new Double(0);
	}

	public void addGame(Game game) {
		
		games++;
		
		if((game.getHomeplayers().contains(player) && game.getHomegoals() > game.getAwaygoals())
				|| (game.getAwayplayers().contains(player) && game.getAwaygoals() > game.getHomegoals())){

			wins++;
		}else if(game.getHomegoals().compareTo(game.getAwaygoals()) != 0){
			loses++;
		}
		
		winpros = new Double(new Double(wins) / new Double(games));
		
		losepros = new Double(new Double(loses) / new Double(games));
		
	}

	@Override
	public int compareTo(Playerwinpros o) {
		
		if(winpros.compareTo(o.getWinpros()) == 0){
			return games.compareTo(o.getGames()) *-1;
		}
		
		return winpros.compareTo(o.getWinpros()) *-1;
	}
}
