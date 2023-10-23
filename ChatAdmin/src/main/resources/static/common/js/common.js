
// 레이아웃
function fn_layout() {
    var container = $("#container"),
        footer = $("#footer"),
        header = $("#Header");
    $(window)
        .resize(function () {
            container.css({"min-height": $(window).height() - header.outerHeight() - footer.outerHeight()});

            if ($("#adminWrap").hasClass("centerCon")) {
                $(".centerCon").css("height", $(window).height() - $("#footer").height());
            }
        })
        .resize();
}

// 레이어 팝업
function fn_layer(e, s) {
    try{
        var pdt = $("." + e)
                .find(".inBox")
                .css("padding-top")
                .replace(/[^-\d\.]/g, ""),
            pdb = $("." + e)
                .find(".inBox")
                .css("padding-bottom")
                .replace(/[^-\d\.]/g, "");
        $("." + e)
            .fadeIn(200)
            .addClass("on");
        $("body, html").css({overflow: "hidden"});
        $(window)
            .resize(function () {
                $("." + e)
                    .find(".inBox")
                    .css({width: s + "px"});
                $("." + e)
                    .find(".cont")
                    .css({"max-height": $("." + e).height() - 6 - (Number(pdt) + Number(pdb))});
            })
            .resize();
    } catch (error) {
        console.log(error);
        alert("처리중 오류가 발생했습니다.");
        window.location.reload();
    }
}

// 레이어 팝업 닫기
function fn_layer_close(t) {
    $(t).closest(".inBox").parent().fadeOut(200).removeClass("on");
    $("body, html").css({overflow: "auto"});

    // 박스 스크롤 상단으로 초기화 -- 오종민 2020-12-09
    $(t).closest(".inBox").find(".cont").scrollTop(0);
}

$(function () {
    /*>>>>>>>>>> 공통 <<<<<<<<<<*/
    fn_layout(); // 레이아웃 호출
    // 관리자 좌측메뉴
    $(".leftMenu .link").click(function (e) {
        $(".subLink").slideUp(200).parent().removeClass("active"), $(this).next().is(":visible") || $(this).next().slideDown(200).parent().addClass("active");
    });
    $(".subLink > li > a").click(function (e) {
        if ($(this).next().hasClass('thirdmenu')) {
            e.preventDefault();
            $(".thirdmenu").slideUp(200).parent().removeClass("open"), $(this).next().is(":visible") || $(this).next().slideDown(200).parent().addClass("open");
        }
    });

    //체크박스 전체선택
    $(".check-all").click(function () {
        $(".checkbox input").prop("checked", this.checked);
    });

    // 셀렉트박스
    var selectBox = $(".selectBox select");
    selectBox.change(function () {
        var selectName = $(this).children("option:selected").text();
        $(this).siblings("label").text(selectName);
    });
    selectBox.each(function () {
        var selectName = $(this).children("option:selected").text();
        $(this).siblings("label").text(selectName);
    });

    /**
     *  autoColSpan
     *  테이블영역 조회 데이터 없을때
     *  <td class="autoColSpan"></td>
     */
    $('.autoColSpan').each(function(){
        var colNum = $(this).parents('table').find('col').length;
        $(this).attr('colSpan', colNum);
    });

});

String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

/////////////////////////////////////////////////////////////////////////////////////////////
/* 공통 LMS 기능 추가 */

/**
 * 공통 Ajax 호출 (중복방지)
 *
 * @param url
 * @param data
 * @param callback : 콜백
 */
var doubleSubmitFlag = false;
function cmmnAjax(url, data, callback, isDubleSubmitCheck, isFile) {
    var dataType = "json";
    var processData = true;
	var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

    //중복 submit 체크
    if(isDubleSubmitCheck === true) {
        doubleSubmitFlag = true;
    }

    if(doubleSubmitFlag) {
        alert("처리중입니다");
        return false;
    }

    if(isFile === true){
        processData = false;
        contentType = false;
    }

    //TODO KYJ : 토큰 처리 필요?
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: dataType,
        processData: processData,
		contentType: contentType,
        async: false,
        success: function (data) {
            if(callback != null) {
                callback(data);
            }
            doubleSubmitFlag = false;
        },
        error: function (e) {
            console.log(e);
            doubleSubmitFlag = false;
        }
    });
}


/**
 * 공통 submit (중복방지)
 *
 * @param obj : $("#form")
 * @param url
 */
var isDuplForm = true;
function cmmnSubmit(obj, url) {
    if(isDuplForm){
        isDuplForm = false;

        //TODO KYJ : 토큰 처리 필요?
        var input = $('<input>').attr('type', 'hidden').attr('name', 'tokenName').val($('#tokenName').val());
        obj.append($(input));
        obj.attr('action', url);
        obj.submit();
    }
}

/**
 * Textarea 입력 Byte체크
 *
 * @param obj: tagId
 * @param maxByte: number
 *
 */
function fnCheckByte(obj, maxByte) {
    var str = $("#" + obj).val();
    var strLen = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for (var i = 0; i < strLen; i++) {
        one_char = str.charAt(i);
        if (escape(one_char).length > 4) {
            rbyte += 2; //한글2Byte
        } else {
            rbyte++; //영문 등 나머지 1Byte
        }

        if (rbyte <= maxByte) {
            rlen = i + 1; //return할 문자열 갯수
        }
    }

    if (rbyte > maxByte) {
        alert("최대 " + maxByte + "byte를 초과할 수 없습니다.")
        str2 = str.substr(0, rlen); //문자열 자르기
        $("#" + obj).val(str2);
        fnCheckByte(obj, maxByte);
    } else {
        $("#" + obj + "_byte").text("(" + rbyte + "/" + maxByte + "byte)");
    }
}

//자릿수 체크
function fnCheckStrSize(obj, maxStr) {
    var str = $("#" + obj).val();
    var strLen = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for (var i = 0; i < strLen; i++) {
        one_char = str.charAt(i);
        rbyte++;

        if (rbyte <= maxStr) {
            rlen = i + 1; //return할 문자열 갯수
        }
    }

    if (rbyte > maxStr) {
        alert("최대 " + maxStr + "글자를 초과할 수 없습니다.")
        str2 = str.substr(0, rlen); //문자열 자르기
        $("#" + obj).val(str2);
        fnCheckStrSize(obj, maxStr);
    } else {
        $("#" + obj + "_byte").text("(" + rbyte + "/" + maxStr + "자)");
    }
}

/**
 * 공통 load (중복방지)
 *
 * @param obj : $("#form")
 * @param url
 */
var isDuplLoad = true;
function cmmnLoad(obj, url, data, callback, isDupleCheck) {
    if(isDuplLoad){
        if(isDupleCheck) {
            isDuplLoad = false;
        }
        $(obj).load(url, data
            , function(response, status, request) {
                if(status != 'success'){
                    alert('처리중 오류가 발생하였습니다.');
                    return false;
                }
                if(callback != null) {
                    callback(response, status, request);
                }
                isDuplLoad = true;
            }
        );
    }
}
/**
 * 객체 복사 (Object -> Object)
 *
 * @param obj
 * @returns object
 */
function cmmnClone(obj) {
    var outputObj = {};
    for(var i in obj) {
        outputObj[i] = obj[i];
    }
    return outputObj;
}


/**
 * json데이터와 id를 가진 태그 value 동기화
 *
 * @param json : json 데이터
 */
function fnSyncJsonToInput(json) {
    for (let key in json) {
        if (key.indexOf("_$") == -1) {
            let tag = $("input[name=" + key + "]");

            //TODO KYJ 2020-06-22 : 체크박스 추가 필요?
            if (tag.prop("type") === "radio") {
                // radio일 경우 name, value로 비교
                $("input[name=" + key + "]:input[value=" + json[key] + "]").attr("checked", true);
            } else {
                let tagId = $("#" + key);
                if (tagId.prop("tagName") === "SPAN") { //
                    tagId.html(json[key]);
                } else {
                    tagId.val(json[key]);
                }
            }
        }
    }
}

//달력 포맷 정의
var dateFormat = {
    days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    daysShort: ['일', '월', '화', '수', '목', '금', '토'],
    daysMin: ['일', '월', '화', '수', '목', '금', '토'],
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    today: 'Today', // Today -> 오늘
    clear: 'Clear', // Clear -> 지우기
    dateFormat: 'yyyy-mm-dd',
    timeFormat: 'hh:ii',
    position: 'bottom right',
    minDate: '',
    maxDate: '',
    timepicker: false,
    autoClose: true,
    confirmButton: false,
    classes: '',
    firstDay: 0,
    clearButton: true
};


/**
 * sVar , eVar 필수값
 * sVar : 시작날짜 ex(2019-08-22)
 * eVar : 종료날짜 ex(2019-09-22)
 * 사용 예 : dynamicDatepicker($('#sDate'), $('#eDate'));
 */
// 동적 datePicker 생성
function dynamicDatepicker(sVar, eVar, customFormat) {
    var date = new Date();
    var format = cmmnClone(dateFormat);

    if(customFormat != null){
        format = customFormat;
    }

    var sdate = $(sVar).datepicker({
        //년-월-일
        startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        language: 'ko',
        position: format.position,
        dateFormat: format.dateFormat,
        timeFormat: format.timeFormat,
        timepicker: format.timepicker,
        minDate: format.minDate,
        maxDate: format.maxDate,
        autoClose: format.autoClose,
        confirmButton: format.confirmButton,
        classes: format.classes,
        clearButton: format.clearButton,
        //선택한 날짜를 가져옴
        onSelect: function (date) {
            if (date != '') {
                date = date.replace(/[.-]/gi, "/");
                // sdate.hide();
                //종료일 datepicker에 최소날짜를 방금 클릭한 날짜로 설정
                if ($(eVar).val() != "" && $(sVar).val() > $(eVar).val()) {
                    alert('시작일이 종료일보다 클 수 없습니다.');
                    sdate.clear();
                }
                $(eVar).datepicker({
                    minDate: new Date(date)
                });
            }

        }
    }).data('datepicker');


    var edate = $(eVar).datepicker({
        startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),  // 시간, 분은 00으로 초기 설정
        language: 'ko',
        position: format.position,
        dateFormat: format.dateFormat,
        timeFormat: format.timeFormat,
        timepicker: format.timepicker,
        minDate: format.minDate,
        maxDate: format.maxDate,
        autoClose: format.autoClose,
        confirmButton: format.confirmButton,
        classes: format.classes,
        clearButton: format.clearButton,
        //선택한 날짜를 가져옴
        onSelect: function (date) {

            if (date != '') {
                date = date.replace(/[.-]/gi, "/");
                // edate.hide();
                //종료일 datepicker에 최소날짜를 방금 클릭한 날짜로 설정
                if ($(sVar).val() != "" && date < $(sVar).val()) {
                    alert('종료일이 시작일보다 작을 수 없습니다.');
                    edate.clear();
                }
                $(sVar).datepicker({
                    //시작일 datepicker에 최대날짜를 방금 클릭한 날짜로 설정
                    maxDate: new Date(date)
                });
            }
        }
    }).data('datepicker');

}

/**
 *  <div class="selectBox">
 *      <label for="aa"></label>
 *      <select name="aa" id="aa">
 *  label 체인지 함수
 */
function fnChangeSelLabel(){
    $('.selectBox > select').each(function(){
        var selectedValue = $(this).find('option:selected').text();
        $(this).siblings('label').text(selectedValue);
    });
}
