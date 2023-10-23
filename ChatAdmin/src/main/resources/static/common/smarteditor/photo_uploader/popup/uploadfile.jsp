<%@page import="java.util.Map"%>
<%@page import="java.io.File"%>
<%@page import="java.util.UUID"%>
<%@page import="java.util.Iterator"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import = "com.sangs.support.SangsProperties" %>
<%@page import="com.sangs.util.SangsUtil" %>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%

	// 1. 스마트에디터에서 업로드하는 이미지를 미리 저장시킬 경로 설정.
    //Globals.addFileRootPath Globals.bbsFilePath
//     String uploadDir = SangsProperties.getProperty("Globals.addFileRootPath") +"/"+  SangsProperties.getProperty("Globals.bbsFilePath") + "/";
	//String uploadDir = SangsProperties.getProperty("Globals.addFileRootPath") +"/"+  SangsProperties.getProperty("Globals.bbsFilePath") + "/editor/";
	//uploadDir: /data2/EDU_DATA/upload/edbbs/editor/
    //String imgUrl = SangsProperties.getProperty("Globals.addFileRootPath") +"/"+ SangsProperties.getProperty("Globals.bbsFilePath") + "/editor/";
// 	imgUrl=/edu-data/upload/edbbs/editor/

	String uploadDir = SangsProperties.getProperty("Globals.addFileRootPath") + "/editor/";
	String imgUrl = SangsProperties.getProperty("Globals.addFileRootPath") + "/editor/";

    String imgName = "";
    DiskFileItemFactory factory = new DiskFileItemFactory(); // 업로드파일 보관하는 객체
    factory.setSizeThreshold(1024*1024*10); // 단일파일 크기제한 10MB
    ServletFileUpload upload = new ServletFileUpload(factory); // 업로드 요청 처리 객체
    upload.setSizeMax(1024*1024*100); // 총 업로드 파일 크기제한 100MB
    upload.setHeaderEncoding("UTF-8");

    List<FileItem> items = upload.parseRequest(request); // 업로드 request에서 File 목록 가져옴
    Iterator<FileItem> iter = items.iterator();
    String callback_func = "";
    String realname = "";
    while(iter.hasNext()){ // 파일을 하나씩 꺼냄
        FileItem item = (FileItem) iter.next();
        if(item.isFormField()){ // 받은 form 데이터에서 type=file 이외의 input 데이터일 경우
            if(item.getFieldName().equals("callback_func")){
                callback_func = item.getString();
            }

        }else{ // type=file input 데이터일 경우
	        if(item.getName()!=null && !item.getName().equals("")){ // 파일 이름이 있을 때만 진행
	            String ranName = UUID.randomUUID().toString();
	            realname = item.getName();

	            imgName = ranName+"."+item.getName().split("\\.")[1]; // 파일 이름이 식별되게끔 새로 만듬

	            String fileExt = imgName.substring(imgName.lastIndexOf(".")+1, imgName.length()).toLowerCase();
	            
	            if("jpg".equals(fileExt) || "jpeg".equals(fileExt) || "png".equals(fileExt) || "bmp".equals(fileExt) || "gif".equals(fileExt)){
	            	File file = new File(SangsUtil.removeJumpDir(uploadDir) + SangsUtil.removeJumpFileName(imgName)); // 위에 설정한 uploadDir을 경로로 넣고 이미지 파일 미리 생성해놓음.
		            item.write(file); //실제파일 생성
	            }
	        }
        }
    }
    realname=imgName;


//     String domainUrl =SangsProperties.getProperty("Globals.domain");
//     imgUrl = domainUrl+"/"+imgUrl +"editor/"+ imgName;
     //imgUrl = "/common/beImageViewer.do?fn="+imgName;

   // imgUrl = imgUrl.replace("/app/lms", "") + imgName;


  	 //imgUrl = "/four/"+imgName;
  	 imgUrl = "/upload/editor/"+imgName;

//  	 log.debug("imgUrl  ///  "+ imgUrl);
//  		log.debug("uploadDir "   + uploadDir);

%>

<script>
document.location="<%= request.getContextPath() %>/mngr/common/smarteditor/photo_uploader/popup/callback.html?sFileName=<%=realname%>&callback_func=<%=callback_func%>&bNewLine=true&sFileURL=<%=imgUrl%>";
</script>
</body>
</html>