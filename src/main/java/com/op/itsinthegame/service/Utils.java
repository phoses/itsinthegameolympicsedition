package com.op.itsinthegame.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class Utils {

	private Utils(){}
	
	public static Double round2(Double val) {
	    return new BigDecimal(val.toString()).setScale(2,RoundingMode.HALF_UP).doubleValue();
	}
}
