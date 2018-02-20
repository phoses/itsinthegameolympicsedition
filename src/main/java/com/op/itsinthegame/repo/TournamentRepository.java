package com.op.itsinthegame.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.op.itsinthegame.dto.Tournament;

@CrossOrigin(methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public interface TournamentRepository extends CrudRepository<Tournament, Long>{

}
