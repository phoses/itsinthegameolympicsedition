package com.op.itsinthegame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.op.itsinthegame")
public class ItsinthegameApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ItsinthegameApplication.class, args);
	}
}
