package com.example.SpringData.domain;

import javax.persistence.*;

/**
 * Created by Brave on 16/10/12.
 */
@Entity
public class User {

    //没有默认构造会报错
    public User(){

    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

   

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

  
}