package com.op.itsinthegame.dto;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Player {
	
	@Id
	private String id;
	@NonNull private String name;	
	
}
