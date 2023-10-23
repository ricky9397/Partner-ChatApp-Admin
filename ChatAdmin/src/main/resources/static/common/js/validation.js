/**
 * form 유효성 검사 (required 속성이 있는 경우에만 체크)
 *
 * @param form
 * @returns {{msg: string, isValid: boolean, invalidId: string}}
 * ex : validCheckForm($("#fomm"))
 */
function validCheckForm(form) {

    var result = true;

    $.each(form[0].elements, function (index, element) {
    	
    	// 벨리데이션 체크
    	if(!validate($(this))){
    		result = false;
    		return false;
        }
    });
    return result;
}

// 객체 검증 메세지 출력
function validate(obj) {
	var message = itemCheck(obj);
	if (message == "")
		return true;
	else {
		alert(message);
		return false;
	}
}
// 객체 검증
function itemCheck(obj) {
	var retMseeage = "";

	var title   = ($(obj).attr("title") == "" || typeof ($(obj).attr("title")) == "undefined" ? "해당항목" : $(obj).attr("title"));
	var value   = $.trim(jfncTrim($(obj).val()));

	if ($(obj).attr("required") == true || $(obj).attr("required") == "required") {
        if ($(obj).prop("tagName") == "INPUT" || $(obj).prop("tagName") == "SELECT" || $(obj).prop("tagName") == "TEXTAREA") {
        	if(!$(obj).is(':disabled')){
        		if ( ($(obj).attr("type") == "checkbox" || $(obj).attr("type") == "radio") ) {

                    var elName = $(obj).attr("name");

                    if ($("input[name=" + elName + "]:checked").length == 0) {
                    	retMseeage = title + "은(는) 필수 항목입니다.";
            			obj.focus();
                    }
                } else {
                    if (value == '' || value == undefined || value == null) {
                    	retMseeage = title + "은(는) 필수입력 항목입니다.";
            			obj.focus();
                    }
                }
        	}
        }
    }


	if(value != "" && $(obj).attr("data-valid") != "undefined" && $(obj).attr("data-valid") != ""){

		var valiType = $(obj).attr("data-valid");

		if(valiType == "email"){
			var regExp=/^[a-zA-Z0-9._-]+@([a-z\d\.-]+)\.([a-z\.]{2,6})$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		}else if(valiType == "email1"){ // 2개의 창에 이메일 받는 경우(앞)
			var regExp=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType == "email2"){ // 2개의 창에 이메일 받는 경우(뒤)
			var regExp=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType ==  "tel"){
			var regExp=/^\d{2,3}-\d{3,4}-\d{3,4}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType ==  "tel2"){
			var regExp=/^\d{8,12}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType ==  "phone"){
			var regExp=/^\d{3}-\d{3,4}-\d{4}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		}else if(valiType ==  "ip"){
			var regExp= /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		}else if(valiType ==  "date"){ // TODO : date 타입 통일 및 수정 필요
			value = value.replace(/\//g, "").replace(/-/g, "").replace(/\|/g, "").replace(/\./g, "");
			var regExp= /^((19|20)\d{2})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType ==  "double"){
			var regExp = /^[-|+]?\d+\.?\d*$/

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}

		} else if(valiType ==  "digit"){
			var regExp = /^[0-9]+$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if (valiType == "rdnm") { //주민번호
            var regExp =/^([0-9]{2})(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])-?[012349][0-9]{6}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if (valiType == "rdnm1") { //주민번호
			var regExp =/^([0-9]{2})(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if (valiType == "rdnm2") { //주민번호
			var regExp =/^[012349][0-9]{6}$/;
			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		}else if(valiType ==  "time1"){ // 시간/분(02:12)
			var regExp= /^\d{2}:\d{2}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType ==  "time2"){ // 시간:분:초(02:02:12)
			var regExp= /^\d{2}:\d{2}:\d{2}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType == "tag"){ // 태그 (#태그#상상)
			var regExp=/^#.+$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}								
		} else if(valiType == "year"){ // 년도 (YYYY)
			var regExp=/^\d{4}$/;

			if(!regExp.test(value)){
				retMseeage = title + " 형식이 올바르지 않습니다.";
				$(obj).focus();
			}
		} else if(valiType == "file"){ // 파일 체크

			var _accept = $(obj).attr("accept");
			if(_accept.length > 0){
				var extArr = _accept.split(',');
				var ext = "." + value.split('.').pop().toLowerCase();
				if($.inArray(ext, extArr) == -1) {
					retMseeage = title + "은(는) ["+extArr.join()+"] 파일만 업로드할 수 있습니다.";
					$(obj).focus();
				}
			}

		}
	}

	//파일첨부 확장자 검사
	/*if(obj.type == "file" && obj.value != ""){
		var imgArr = ['jpg', 'jpeg', 'bmp', 'png', 'gif'];
		var extArr = ['htm', 'html', 'asp', 'aspx', 'jsp', 'php', 'php3', 'java', 'class', 'xml', 'out', 'dll', 'exe', 'h', 'c', 'cpp', 'ocx', 'dat', 'js', 'sh'];
		var cmdArr = ['BS0620', 'BS0630', 'BS0720', 'BS0730'];
		var permitArr = ['jpg', 'jpeg', 'bmp', 'png', 'gif', 'xls', 'xlsx', 'hwp', 'ppt', 'doc', 'pdf', 'zip'];
		var ext = obj.value.split('.').pop().toLowerCase();
		var cmd = window.location.search;
		cmd = cmd.substring(cmd.indexOf("=")+1);

		if($.inArray(cmd, cmdArr) == -1) {
			if($.inArray(ext, extArr) > -1) {
				retMseeage = "해당 파일은 첨부가 불가능합니다.";
			}
		}
//		else {
//			if($.inArray(ext, imgArr) == -1) {
//				retMseeage = "이미지 파일만 첨부 가능합니다.";
//			}
//		}
//		if($.inArray(ext, permitArr) == -1) {
//			retMseeage = "해당 파일은 첨부가 불가능합니다.\n(가능파일 : 이미지, 한글, 엑셀)";
//		}
	}*/

	return retMseeage;
}
// 공백제거
function jfncTrim(str) {
	if(str != null){
		return str.replace(/^\str*/, '').replace(/\str*$/, '');
	} else {
		return '';
	}
}

/**
 * 숫자만 입력
 * ex : <input type="text" maxlength="5" onkeyup="inputOnlyNumber(this);"/>
 */
function inputOnlyNumber(obj) {
	if(event.keyCode != 8){
		// 숫자만 나오도록 변경
		var replace = $(obj).val().replace(/[^0-9]/g,"");
		$(obj).val(replace);
	}
}

/**
 * 전화번호 자동변환
 * 
 * @param obj
 */
function inputDataToPhoneNumber(obj) {
	$(obj).val($(obj).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-"));
}

/**
 * 참고 JS / JQUERY
 * 
 * 

######### 자주 사용하는 함수 ######### 

.parent()는 해당 요소의 바로 위에 존재하는 하나의 부모 요소를 반환
.parents()  모든 부모 요소를 반환
.children()은 어떤 요소의 자식 요소를 반환
.find()는 어떤 요소의 하위 요소 중 특정 반환
.attr() attribute 값이 모두 String 으로 넘어옴
.prop() 자바스크립트의 프로퍼티 값이 넘어오기 때문에 boolean, date, function 등도 가져올 수 있음 
.siblings()	선택한 요소의 형제(sibling) 요소 중에서 지정한 선택자에 해당하는 요소를 모두 선택한다.

.length()	요소의 개수를 알 수 있음.
.trigger( event ) event jQuery.Event 객체. - ex) .trigger('click');
.addClass('red')  클래스 추가
.removeClass('test') 클래스 삭제

.next()	선택한 요소의 바로 다음에 위치한 형제 요소를 선택한다.
.nextAll()	선택한 요소의 다음에 위치한 형제 요소를 모두 선택한다.
.nextUntil()	선택한 요소의 형제 요소 중에서 지정한 선택자에 해당하는 요소 바로 이전까지의 요소를 모두 선택한다.
.prev()	선택한 요소의 바로 이전에 위치한 형제 요소를 선택한다.
.prevAll()	선택한 요소의 이전에 위치한 형제 요소를 모두 선택한다.
.prevUntil()	선택한 요소의 형제 요소 중에서 지정한 선택자에 해당하는 요소 바로 다음까지의 요소를 모두 선택한다.

.setInterval(함수명,주기) 일정시간 마다 함수가 실행되도록 처리
.clearInterval(함수명) setInterval로 설정한 작업을 취소


$(선택자).each(function(index) {

    // this 키워드를 통해 보통 사용
    // ex) $(this).val();

});



######### 자주 사용하는 선택자  ######### 

요소[속성=값]  속성과 값이 같은 문서 객체를 선택 
요소[속성|=값] 속성 안의 값이 특정 값과 같은 문서 객체를 선택 
요소[속성~=값] 속성 안의 값이 특정 값을 단어로 시작하는 문서 객체를 선택 
요소[속성^=값] 속성 안의 값이 특정 값으로 시작하는 문서 객체를 선택 
요소[속성$=값]  속성 안의 값이 특정 값으로 끝나는 문서 객체를 선택 
요소[속성*=값]  속성 안의 값이 특정 값을 포함하는 문서 객체를 선택 

요소:button input 태그 중 type 속성이 button인 문서 객체와 button 태그를 선택 
요소:checkbox input 태그 중 type 속성이 checkbox인 문서 객체를 선택
요소:file input 태그 중 type 속성이 file인 문서 객체를 선택
요소:image input 태그 중 type 속성이 image인 문서 객체를 선택
요소:password input 태그 중 type 속성이 password인 문서 객체를 선택
요소:radio input 태그 중 type 속성이 radio인 문서 객체를 선택
요소:reset input 태그 중 type 속성이 reset인 문서 객체를 선택
요소:submit nput 태그 중 type 속성이 submit인 문서 객체를 선택
요소:text input 태그 중 type 속성이 text인 문서 객체를 선택

요소:checked 체크되어 있는 입력 양식을 선택 
요소:disabled 비활성화된 입력 양식을 선택 
요소:enabled 활성화된 입력 양식을 선택 
요소:focus 초점이 맞추어져 있는 입력 양식을 선택 
요소:input 모든 입력 양식을 선택 
요소:selected  option 객체 중 선택된 태그를 선택 

 */