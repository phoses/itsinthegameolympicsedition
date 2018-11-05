package com.op.itsinthegame.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import com.google.common.collect.Sets;
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
import com.op.itsinthegame.util.ScoretableCalculator;

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
		return gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findOne(id));
	}
	
	@RequestMapping(value="/api/games/tournament/{id}/currentweek", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Game> tournamentGamesCurrentWeek(@PathVariable("id") String id){
		return filterToCurrentWeekGames(gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findOne(id)));
	}
	
	@RequestMapping(value="/api/games", method = {RequestMethod.POST}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Game saveGame(@RequestBody Game game){
		return gameRepository.save(game);
	}
	
	@RequestMapping(value="/api/games/{id}", method = {RequestMethod.DELETE}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public void deleteGame(@PathVariable("id") String id){	
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
	public void deletePlayer(@PathVariable("id") String id){	
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
	public void deleteTournament(@PathVariable("id") String id){	
		tournamentRepository.delete(id);
	}
	
	@RequestMapping(value={"/api/scoretables", "/api/scoretables/{scoreasteam}"}, method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretable(@PathVariable(name="scoreasteam", required=false) Boolean scoreAsTeam){
		return createScoretable(scoreAsTeam == null ? false : scoreAsTeam);
	}
	
	@RequestMapping(value={"/api/scoretables/currentweek", "/api/scoretables/currentweek/{scoreasteam}"}, method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretableCurrentweek(@PathVariable(name="scoreasteam", required=false) Boolean scoreAsTeam){
		return createScoretableCurrentweek(scoreAsTeam == null ? false : scoreAsTeam);
	}
	
	@RequestMapping(value={"/api/scoretables/playergamecount/{gamecount}", "/api/scoretables/playergamecount/{gamecount}/{scoreasteam}"}, method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> scoretablePlayerGameCount(@PathVariable("gamecount") Integer gamecount, @PathVariable(name="scoreasteam", required=false) Boolean scoreAsTeam){
		return createScoretable(gamecount, scoreAsTeam == null ? false : scoreAsTeam);
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
	
	
	
	@RequestMapping(value={"/api/scoretables/tournament/{id}", "/api/scoretables/tournament/{id}/{scoreasteam}"}, method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretable(@PathVariable("id") String id, @PathVariable(name="scoreasteam", required=false) Boolean scoreAsTeam){
		return createScoretable(id, scoreAsTeam == null ? false : scoreAsTeam);
	}
	
	@RequestMapping(value={"/api/scoretables/tournament/{id}/playergamecount/{gamecount}", "/api/scoretables/tournament/{id}/playergamecount/{gamecount}/{scoreasteam}"}, method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretablePlayerGameCount(@PathVariable("id") String id, @PathVariable("gamecount") Integer gamecount,
			@PathVariable(name="scoreasteam", required=false) Boolean scoreAsTeam){
		return createScoretable(id, gamecount, scoreAsTeam == null ? false : scoreAsTeam);
	}
	
	@RequestMapping(value={"/api/scoretables/tournament/{id}/currentweek", "/api/scoretables/tournament/{id}/currentweek/{scoreasteam}"}, method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Scoretable> tournamentScoretableCurrentWeek(@PathVariable("id") String id, 
			@PathVariable(name="scoreasteam", required=false) Boolean resultasteam){
		return createScoretableCurrentWeek(id, resultasteam == null ? false : resultasteam);
	}
	
	private Iterable<Scoretable> createScoretable(String tournamentId, boolean scoreAsTeam){
		return createScoretable(tournamentId, Integer.MAX_VALUE, scoreAsTeam);
	}
	
	private Iterable<Scoretable> createScoretable(boolean scoreAsTeam){
		return createScoretable(null, Integer.MAX_VALUE, scoreAsTeam);
	}
	
	private Iterable<Scoretable> createScoretableCurrentweek(boolean scoreAsTeam){
		return createScoretableCurrentWeek(null, scoreAsTeam);
	}
	
	private Iterable<Scoretable> createScoretable(Integer playerGameCount, boolean scoreAsTeam){
		return createScoretable(null, playerGameCount, scoreAsTeam);
	}
	
	private Iterable<Scoretable> createScoretable(String tournamentId, Integer playerGameCount, boolean scoreAsTeam){
		Iterable<Game> games;
				
		if(tournamentId == null){
			games = gameRepository.findAllByOrderByTimeplayedDesc();
		}else{
			games = gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findOne(tournamentId));
		}	
				
		return calculateScoretable(games, playerGameCount, scoreAsTeam);
	}
	
	private Iterable<Scoretable> createScoretableCurrentWeek(String tournamentId, boolean scoreAsTeam){
		Iterable<Game> games;
				
		if(tournamentId == null){
			games = gameRepository.findAllByOrderByTimeplayedDesc();
		}else{
			games = gameRepository.findByTournamentOrderByTimeplayedDesc(tournamentRepository.findOne(tournamentId));
		}	
		
		List<Game> currentWeekGames = filterToCurrentWeekGames(games);
				
		return calculateScoretable(currentWeekGames, Integer.MAX_VALUE, scoreAsTeam);
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

	private Iterable<Scoretable> calculateScoretable(Iterable<Game> games, Integer playerGameCount, boolean scoreAsTeam){
			
		Map<Set<Player>, Scoretable> scoretables = new HashMap<>();
		
		for(Game game : games){
				
			if(scoreAsTeam && game.getHomeplayers().size() > 1 && game.getAwayplayers().size() > 1){
				calculate(playerGameCount, scoretables, game, game.getHomeplayers(), true);
				calculate(playerGameCount, scoretables, game, game.getAwayplayers(), false);
			}else if(!scoreAsTeam){
				for(Player player : game.getHomeplayers()){
					calculate(playerGameCount, scoretables, game, Sets.newHashSet(player), true);
				}	
				
				for(Player player : game.getAwayplayers()){
					calculate(playerGameCount, scoretables, game, Sets.newHashSet(player), false);
				}
			}
			
		}

		List<Scoretable> sorted = new ArrayList<>(scoretables.values());
		Collections.sort(sorted, new ScoretableComparator());
		
		return sorted;
	}

	private void calculate(Integer playerGameCount, Map<Set<Player>, Scoretable> scoretables, Game game, Set<Player> player, boolean homeplayer) {
		if(!scoretables.containsKey(player)){
			scoretables.put(player, new Scoretable(player));
		}
		
		if(scoretables.get(Sets.newHashSet(player)).getGamesplayed() < playerGameCount){
			ScoretableCalculator.calcScoretable(game, scoretables.get(player), homeplayer);
		}
	}

}
