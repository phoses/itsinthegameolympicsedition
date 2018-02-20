package com.op.itsinthegame.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Player {

	@Id
	@GeneratedValue
	private Long id;
	private String name;

	public Player() {
		super();
	}

	public Player(String name) {
		this.name = name;
	}
}
