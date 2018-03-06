package com.op.itsinthegame.dto;

import lombok.Data;

@Data
public class Playerstats {
	
	private Playerwinpros winswith;
	private Playerwinpros loseswith;
	private Playerwinpros winsagainst;
	private Playerwinpros losesagainst;
	
}
