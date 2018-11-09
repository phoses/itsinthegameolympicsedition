package com.op.itsinthegame.dto;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Tournament {
	
	@Id
	private String id;
	@NonNull private String name;
	@NonNull private Integer winpoints;
	@NonNull private Integer otwinpoints;
	@NonNull private Integer otlosepoints;
	@NonNull private Integer drawpoints;

}
