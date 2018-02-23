package com.op.itsinthegame.dto;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Player implements Serializable{

	private static final long serialVersionUID = 1L;
	
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
