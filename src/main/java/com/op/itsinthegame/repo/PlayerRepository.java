package com.op.itsinthegame.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.op.itsinthegame.dto.Player;

public interface PlayerRepository extends MongoRepository<Player, String>{

	void deletePlayerById(String id); 
}
