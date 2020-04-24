$.abc = '150000';
$.round = 1;

$(document).ready(function(){
    $('#quotation').click(function(){
        if($('#user_offer').val() != '') {
            $('#user_offer_txt').css('color','rgba(0,0,0,.9)');
            
            if($.round == 1) {
                $.round = 2;
                if(Math.round($('#user_offer').val()) >= Math.round($.abc)) {
                    var passed = '<div class="js_dialog" id="passed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">我们初步接受您的报价方案，请继续后续步骤</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'/v2/contract?type=event\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#passed').length > 0){
                        $('#passed').remove();
                    }
                    $('body').append(passed);
                    $('#passed').fadeIn(200);
                    
                } else if(Math.round($('#user_offer').val()) < Math.round($.abc) && Math.round($('#user_offer').val()) >= Math.round(($.abc  * 0.7))) {
                    var failed = '<div class="js_dialog" id="failed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">我们期待与您的合作，请重新出价</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'remove\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#failed').length > 0){
                        $('#failed').remove();
                    }
                    $('body').append(failed);
                    $('#failed').fadeIn(200);
                } else {
                    var failed = '<div class="js_dialog" id="failed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">您的报价过低，请重新出价</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'remove\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#failed').length > 0){
                        $('#failed').remove();
                    }
                    $('body').append(failed);
                    $('#failed').fadeIn(200);
                }
            } else {
                if(Math.round($('#user_offer').val()) >= Math.round($.abc)) {
                    var passed = '<div class="js_dialog" id="passed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">我们初步接受您的报价方案，请继续后续步骤</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'/v2/contract?type=event\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#passed').length > 0){
                        $('#passed').remove();
                    }
                    $('body').append(passed);
                    $('#passed').fadeIn(200);
                    
                } else {
                    var failed = '<div class="js_dialog" id="failed" style="display: none;">\n\
            <div class="weui-mask">\n\
            </div><div class="weui-dialog">\n\
            <div class="weui-dialog__bd">您的报价过低，现阶段没有合适的合作机会，我们会有专人与您取得联系</div>\n\
            <div class="weui-dialog__ft">\n\
            <a href="javascript: redirect(\'/v2/default\');" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
            </div>\n\
            </div> \n\
            </div>';

                    if($('#failed').length > 0){
                        $('#failed').remove();
                    }
                    $('body').append(failed);
                    $('#failed').fadeIn(200);
                }
            }
            
        } else {
            $('#user_offer_txt').css('color','#f00');
        }
    });
    
    //开始日期
    $('#txt_dateStart').on('focus', function () {
        var dt = new Date();
        var df= [dt.getFullYear(), (dt.getMonth() + 1), dt.getDate()];
        var id=dt.getFullYear()+""+dt.getMonth() +""+dt.getDate()+""+dt.getHours()+""+ dt.getMinutes()+""+dt.getSeconds();

        var value=$.trim($("#txt_dateStart").val());
        if(value!="")
        {
            var arrays = value.split("-");
            df= [parseInt(arrays[0]), parseInt(arrays[1]), parseInt(arrays[2])];
        }

        weui.datePicker({
            id: "start"+id,
            start: 2020,
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
                
                $("#txt_dateStart").val(result[0].label.replace("年","-") + month + ("-") + date);
                $("#txt_dateEnd").val("");
            }
        });
    });

    //结束日期
    $('#txt_dateEnd').on('focus', function () {
        var dt = new Date();
        var df = [dt.getFullYear(), (dt.getMonth() + 1), dt.getDate()];
        var id = dt.getFullYear() + "" + dt.getMonth() + "" + dt.getDate() + "" + dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();

        var value = $.trim($("#txt_dateEnd").val());
        if (value != "") {
            var arrays = value.split("-");
            df = [parseInt(arrays[0]), parseInt(arrays[1]), parseInt(arrays[2])];
        }
        var dfStart = "2020";
        var startVal = $.trim($("#txt_dateStart").val());
        if (startVal != "") {
            dfStart = startVal;
        }
        var dts = dfStart.split('-');
        var std;
        if(dts.length==1)
        {
           std=new Date(dts[0],1,1);
        }else{
            std=new Date();
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
                
                $("#txt_dateEnd").val(result[0].label.replace("年","-") + month + ("-") + date);
            }
        });
    });
})

function redirect(url) {
    if(url == 'remove'){
        $('#failed').remove();
    } else {
        window.location.href = url;
    }
};