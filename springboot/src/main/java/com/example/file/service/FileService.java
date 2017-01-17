package com.example.file.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	
	public String upload(MultipartFile file);
	public byte[] download(String fileId) throws IOException;
	public void findById(int id);
}
