package com.example.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringData.dao.UserRepository;
import com.example.SpringData.domain.User;

/**
 * Created by Brave on 16/10/9.
 */
@RestController
public class HelloController {
	
	@Autowired
	private UserRepository re;
	
    @RequestMapping("/hello")
    public User index() {
    	re.save(new User("Test1", 10));
    	User findByName = re.findByName("Test1");
        return findByName;
    }

}
