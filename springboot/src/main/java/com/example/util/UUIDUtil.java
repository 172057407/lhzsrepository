package com.example.util;

import java.util.UUID;

public class UUIDUtil {
	private UUIDUtil() {
	}

	/**
	 * 获得一个UUID
	 * 
	 * @return String UUID
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 获得指定数目的UUID
	 * 
	 * @param number
	 *            int 需要获得的UUID数量
	 * @return String[] UUID数组
	 */
	public static String[] getUUID(int number) {
		if (number < 1) {
			return new String[0];
		}
		String[] ss = new String[number];
		for (int i = 0; i < number; i++) {
			ss[i] = getUUID();
		}
		return ss;
	}

	/**
	 * 将原始数据编码为base64编码
	 * org.apache.commons.codec.binary.Base64
	 */
	

	public static void main(String[] args) throws Exception {
		String url="sss";
		String aaa="aaaa";
		
	}

}
