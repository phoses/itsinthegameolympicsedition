package com.op.itsinthegame.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Entity
@Data
public class Game{
	
	@Id
	@GeneratedValue
	private Long id;
	private Date timeplayed;
	@ManyToMany(targetEntity=Player.class)
	private Set<Player> homeplayers;
	@ManyToMany(targetEntity=Player.class)
	private Set<Player> awayplayers;
	private Integer homegoals;
	private Integer awaygoals;
	private boolean overtime;
	@ManyToOne(targetEntity=Tournament.class)
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

}
