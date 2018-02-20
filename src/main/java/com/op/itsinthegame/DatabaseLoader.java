package com.op.itsinthegame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Tournament;
import com.op.itsinthegame.repo.PlayerRepository;
import com.op.itsinthegame.repo.TournamentRepository;

@Component
public class DatabaseLoader implements CommandLineRunner{

	@Autowired
	PlayerRepository playerRepository;
	
	@Autowired
	TournamentRepository tournamentRepository;
	
	@Override
	public void run(String... arg0) throws Exception {
		
		playerRepository.save(new Player("testaaja"));
		playerRepository.save(new Player("koodaaja"));
		playerRepository.save(new Player("asiakas"));
		playerRepository.save(new Player("ylläpitäjä"));
		
		tournamentRepository.save(new Tournament("turnaus", 3, 2, 1, 1));
		
		
	}

}
