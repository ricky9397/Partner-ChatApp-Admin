<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"
         import="javax.servlet.http.HttpSession, com.epki.api.EpkiApi, com.epki.conf.ServerConf,com.epki.cert.X509Certificate, com.epki.exception.EpkiException, com.epki.util.Base64"%>
<%@ page import="java.net.URLEncoder" %>
<%@ include file="/WEB-INF/jsp/common/inc/taglib_inc.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>짝꿍 관리자</title>

    <%--<link rel="shortcut icon" href="<%= request.getContextPath() %>/common/images/common/IAEP_favicon.ico">--%>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/common/css/style.css" />

    <script type="text/javascript" src="<%= request.getContextPath() %>/common/js/jquery-2.2.4.js"></script>
    <script type="text/javascript" src="<%= request.getContextPath() %>/common/js/common.js"></script>

    <!-- 시스템 접근 권한 -->
    <%--<%@ include file="/WEB-INF/jsp/common/prsntn_sys_acc_ctrl.jsp"%>--%>

    <script type="text/javascript">
        var regex = /^[0-9]*$/;
        //window.history.forward();
        function noBack(){window.history.forward();}

        function go_exec() {
            var mberPswd = $('#mberPswd').val();

            if('' == $('#mberId').val()) {
                alert("아이디를 입력해 주세요");
                $('#mberId').focus();
                return false;
            }

            if('' == mberPswd) {
                alert("비밀번호를 입력해 주세요");
                $('#mberPswd').focus();
                return false;
            }

            return true;/* submit인 경우 */
        }

    </script>
</head>

<body>
<form name="frm" id="frm" action="<%= request.getContextPath() %>/common/loginExec.do" onsubmit="return go_exec();" method="post">
    <div id="adminWrap">
        <!-- adminLoginWrap -->
        <div class="adminLoginWrap">
            <img src="<%= request.getContextPath() %>/common/images/admin-login-img.png" alt="SS-LMS 관리자 시스템 로그인페이지 로그인 폼 좌측 일러스트 이미지">
            <div class="inputWrap">
                <p><strong>관리자 시스템 로그인</strong><img src="/common/images/common/logo.png"></p>
                <!-- inputList -->
                <div class="inputList">
                    <div>
                        <input type="text" title="아이디 입력" name="mberId" id="mberId" placeholder="이메일(email@address.com)">
                        <input type="password" title="비밀번호 입력" name="mberPswd" id="mberPswd" placeholder="비밀번호" autocomplete="off">
                    </div>
                    <!-- <button type="button" class="btn adminBtn" onclick="go_exec();">로그인</button> -->
                    <button type="submit" class="btn adminBtn">로그인</button> <!-- 2020-12-14 이전 -->
                </div>
                <c:if test="${loginFailCnt > 0}">
                    <p style="color: orangered ; margin-top: 8px;">비밀번호를 <c:out value="${loginFailCnt}"/>회 잘못 입력하셨습니다.</p>
                </c:if>
                <!--// inputList -->
                <%--	                <p class="txtR notice">※ 계정발급 후 최초로그인을 시도하는 경우, 교육부에서 발급하는 행정전자서명인증서(EPKI)를<br />등록하셔야 합니다. 계정정보를 정확하게 입력하시면, 인증서 등록 팝업이 표시됩니다.</p>--%>
            </div>
        </div>
        <!--// adminLoginWrap -->
    </div>
</form>
</body>
</html>