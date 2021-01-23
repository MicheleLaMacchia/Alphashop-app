package com.xantrix.webapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/saluti")
@CrossOrigin(origins="http://localhost:3000")
public class SalutiController {

	@GetMapping
	public String getSaluti() 
	{
		return "Piacere, sono un web service";
	}
	
	@RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = "application/json")
	public String getSaluti(@PathVariable("name") String name) 
	{
		return String.format("Piacere %s, ti saluto", name);
	}
}
