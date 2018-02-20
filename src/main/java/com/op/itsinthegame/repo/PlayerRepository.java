package com.op.itsinthegame.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import com.op.itsinthegame.dto.Player;

@CrossOrigin(methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public interface PlayerRepository extends CrudRepository<Player, Long>{

}
