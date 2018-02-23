package com.op.itsinthegame.dto;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Tournament implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	private String name;
	private Integer winpoints;
	private Integer otwinpoints;
	private Integer otlosepoints;
	private Integer drawpoints;

	public Tournament() {
		super();
	}

	public Tournament(String name, Integer winpoints, Integer otwinpoints, Integer otlosepoints,
			Integer drawpoints) {
		super();
		this.name = name;
		this.winpoints = winpoints;
		this.otlosepoints = otwinpoints;
		this.otlosepoints = otlosepoints;
		this.drawpoints = drawpoints;
	}

}
