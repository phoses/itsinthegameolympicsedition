package com.op.itsinthegame.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Tournament;

public interface GameRepository extends MongoRepository<Game, Long>{

	List<Game> findByTournamentOrderByTimeplayedDesc(@Param("tournament")Tournament tournament);
	
	List<Game> findByTournament(@Param("tournament")Tournament tournament);
	
	void deleteGameById(String id); 
}
