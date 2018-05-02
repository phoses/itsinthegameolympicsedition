package com.op.itsinthegame.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.op.itsinthegame.dto.Tournament;

public interface TournamentRepository extends MongoRepository<Tournament, String>{

}
