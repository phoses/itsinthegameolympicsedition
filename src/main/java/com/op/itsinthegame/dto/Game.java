package com.op.itsinthegame.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Game{
	
	@Id
	private String id;
	@NonNull private Date timeplayed;
	@NonNull private Set<Player> homeplayers;
	@NonNull private Set<Player> awayplayers;
	@NonNull private Integer homegoals;
	@NonNull private Integer awaygoals;
	@NonNull private Boolean overtime;
	@NonNull private Tournament tournament;

	public Set<Player> getAllPlayers(){
		
		Set<Player> allPlayers = new HashSet<>();
		allPlayers.addAll(homeplayers);
		allPlayers.addAll(awayplayers);
		
		return allPlayers;
	}

	public boolean isOvertime() {
		return overtime;
	}

}
