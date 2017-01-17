package com.example.mongodb.domain;

import java.util.List;

import javax.persistence.Id;

public class Admin {
	@Id
	private String adminId;
	
	private String name;
	private List<Integer> sex;
	private String address;

	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public List<Integer> getSex() {
		return sex;
	}

	public void setSex(List<Integer> sex) {
		this.sex = sex;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
