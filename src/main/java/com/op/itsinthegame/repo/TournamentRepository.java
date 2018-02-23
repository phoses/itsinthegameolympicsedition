package com.op.itsinthegame.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.op.itsinthegame.dto.Tournament;

public interface TournamentRepository extends MongoRepository<Tournament, Long>{

	void deleteTournamentById(String id); 
	
	Tournament findById(String id);
}
