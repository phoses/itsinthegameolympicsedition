package com.op.itsinthegame.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Tournament implements Serializable{

	private static final long serialVersionUID = 1L;
	
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
		this.name = name;
		this.winpoints = winpoints;
		this.overtimewinpoints = overtimewinpoints;
		this.overtimelosepoints = overtimelosepoints;
		this.drawpoints = drawpoints;
	}

}
