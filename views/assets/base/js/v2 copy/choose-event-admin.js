$(document).ready(function(){
    $('#quotation').click(function(){
        window.location.href = '/v2/contract?type=event';
    });
    
    var locale = {
        "format": 'YYYY-MM-DD',
        "separator": " - ",//
        "applyLabel": "确定",
        "cancelLabel": "取消",
        "fromLabel": "起始时间",
        "toLabel": "结束时间'",
        "customRangeLabel": "自定义",
        "weekLabel": "W",
        "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
        "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        "firstDay": 1
    };
    $('input[name="daterange"]').daterangepicker({
        "locale": locale
    })
})