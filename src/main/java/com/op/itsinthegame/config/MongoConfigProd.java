package com.op.itsinthegame.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

@Profile("prod")
@Configuration
public class MongoConfigProd extends AbstractMongoConfiguration {
      
	@Value("${spring.data.mongodb.database}")
	private String databaseName;
	
	@Override
	public Mongo mongo() throws Exception {
		return new MongoClient("127.0.0.1", 27017);
	}

	@Override
	protected String getDatabaseName() {
		return databaseName;
	}
}