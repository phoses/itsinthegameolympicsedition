package com.op.itsinthegame.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Sets;
import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.GraphData;
import com.op.itsinthegame.dto.GraphDataType;
import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Scoretable;
import com.op.itsinthegame.dto.Tournament;
import com.op.itsinthegame.repo.GameRepository;
import com.op.itsinthegame.repo.PlayerRepository;
import com.op.itsinthegame.repo.TournamentRepository;
import com.op.itsinthegame.util.ScoretableCalculator;

@RestController
@CrossOrigin(methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class GraphService {

	private static final Logger logger =LoggerFactory.getLogger(GraphService.class);
	
	@Autowired
	GameRepository gameRepository;
	
	@Autowired
	PlayerRepository playerRepository;
	
	@Autowired
	TournamentRepository tournamentRepository;
	
	@RequestMapping(value="/api/graphdata/{datatype}/{player}", method = {RequestMethod.GET}, produces = "application/json;charset=UTF-8")
	@ResponseStatus(HttpStatus.OK)
	public GraphData gamesCurrentWeek(@PathVariable("datatype") String datatype, @PathVariable("player") String playerId, @RequestParam(value="tournament", required=false) String tournamentId){
				
		Tournament tournament = null;
		if(tournamentId != null){
			tournament = tournamentRepository.findOne(tournamentId);
		}
		
		DateTime firstDate = DateTime.now().withTimeAtStartOfDay().withDayOfWeek(1);
		DateTime lastday = DateTime.now().withDayOfWeek(5);
		
		if(datatype.equalsIgnoreCase(GraphDataType.ALL.name())){
			Iterable<Game> allGames;
			if(tournament != null){
				allGames = gameRepository.findByTournament(tournament);
			}else{
				allGames = gameRepository.findAll();				
			}
			firstDate = searchFirstDate(allGames);
			lastday = searchLastDate(allGames);
		}
		
		Player player = playerRepository.findOne(playerId);

		Iterable<Game> games = null;
		if(tournament != null){
			games = gameRepository.findByTournamentAndTimeplayedGreaterThanEqualAndHomeplayersInOrTournamentAndTimeplayedGreaterThanEqualAndAwayplayersInOrderByTimeplayedAsc(tournament, firstDate.toDate(), player, tournament, firstDate.toDate(), player);				
		}else{
			games = gameRepository.findByTimeplayedGreaterThanEqualAndHomeplayersInOrTimeplayedGreaterThanEqualAndAwayplayersInOrderByTimeplayedAsc(firstDate.toDate(), player, firstDate.toDate(), player);			
		}
				
		Map<DateTime, Double> datePointsMap = createMap(firstDate, lastday);
		
		Scoretable playerScoreTable = new Scoretable(Sets.newHashSet(player));
		for(DateTime date : datePointsMap.keySet()){
			
			List<Game> dateGames = findDateGames(games, date);
			
			if(dateGames.isEmpty()){
				datePointsMap.put(date, playerScoreTable.getAvgpoints());
			}else{
				for(Game game : dateGames){
					ScoretableCalculator.calcScoretable(game, playerScoreTable, game.getHomeplayers().contains(player));
					datePointsMap.put(date, playerScoreTable.getAvgpoints());
				}
				
			}
			
		}
		for(Game game : games){
			
			ScoretableCalculator.calcScoretable(game, playerScoreTable, game.getHomeplayers().contains(player));
			datePointsMap.put(new DateTime(game.getTimeplayed()).withTimeAtStartOfDay(), playerScoreTable.getAvgpoints());
		}
		
		return new GraphData(datePointsMap);
	}



	private List<Game> findDateGames(Iterable<Game> games, DateTime date) {
		
		List<Game> dateGames = new ArrayList<>();
		
		for(Game game : games){
			if(new DateTime(game.getTimeplayed()).withTimeAtStartOfDay().compareTo(date) == 0){
				dateGames.add(game);
			}
		}
		
		return dateGames;
	}



	private DateTime searchLastDate(Iterable<Game> allGames) {
		
		Date lastDate = null;
		
		for(Game game : allGames){
			if(lastDate == null || lastDate.compareTo(game.getTimeplayed()) < 0){
				lastDate = game.getTimeplayed();
			}
		}
		
		return new DateTime(lastDate).withTimeAtStartOfDay();
	}

	private DateTime searchFirstDate(Iterable<Game> allGames) {
		
		Date lastDate = null;
		
		for(Game game : allGames){
			if(lastDate == null || lastDate.compareTo(game.getTimeplayed()) > 0){
				lastDate = game.getTimeplayed();
			}
		}
		
		return new DateTime(lastDate).withTimeAtStartOfDay();
	}

	private Map<DateTime, Double> createMap(DateTime startDate, DateTime endDate) {
				
		Map<DateTime, Double> datePointsMap = new LinkedHashMap<>();
		
		while(startDate.compareTo(endDate) <= 0){
			datePointsMap.put(new DateTime(startDate), new Double(0));
			startDate = new DateTime(startDate).plusDays(1);
		}
		
		return datePointsMap;
	}
}
