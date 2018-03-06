package com.op.itsinthegame.dto;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Player {
	
	@Id
	private String id;
	private String name;

	public Player() {
		super();
	}

	public Player(String name) {
		this.name = name;
	}
	
	
}
