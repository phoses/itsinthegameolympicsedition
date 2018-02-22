package com.op.itsinthegame.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.op.itsinthegame.dto.Game;

@CrossOrigin(methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public interface GameRepository extends CrudRepository<Game, Long>{

	List<Game> findByTournamentId(@Param("id")Long id);
}
