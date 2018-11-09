package com.op.itsinthegame.config;

import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.IntStream;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.op.itsinthegame.dto.Game;
import com.op.itsinthegame.dto.Player;
import com.op.itsinthegame.dto.Tournament;
import com.op.itsinthegame.repo.GameRepository;
import com.op.itsinthegame.repo.PlayerRepository;
import com.op.itsinthegame.repo.TournamentRepository;

@Component
@Profile("dev")
public class DatabaseLoader implements CommandLineRunner{

	@Autowired
	PlayerRepository playerRepository;
	
	@Autowired
	TournamentRepository tournamentRepository;
	
	@Autowired
	GameRepository gameRepository;
	
	@Override
	public void run(String... arg0) throws Exception {
		
		Player player1 = playerRepository.save(new Player("testaaja"));
		Player player2 = playerRepository.save(new Player("koodaaja"));
		Player player3 = playerRepository.save(new Player("asiakas"));
		Player player4 = playerRepository.save(new Player("ylläpitäjä"));
		
		Tournament tournament1 = tournamentRepository.save(new Tournament("nhl", new Integer(3), new Integer(2), new Integer(1), new Integer(1)));	
		Tournament tournament2 = tournamentRepository.save(new Tournament("fifa", new Integer(3), new Integer(2), new Integer(1), new Integer(1)));			
		
		gameRepository.save(
				new Game(
						DateTime.now().toDate(),
						new HashSet<Player>(Arrays.asList(player1, player2)),
						new HashSet<Player>(Arrays.asList(player3, player4)),
						1, 0,
						true, tournament1));
		
		gameRepository.save(
				new Game(
						DateTime.now().minusDays(5).toDate(),
						new HashSet<Player>(Arrays.asList(player1, player3)),
						new HashSet<Player>(Arrays.asList(player2, player4)),
						1, 0,
						false, tournament2));
	}

}
