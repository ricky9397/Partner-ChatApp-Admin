var cmmnFileUploadConfig = {
	fieldName:'atchFileId'
	, atchFileId:''
	, fileSubPath:'temp'
	, fileMode:'VIEW'
	, multiFileAt:'N'
	, fileSeCode:'G'
	, fileTitle:'첨부파일'
	, requiredAt:'N'
	, fileValid:'fileGnl' // 사용안함
	, fileMaxNum: 9
	, fileUploadSize: 5 // MB
	, fileUploadTotalSize: 10  // MB
	 // 기본 확장자 체크 필요(제거할 확장자 제외 및 추가 필요)
	, fileAccept:'.hwp,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt,.zip,.rar,.alz,.gif,.jpg,.jpeg,.png,.bmp,.pdf,.HWP,.DOC,.DOCX,.XLS,.XLSX,.CSV,.PPT,.PPTX,.TXT,.ZIP,.RAR,.ALZ,.GIF,.JPG,.JPEG,.PNG,.BMP,.PDF'
};
var cmmnFileUploadMap = new Map();

/**
 * 파일 업로드
 */
function fnUploadFile(fieldName, obj){
	console.log(1);
	// 다중파일 등록
	if (obj.files != null) {
		console.log(2);
		fnCheckFileSize(fieldName, obj);
	} else {
		console.log(3);
		cmmnAlert('일시적인 오류가 발생 하였습니다.', 2);
		return;
	}
}

/**
 * 파일 추가
 */
function fnCheckFileSize(fieldName, obj) {
	var thisConfig = cmmnFileUploadMap.get(fieldName);

	var totalFileSize = Number($('#fileSize_' + fieldName).val());
	var fileUploadSize = thisConfig.fileUploadSize * 1000000;
	var fileUploadTotalSize = thisConfig.fileUploadTotalSize * 1000000;

	// 파일 이름
	var fileName = obj.files[0].name;
	var fileSize = obj.files[0].size;
	var fileReadableSize = fnReadableBytes(obj.files[0].size);

	console.log('totalFileSize : ' + totalFileSize);
	console.log('fileUploadSize : ' + fileUploadSize);
	console.log('fileUploadTotalSize : ' + fileUploadTotalSize);
	console.log('fileSize : ' + fileSize);

	// 개별 파일 크기
	if (fileSize > fileUploadSize) {
		alert(thisConfig.fileUploadSize + 'MB 이하의 파일만 등록 가능합니다.');
		fnInitFileUploader(obj);
		return;
	}

	// 전체 파일 크기
	if ((fileSize + totalFileSize) > fileUploadTotalSize) {
		alert('첨부파일 전체 용량은 ' + thisConfig.fileUploadTotalSize + 'MB를 초과할 수 없습니다.');
		fnInitFileUploader(obj);
		return;
	}
}

/**
 * 파일 업로더 초기화(input type=file 초기화)
 */
function fnInitFileUploader(obj){
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		$(obj).replaceWith($('#fileUploder_' + fieldName).clone(true));
	}else{
		$(obj).val("");
	}
	$(obj).attr('value', '');
}

function fnFileUploadInit(obj, fieldName, config) {

	if(config != null){
		config.fieldName = fieldName;
		cmmnFileUploadMap.set(fieldName, config);
	} else {
		cmmnFileUploadConfig.fieldName = fieldName;
		cmmnFileUploadMap.set(fieldName, config);
	}

	if($(obj) != null && $(obj) != "undefined"){
		cmmnLoad($(obj), '/common/incCommonFileUpload.do' , config);
	} else {
		alert('파일 업로드 영역을 찾을 수 없습니다.');
		return false;
	}

}

/**
 * 파일 업로더 추가
 */
function fnAddUploader(fieldName) {
	var fileHtmlAdd = '';
	var fileCnt = Number($('#fileCnt_'+fieldName).val());
	var thisConfig = cmmnFileUploadMap.get(fieldName);
	var fileMaxNum = thisConfig.fileMaxNum;

	if ( $("#fileArea_" + fieldName).children(".input-wrap").length > (fileMaxNum - 1)) {
		alert(fileMaxNum + '개까지 등록 가능합니다.');
		return;
	}

	fileCnt++;

	fileHtmlAdd += '<div id="eduDate_'+ fieldName + '_' + fileCnt +'" class="input-wrap mb15">';
	fileHtmlAdd += '	<div class="file-wrap txtL">';
	fileHtmlAdd += '		<div class="file_input_div">';
	fileHtmlAdd += '		  <input type="file" name="' + fieldName + '_uploader_' + fileCnt + '" class="file_input_hidden" ';
	fileHtmlAdd += 'data-Valid="file" ';
	fileHtmlAdd += 'accept="' + thisConfig.fileAccept + '" ';
	fileHtmlAdd += 'title="' + thisConfig.fileTitle + '" ';
	if(thisConfig.requiredAt != null && thisConfig.requiredAt == 'Y'){
		fileHtmlAdd += 'required="required"';
	}
	fileHtmlAdd += ' onchange="fnUploadFile(\'' + fieldName + '\', this);" ';
	fileHtmlAdd += '>';
	fileHtmlAdd += '			<span class="timebtn">';
	if(thisConfig.multiFileAt != null && thisConfig.multiFileAt == 'Y'){
		fileHtmlAdd += '				<button type="button" class="btn blueBtn btnRed" onclick="fnDelUploader(this,\'' + fieldName + '\'); return false;" title="삭제">삭제</button>';
		fileHtmlAdd += '   				<button type="button" class="btn blueBtn btnBlue" onclick="fnAddUploader(\'' + fieldName + '\'); return false" title="추가">추가</button>';
	}
	fileHtmlAdd += '			</span>';
	fileHtmlAdd += '		</div>';
	fileHtmlAdd += '	</div>';
	fileHtmlAdd += '</div>';

	$('#fileCnt_'+fieldName).val(fileCnt);
	$("#fileArea_" + fieldName).append(fileHtmlAdd);
}

/**
 * 파일 뷰단 삭제
 */
function fnDelUploader(obj, fieldName){
	if (  $("#fileArea_" + fieldName).children(".input-wrap").length == 1) {
		alert("더이상 삭제하실 수 없습니다.");
		return;
	} else {
		$(obj).closest('div[id^=eduDate_]').remove();
	}
}

var ssCmmnFileClickSe = true;

/**
 * 파일 DB 삭제
 */
function fnDelCmmnFile(atchFileId, fileSn, orignlFileNm, cnt, fieldName){

	if(ssCmmnFileClickSe) {
		ssCmmnFileClickSe = false;
		if(atchFileId != ''){
			if(confirm("기존파일을 삭제하시겠습니까?\n삭제된 파일은 복구되지 않습니다.")){
				$.ajax({
					url : "/common/deleteCommonFileAjax.do",
					data : {atchFileId : atchFileId, fileSn : fileSn , orignlFileNm : orignlFileNm},
					dataType : "json",
					type : "post",
					contentType: "application/x-www-form-urlencoded;charset=UTF-8",
					success : function(result) {

						if(result.resultCode != "-99"){
							$("#eduDate_"+fieldName+'_'+cnt).remove();
							$('#fileCnt_'+fieldName).val(Number($('#fileCnt_'+fieldName).val()) - 1);
							if($('div[id^=eduDate_'+fieldName+']').length == 0 &&  $('#fileCnt_'+fieldName).val() == "0"){
								fnAddUploader(fieldName);
							}
						}
						alert(result.resultMsg);
					},
					error : function(e) {
						alert("error :" + e.responseText);
					}
				});
			}
		}else{
			$('#eduDate_'+fieldName+'_'+cnt).remove();
		}
		ssCmmnFileClickSe = true;
	} else {
		alert('처리중입니다.');
	}
}

/**
 * 파일 다운로드 submit
 */
function fnDownCmmnFile(atchFileId, fileSn, orignlFileNm){

	if(ssCmmnFileClickSe) {
		ssCmmnFileClickSe = false;
		if(atchFileId != ''){
			$('#file_atchFileId').val(atchFileId);
			$('#file_fileSn').val(fileSn);
			$('#file_orignlFileNm').val(orignlFileNm);

			$('#cmmnFileForm').attr('action', '/common/commonFileDown.do');
			$('#cmmnFileForm').submit();
		}
		ssCmmnFileClickSe = true;
	} else {
		alert('처리중입니다.');
	}
}

/**
 * 파일 다운로드 Ajax
 */
function fnDownCmmnFileAjax(atchFileId, fileSn, orignlFileNm){

	if(ssCmmnFileClickSe) {
		ssCmmnFileClickSe = false;
		if(atchFileId != ''){
			$.ajax({
				url : "/common/commonFileDownAjax.do",
				data : {atchFileId : atchFileId, fileSn : fileSn , orignlFileNm : orignlFileNm},
				dataType : "json",
				type : 'post',
				success : function(result) {
					if(!result.resultCode == "1"){
						alert(result.resultMsg);
					}
				},
				error : function(e) {
					alert("error :" + e.responseText);
				}
			});
		}
		ssCmmnFileClickSe = true;
	} else {
		alert('처리중입니다.');
	}
}

function fnReadableBytes(bytes) {
	var i = Math.floor(Math.log(bytes) / Math.log(1024)),
		sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
}