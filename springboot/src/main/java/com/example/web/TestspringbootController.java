package com.example.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestspringbootController {
	
	@RequestMapping("/test")
	public String testjsp(){
		return "test";
	}
}
