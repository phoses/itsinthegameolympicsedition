package com.op.itsinthegame.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Game{
	
	@Id
	private String id;
	private Date timeplayed;
	private Set<Player> homeplayers;
	private Set<Player> awayplayers;
	private Integer homegoals;
	private Integer awaygoals;
	private boolean overtime;
	private Tournament tournament;

	public Game() {
		super();
	}

	public Game(Date timeplayed, Set<Player> homeplayers, Set<Player> awayplayers, Integer homegoals, Integer awaygoals,
			boolean overtime, Tournament tournament) {
		super();
		this.timeplayed = timeplayed;
		this.homeplayers = homeplayers;
		this.awayplayers = awayplayers;
		this.homegoals = homegoals;
		this.awaygoals = awaygoals;
		this.overtime = overtime;
		this.tournament = tournament;
	}
	
	public Set<Player> getAllPlayers(){
		
		Set<Player> allPlayers = new HashSet<>();
		allPlayers.addAll(homeplayers);
		allPlayers.addAll(awayplayers);
		
		return allPlayers;
	}

}
