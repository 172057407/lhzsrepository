package com.example.file.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import com.example.file.service.FileService;
import com.example.util.UUIDUtil;
import com.mongodb.MongoTimeoutException;
import com.mongodb.gridfs.GridFSDBFile;

@Service
public class FileServiceImpl implements FileService{
	
	@Autowired
	private GridFsTemplate grid;
	
	@Override
	public String upload(MultipartFile file) {
		 String uuid = UUIDUtil.getUUID();
		  try {
			grid.store(file.getInputStream(), uuid, file.getContentType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return uuid;
	}

	@Override
	public byte[] download(String fileId) throws IOException {
		GridFSDBFile gfile = getGridFSDBFile(fileId);
		Path tem;
		try {
			tem = Files.createTempFile(String.valueOf(System.currentTimeMillis()), null);
			File f = tem.toFile();
			gfile.writeTo(f);
			byte[] bs = Files.readAllBytes(f.toPath());
			f.delete();
			return bs;
		} catch (MongoTimeoutException e) {
			throw new MongoTimeoutException("芒果数据库发生异常:" + e.getMessage());
		} catch (IOException e) {
			throw new IOException("读取文件失败");
		}
		
	}
	public GridFSDBFile getGridFSDBFile(String fileId) throws IOException {
		Assert.hasLength(fileId);
		Query query = new Query();
		query.addCriteria(Criteria.where("filename").is(fileId));
		query.limit(1);
		GridFSDBFile gridfi;
		try {
			 gridfi = grid.findOne(query);
		} catch (MongoTimeoutException e) {
			throw new MongoTimeoutException("芒果数据库发生异常:" + e.getMessage());
		}
		return gridfi;
	}

	@Override
	public void findById(int id) {
		// TODO Auto-generated method stub
		
	}

}
