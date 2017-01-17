<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>欢迎使用springboot!</h1>
	 <img  src="seajs/main/img/testlogo.png">
	 <form action="/upload" method="post" enctype="multipart/form-data" >
	 		<input name="file" type="file" >
	 		<input type="submit" value="提交">
	 </form>
	 <img  src="/download">
	<script src="seajs/modules/seajs/sea.js" id="seajsnode"></script>
    <script src="seajs/main/seajs.config.js"></script>
    <script>
    seajs.use('js/channel')
    </script>
</body>
</html>