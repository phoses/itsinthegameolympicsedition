package com.op.itsinthegame.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class Scoretable {

	private Player player;
	private Integer gamesplayed;
	private Integer wins;
	private Integer draws;
	private Integer loses;
	private Integer otwins;
	private Integer otloses;
	private Integer points;
	private Integer goalsfor;
	private Integer goalsagainst;
	private Double avggoalsfor;
	private Double avggoalsagainst;
	private Double avgpoints;
	private Double winpros;
	private Integer streakCount;
	private StreakType streakType;
	@JsonIgnore
	private boolean streakCalculated;

	public Scoretable(Player player) {
		super();
		this.player = player;
		this.gamesplayed = new Integer(0);
		this.wins = new Integer(0);
		this.draws = new Integer(0);
		this.loses = new Integer(0);
		this.otwins = new Integer(0);
		this.otloses = new Integer(0);
		this.points = new Integer(0);
		this.avgpoints = new Double(0);
		this.winpros = new Double(0);
		this.goalsfor = new Integer(0);
		this.goalsagainst = new Integer(0);
		this.avggoalsfor = new Double(0);
		this.avggoalsagainst = new Double(0);
		this.streakCount = new Integer(0);
	}

	public void addGamesplayed(Integer count) {
		gamesplayed += count;
		calculate();
	}

	public void addWins(Integer count) {
		wins += count;

		calculateStreak(StreakType.W);
		calculate();
	}

	public void addDraws(Integer count) {
		draws += count;
		calculateStreak(StreakType.D);
		calculate();
	}

	public void addLoses(Integer count) {
		loses += count;
		calculateStreak(StreakType.L);
		calculate();
	}

	public void addOtwins(Integer count) {
		otwins += count;
		addWins(count);
	}

	public void addOtloses(Integer count) {
		otloses += count;
		addLoses(count);
	}

	public void addPoints(Integer count) {
		points += count;
		calculate();
	}

	public void addGoalsfor(Integer count) {
		goalsfor += count;
		calculateGoals();
	}

	public void addGoalsagainst(Integer count) {
		goalsagainst += count;
		calculateGoals();
	}
	
	private void calculateStreak(StreakType resultType){
		
		if(streakType == null){
			streakType = resultType;
		}
		
		if(!streakType.equals(resultType)){
			streakCalculated = true;
		}
		
		if(!streakCalculated){
			streakCount += 1; 
		}
	}

	private void calculateGoals() {
		avggoalsfor = new Double(new Double(goalsfor) / new Double(gamesplayed));
		avggoalsagainst = new Double(new Double(goalsagainst) / new Double(gamesplayed));
	}

	private void calculaWinpros() {
		winpros = new Double((new Double(wins)) / new Double(gamesplayed));
	}

	private void calculateAvgPoints() {
		avgpoints = new Double(new Double(points) / new Double(gamesplayed));
	}

	private void calculate() {
		calculaWinpros();
		calculateAvgPoints();
	}

}
