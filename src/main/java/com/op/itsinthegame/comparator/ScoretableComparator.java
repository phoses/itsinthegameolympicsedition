package com.op.itsinthegame.comparator;

import java.util.Comparator;

import com.op.itsinthegame.dto.Scoretable;

public class ScoretableComparator implements Comparator<Scoretable>{

	@Override
	public int compare(Scoretable o1, Scoretable o2) {
		
		if(o1.getAvgpoints().compareTo(o2.getAvgpoints()) == 0){
			return o1.getWinpros().compareTo(o2.getWinpros()) * -1;
		}
		
		return o1.getAvgpoints().compareTo(o2.getAvgpoints()) * -1;
	}

}
