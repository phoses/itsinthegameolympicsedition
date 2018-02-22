package com.op.itsinthegame;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Tournament;
import com.op.itsinthegame.repo.GameRepository;
import com.op.itsinthegame.repo.PlayerRepository;
import com.op.itsinthegame.repo.TournamentRepository;

@Component
public class DatabaseLoader implements CommandLineRunner{

	@Autowired
	PlayerRepository playerRepository;
	
	@Autowired
	TournamentRepository tournamentRepository;
	
	@Autowired
	GameRepository gameRepository;
	
	@Override
	public void run(String... arg0) throws Exception {
		
		playerRepository.save(new Player("testaaja"));
		playerRepository.save(new Player("koodaaja"));
		playerRepository.save(new Player("asiakas"));
		playerRepository.save(new Player("ylläpitäjä"));
		
		tournamentRepository.save(new Tournament("nhl", 3, 2, 1, 1));	
		tournamentRepository.save(new Tournament("fifa", 3, 2, 1, 1));	
		
		gameRepository.save(
				new Game(
						DateTime.now().toDate(),
						new HashSet<Player>(Arrays.asList(playerRepository.findOne(1l))),
						new HashSet<Player>(Arrays.asList(playerRepository.findOne(2l))),
						1, 0,
						true, tournamentRepository.findOne(1l)));
		
		gameRepository.save(
				new Game(
						DateTime.now().minusDays(5).toDate(),
						new HashSet<Player>(Arrays.asList(playerRepository.findOne(1l))),
						new HashSet<Player>(Arrays.asList(playerRepository.findOne(2l))),
						1, 0,
						false, tournamentRepository.findOne(2l)));
	}

}
