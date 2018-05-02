package com.op.itsinthegame.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Tournament;

public interface GameRepository extends MongoRepository<Game, String>{

	List<Game> findByTimeplayedGreaterThanEqualAndHomeplayersInOrTimeplayedGreaterThanEqualAndAwayplayersInOrderByTimeplayedAsc(Date firstDay, Player player, Date firstDay2, Player player2);

	List<Game> findByTournamentAndTimeplayedGreaterThanEqualAndHomeplayersInOrTournamentAndTimeplayedGreaterThanEqualAndAwayplayersInOrderByTimeplayedAsc(Tournament tournament, Date firstDay, Player player, Tournament tournament2, Date firstDay2, Player player2);
	
	List<Game> findAllByOrderByTimeplayedDesc();
	
	List<Game> findByTournamentOrderByTimeplayedDesc(Tournament tournament);
	
	List<Game> findByTournament(Tournament tournament);
	
	List<Game> findByHomeplayersOrAwayplayers(Player player, Player awayplayer);
	
}
