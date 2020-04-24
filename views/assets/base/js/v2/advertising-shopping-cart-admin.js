$(document).ready(function(){
    //开始日期
    $('.date-start').on('focus', function () {
        var dt = new Date();
        var df= [dt.getFullYear(), (dt.getMonth() + 1), dt.getDate()];
        var id=dt.getFullYear()+""+dt.getMonth() +""+dt.getDate()+""+dt.getHours()+""+ dt.getMinutes()+""+dt.getSeconds();
        
        var startD = $(this).attr('id');
        var value=$.trim($(this).parent().parent().parent().find('.date-end').val());
        if(value!="")
        {
            var arrays = value.split("-");
            df= [parseInt(arrays[0]), parseInt(arrays[1]), parseInt(arrays[2])];
        }

        weui.datePicker({
            id: "start"+id,
            start: 2000,
            end: dt.getFullYear()+20,
            defaultValue:df,
            onConfirm: function (result) {
                var month = result[1].label.replace("月","");
                if(month < 10) {
                    month = "0"+month;
                }
                
                var date = result[2].label.replace("日","");
                if(date < 10) {
                    date = "0"+date;
                }
                
                $('#'+startD).val(result[0].label.replace("年","-") + month + ("-") + date);
                $('#'+startD).parent().parent().parent().find('.date-end').val("");
            }
        });
    });
    
    //结束日期
    $('.date-end').on('focus', function () {
        var dt = new Date();
        var df = [dt.getFullYear(), (dt.getMonth() + 1), dt.getDate()];
        var id = dt.getFullYear() + "" + dt.getMonth() + "" + dt.getDate() + "" + dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();

        var endD = $(this).attr('id');
        var value = $.trim($(this).val());
        if (value != "") {
            var arrays = value.split("-");
            df = [parseInt(arrays[0]), parseInt(arrays[1]), parseInt(arrays[2])];
        }
        var dfStart = "2000";
        var startVal = $.trim($(this).parent().parent().parent().find('.date-start').val());
        if (startVal != "") {
            dfStart = startVal;
        }
        var dts = dfStart.split('-');
        var std;
        if(dts.length==1)
        {
           std=new Date(dts[0],1,1);
        }else{
            std=new Date(dts[0],dts[1],dts[2]);
        }

        weui.datePicker({
            id: "end" + id,
            start: std,
            end: dt.getFullYear() + 2,
            defaultValue: df,
            onConfirm: function (result) {
                var month = result[1].label.replace("月","");
                if(month < 10) {
                    month = "0"+month;
                }
                
                var date = result[2].label.replace("日","");
                if(date < 10) {
                    date = "0"+date;
                }
                
                $('#'+endD).val(result[0].label.replace("年","-") + month + ("-") + date);
            }
        });
    });
    
    var MAX = 99, MIN = 1;
    $('.weui-count__decrease').click(function (e) {
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") - 1
        if (number < MIN) number = MIN;
        $input.val(number)
    })
    $('.weui-count__increase').click(function (e) {
        var $input = $(e.currentTarget).parent().find('.weui-count__number');
        var number = parseInt($input.val() || "0") + 1
        if (number > MAX) number = MAX;
        $input.val(number)
    })
})