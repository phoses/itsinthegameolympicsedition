package com.op.itsinthegame.repo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Scoretable;
import com.op.itsinthegame.dto.Tournament;

@RestController
@CrossOrigin(methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class DataService {

	@Autowired
	GameRepository gameRepository;
	
	@Autowired
	PlayerRepository playerRepository;
	
	@Autowired
	TournamentRepository tournamentRepository;
	
	@RequestMapping(value="/api/games", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Game> games(){
		return gameRepository.findAll();
	}
	
	@RequestMapping(value="/api/games/tournament/{id}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Game> tournamentGames(@PathVariable("id") long id){
		return gameRepository.findByTournamentId(id);
	}
	
	@RequestMapping(value="/api/games", method = {RequestMethod.POST}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Game saveGame(@RequestBody Game game){
		return gameRepository.save(game);
	}
	
	@RequestMapping(value="/api/games/{id}", method = {RequestMethod.DELETE}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public void deleteGame(@PathVariable("id") long id){	
		gameRepository.delete(id);
	}
	
	@RequestMapping(value="/api/players", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Player> players(){
		return playerRepository.findAll();
	}
	
	@RequestMapping(value="/api/players", method = {RequestMethod.POST}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Player savePlayer(@RequestBody Player player){
		return playerRepository.save(player);
	}
	
	@RequestMapping(value="/api/players/{id}", method = {RequestMethod.DELETE}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public void deletePlayer(@PathVariable("id") long id){	
		playerRepository.delete(id);
	}
	
	@RequestMapping(value="/api/tournaments", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Tournament> tournaments(){
		return tournamentRepository.findAll();
	}
	
	@RequestMapping(value="/api/tournaments", method = {RequestMethod.POST}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Tournament saveTournament(@RequestBody Tournament tournament){
		return tournamentRepository.save(tournament);
	}
	
	@RequestMapping(value="/api/tournaments/{id}", method = {RequestMethod.DELETE}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public void deleteTournament(@PathVariable("id") long id){	
		tournamentRepository.delete(id);
	}
	
	@RequestMapping(value="/api/scoretables", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretable(){
		return calculateScoretable(null);
	}
	
	@RequestMapping(value="/api/scoretables/tournament/{id}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretable(@PathVariable("id") long id){
		return calculateScoretable(id);
	}
	
	private Iterable<Scoretable> calculateScoretable(Long tournamentId){
		
		Iterable<Game> games;
		
		Map<Player, Scoretable> scoretables = new HashMap<>();
		
		if(tournamentId == null){
			games = gameRepository.findAll();
		}else{
			games = gameRepository.findByTournamentId(tournamentId);;
		}
		
		for(Game game : games){
			
			for(Player player : game.getHomeplayers()){
				if(!scoretables.containsKey(player)){
					scoretables.put(player, new Scoretable(player));
				}
				
				setPlayerScore(game, scoretables.get(player), true);
			}	
			
			for(Player player : game.getAwayplayers()){
				if(!scoretables.containsKey(player)){
					scoretables.put(player, new Scoretable(player));
				}
				
				setPlayerScore(game, scoretables.get(player), false);
			}
		}

		List<Scoretable> sorted = new ArrayList<>(scoretables.values());
		Collections.sort(sorted, new ScoretableComparator());
		
		return sorted;
	}

	private void setPlayerScore(Game game, Scoretable scoretable, boolean homeplayer) {
		
		scoretable.addGamesplayed(1);
		
		if(homeplayer){
			scoretable.addGoalsfor(game.getHomegoals());
			scoretable.addGoalsagainst(game.getAwaygoals());
		}else{
			scoretable.addGoalsfor(game.getAwaygoals());
			scoretable.addGoalsagainst(game.getHomegoals());
		}
		
		if((homeplayer && game.getHomegoals() > game.getAwaygoals())
				|| (!homeplayer && game.getHomegoals() < game.getAwaygoals())){
			
			if(game.isOvertime()){
				scoretable.addOtwins(1);
				scoretable.addPoints(game.getTournament().getOvertimewinpoints());
			}else{
				scoretable.addWins(1);
				scoretable.addPoints(game.getTournament().getWinpoints());
			}
			
		}else if(game.getHomegoals() == game.getAwaygoals()){
			
			scoretable.addDraws(1);
			scoretable.addPoints(game.getTournament().getDrawpoints());
			
		}else{
			
			if(game.isOvertime()){
				scoretable.addOtloses(1);
				scoretable.addPoints(game.getTournament().getOvertimelosepoints());
			}else{
				scoretable.addLoses(1);
			}
			
		}

	}
}
