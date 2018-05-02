package com.op.itsinthegame.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class GraphData {

	private List<String> dates;
	private List<Double> values;
	
	public GraphData(){
		dates = new ArrayList<>();
		values = new ArrayList<>();
	}

	public GraphData(Map<DateTime, Double> datePointsMap) {
		this();
		
		for(DateTime date : datePointsMap.keySet()){
			dates.add(date.toString("dd.MM.yyyy"));
			values.add(datePointsMap.get(date));			
		}
	}
}
