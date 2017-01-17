package com.example.SpringData.mongodb.dao;

import java.io.Serializable;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.mongodb.domain.Admin;

public interface AdminRepository extends MongoRepository<Admin, Serializable> {

}
