package com.example.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.SpringData.mongodb.dao.AdminRepository;
import com.example.file.service.FileService;
import com.example.mongodb.domain.Admin;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;

@Controller
public class MongdbController {

	@Autowired
	private AdminRepository adminRepository;//保存实体
	@Autowired
	private MongoTemplate mongoTemplate;
	@Autowired
	private FileService files;

	@RequestMapping(value = "/addAdmin", method = RequestMethod.GET)
	@ResponseBody
	public Admin addAdmin() {
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		list.add(3);
		list.add(4);
		Admin admin = new Admin();
		admin.setName("张三");
		admin.setSex(list);
		admin.setAddress("烟台芝罘区");
		return adminRepository.save(admin);
	}

	@RequestMapping(value = "/getAllAdmin", method = RequestMethod.GET)
	@ResponseBody
	public List<Admin> getAllAdmin() {
		return adminRepository.findAll();
	}
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public String upload(@RequestParam("file") MultipartFile file) throws IOException{
		String upload = files.upload(file);
		return upload;
	}
	
	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public void download(HttpServletResponse response) throws IOException{
		byte[] bs = files.download("4ad5452a0cee4872adcc9e464db6f0b6");
		ServletOutputStream stream = response.getOutputStream();
		stream.write(bs);
	}
	@RequestMapping(value = "/getAdminByNameAndSexOrAddress", method = RequestMethod.GET)
	@ResponseBody
	public Admin getAdminByNameAndSexOrAddress(@RequestParam("name") String name,
			@RequestParam(value = "sex", required = false) Integer sex,
			@RequestParam(value = "address", required = false) String address) {
		/**
		 * OR
		 */
		BasicDBList orList = new BasicDBList(); // 用于记录
		if (sex != null) {
			orList.add(new BasicDBObject("sex", sex));
		}
		if (StringUtils.isEmpty(address)) {
			orList.add(new BasicDBObject("address", address));
		}
		BasicDBObject orDBObject = new BasicDBObject("$or", orList);

		/**
		 * and
		 */
		BasicDBList andList = new BasicDBList();
		andList.add(new BasicDBObject("name", name));
		//andList.add(orDBObject);
		BasicDBObject andDBObject = new BasicDBObject("$and", andList);

		return mongoTemplate.findOne(new BasicQuery(orDBObject), Admin.class);
	}
}
