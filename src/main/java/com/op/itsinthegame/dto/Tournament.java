package com.op.itsinthegame.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Tournament {

	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private Integer winpoints;
	private Integer overtimewinpoints;
	private Integer overtimelosepoints;
	private Integer drawpoints;

	public Tournament() {
		super();
	}

	public Tournament(String name, Integer winpoints, Integer overtimewinpoints, Integer overtimelosepoints,
			Integer drawpoints) {
		super();
		this.id = id;
		this.name = name;
		this.winpoints = winpoints;
		this.overtimewinpoints = overtimewinpoints;
		this.overtimelosepoints = overtimelosepoints;
		this.drawpoints = drawpoints;
	}

}
