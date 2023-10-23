$(function () {
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

    /**
     *  <div class="selectBox">
     *      <label for="aa"></label>
     *      <select name="aa" id="aa">
     *  label 체인지
     */
    $('.selectBox > select').each(function(){
        var selectedValue = $(this).find('option:selected').text();
        $(this).siblings('label').text(selectedValue);
    });
    $('.selectBox > select').on('change',function(){
        var selectedValue = $(this).find('option:selected').text();
        $(this).siblings('label').text(selectedValue);
    });
});
