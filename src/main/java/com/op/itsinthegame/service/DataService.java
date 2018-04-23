package com.op.itsinthegame.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.op.itsinthegame.comparator.ScoretableComparator;
import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Playerstats;
import com.op.itsinthegame.dto.Playerwinpros;
import com.op.itsinthegame.dto.Scoretable;
import com.op.itsinthegame.dto.Tournament;
import com.op.itsinthegame.repo.GameRepository;
import com.op.itsinthegame.repo.PlayerRepository;
import com.op.itsinthegame.repo.TournamentRepository;

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
	public Iterable<Game> gamesCurrentWeek(){
		return gameRepository.findAll(new Sort(Sort.Direction.DESC, "timeplayed"));
	}
	
	@RequestMapping(value="/api/games/currentweek", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Game> games(){
		return filterToCurrentWeekGames(gameRepository.findAll(new Sort(Sort.Direction.DESC, "timeplayed")));
	}
	
	@RequestMapping(value="/api/games/tournament/{id}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Game> tournamentGames(@PathVariable("id") String id){
		return gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findById(id));
	}
	
	@RequestMapping(value="/api/games/tournament/{id}/currentweek", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Game> tournamentGamesCurrentWeek(@PathVariable("id") String id){
		return filterToCurrentWeekGames(gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findById(id)));
	}
	
	@RequestMapping(value="/api/games", method = {RequestMethod.POST}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Game saveGame(@RequestBody Game game){
		return gameRepository.save(game);
	}
	
	@RequestMapping(value="/api/games/{id}", method = {RequestMethod.DELETE}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public void deleteGame(@PathVariable("id") String id){	
		gameRepository.deleteGameById(id);
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
	public void deletePlayer(@PathVariable("id") String id){	
		playerRepository.deletePlayerById(id);
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
	public void deleteTournament(@PathVariable("id") String id){	
		tournamentRepository.deleteTournamentById(id);
	}
	
	@RequestMapping(value="/api/scoretables", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretable(){
		return createScoretable();
	}
	
	@RequestMapping(value="/api/scoretables/currentweek", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretableCurrentweek(){
		return createScoretableCurrentweek();
	}
	
	@RequestMapping(value="/api/scoretables/playergamecount/{gamecount}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretablePlayerGameCount(@PathVariable("gamecount") Integer gamecount){
		return createScoretable(gamecount);
	}
	
	@RequestMapping(value="/api/playerstats/{id}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Playerstats playerstats(@PathVariable("id") String id){
		
		Player player = playerRepository.findOne(id);
		
		Map<Player, Playerwinpros> withmap = new HashMap<>(); 
		Map<Player, Playerwinpros> againstmap = new HashMap<>();
		
		for(Game game : gameRepository.findByHomeplayersOrAwayplayers(player, player)){
			
			if(game.getHomeplayers().contains(player)){
				for(Player homeplayer : game.getHomeplayers()){
					if(!homeplayer.equals(player)){
						if(!withmap.containsKey(homeplayer)){
							withmap.put(homeplayer, new Playerwinpros(homeplayer));
						}
						
						withmap.get(homeplayer).addGame(game);	
					}
				}
			}else{
				for(Player homeplayer : game.getHomeplayers()){
						if(!againstmap.containsKey(homeplayer)){
							againstmap.put(homeplayer, new Playerwinpros(homeplayer));
						}
						
						againstmap.get(homeplayer).addGame(game);	
				}
			}
			
			if(game.getAwayplayers().contains(player)){
				for(Player awayplayer : game.getAwayplayers()){
					if(!awayplayer.equals(player)){
						if(!withmap.containsKey(awayplayer)){
							withmap.put(awayplayer, new Playerwinpros(awayplayer));
						}
						
						withmap.get(awayplayer).addGame(game);	
					}
				}	
			}else{
				for(Player awayplayer : game.getAwayplayers()){
					if(!againstmap.containsKey(awayplayer)){
						againstmap.put(awayplayer, new Playerwinpros(awayplayer));
					}
					
					againstmap.get(awayplayer).addGame(game);	
				}	
			}
		}
		
		
		Playerstats playerstats = new Playerstats();
		List<Playerwinpros> withPlayers = new ArrayList<>(withmap.values());
		List<Playerwinpros> againstPlayers = new ArrayList<>(againstmap.values());

		Collections.sort(withPlayers);
		Collections.sort(againstPlayers);
		
		if(!withPlayers.isEmpty()){
			playerstats.setWinswith(withPlayers.get(0));
			playerstats.setLoseswith(withPlayers.get(withPlayers.size()-1));
		}
		
		if(!againstPlayers.isEmpty()){
			playerstats.setWinsagainst(againstPlayers.get(againstPlayers.size()-1));
			playerstats.setLosesagainst(againstPlayers.get(0));
		}
		
		return playerstats;
	}
	
	
	
	@RequestMapping(value="/api/scoretables/tournament/{id}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretable(@PathVariable("id") String id){
		return createScoretable(id);
	}
	
	@RequestMapping(value="/api/scoretables/tournament/{id}/playergamecount/{gamecount}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretablePlayerGameCount(@PathVariable("id") String id, @PathVariable("gamecount") Integer gamecount){
		return createScoretable(id, gamecount);
	}
	
	@RequestMapping(value="/api/scoretables/tournament/{id}/currentweek", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretableCurrentWeek(@PathVariable("id") String id){
		return createScoretableCurrentWeek(id);
	}
	
	private Iterable<Scoretable> createScoretable(String tournamentId){
		return createScoretable(tournamentId, Integer.MAX_VALUE);
	}
	
	private Iterable<Scoretable> createScoretable(){
		return createScoretable(null, Integer.MAX_VALUE);
	}
	
	private Iterable<Scoretable> createScoretableCurrentweek(){
		return createScoretableCurrentWeek(null);
	}
	
	private Iterable<Scoretable> createScoretable(Integer playerGameCount){
		return createScoretable(null, playerGameCount);
	}
	
	private Iterable<Scoretable> createScoretable(String tournamentId, Integer playerGameCount){
		Iterable<Game> games;
				
		if(tournamentId == null){
			games = gameRepository.findAllByOrderByTimeplayedDesc();
		}else{
			games = gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findById(tournamentId));
		}	
				
		return calculateScoretable(games, playerGameCount);
	}
	
	private Iterable<Scoretable> createScoretableCurrentWeek(String tournamentId){
		Iterable<Game> games;
				
		if(tournamentId == null){
			games = gameRepository.findAllByOrderByTimeplayedDesc();
		}else{
			games = gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findById(tournamentId));
		}	
		
		List<Game> currentWeekGames = filterToCurrentWeekGames(games);
				
		return calculateScoretable(currentWeekGames, Integer.MAX_VALUE);
	}

	private List<Game> filterToCurrentWeekGames(Iterable<Game> games) {
		List<Game> currentWeekGames = new ArrayList<>();
		
		DateTime currentWeek = DateTime.now();
		
		for(Game game : games){
			
			DateTime gameWeek = new DateTime(game.getTimeplayed());
			
			if(currentWeek.getWeekOfWeekyear() == gameWeek.getWeekOfWeekyear()){
				currentWeekGames.add(game);
			}
	
		}
		return currentWeekGames;
	}

	private Iterable<Scoretable> calculateScoretable(Iterable<Game> games, Integer playerGameCount){
			
		Map<Player, Scoretable> scoretables = new HashMap<>();
		
		for(Game game : games){
			
			for(Player player : game.getHomeplayers()){
				if(!scoretables.containsKey(player)){
					scoretables.put(player, new Scoretable(player));
				}
				
				if(scoretables.get(player).getGamesplayed() < playerGameCount){
					setPlayerScore(game, scoretables.get(player), true);
				}
			}	
			
			for(Player player : game.getAwayplayers()){
				if(!scoretables.containsKey(player)){
					scoretables.put(player, new Scoretable(player));
				}
				
				if(scoretables.get(player).getGamesplayed() < playerGameCount){
					setPlayerScore(game, scoretables.get(player), false);
				}
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
				scoretable.addPoints(game.getTournament().getOtwinpoints());
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
				scoretable.addPoints(game.getTournament().getOtlosepoints());
			}else{
				scoretable.addLoses(1);
			}
			
		}

	}
}
