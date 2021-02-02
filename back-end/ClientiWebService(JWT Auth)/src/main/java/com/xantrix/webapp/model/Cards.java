package com.xantrix.webapp.model;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@NoArgsConstructor
@Data
public class Cards implements Serializable
{ 
	private static final long serialVersionUID = -7509028795141019392L;
	
	@Field("bollini")
	private int bollini;
	
	@Field("ultimaspesa")
	private String ultimaspesa;

}
