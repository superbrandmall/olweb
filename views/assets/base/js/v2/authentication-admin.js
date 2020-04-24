$(document).ready(function(){
    $('#company_name').val($.cookie('company_name'));
    $('#uscc').val($.cookie('uscc'));
            
    $(function(){
        var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $uploaderInput = $(".weui-uploader__input"),
            $uploaderFiles = ".weui-uploader__files"
            ;

        $uploaderInput.on("change", function(e){
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            for (var i = 0, len = files.length; i < len; ++i) {
                var file = files[i];

                if (url) {
                    src = url.createObjectURL(file);
                } else {
                    src = e.target.result;
                }
                
                $(this).parent().parent().find($uploaderFiles).html($(tmpl.replace('#url#', src)));
            }
        });
    });
    
    $('.add').click(function(e){
        e.preventDefault();
        var newMall = $('#malls').find('.weui-cells_form:first').clone();
        $('#malls').append(newMall);
        var lastMall = $('#malls').find('.weui-cells_form:last');
        
        lastMall.find('.mall').attr('id','mall_'+$('#malls').find('.weui-cells_form').length).val('');  
        lastMall.find('.floor').attr('id','floor_'+$('#malls').find('.weui-cells_form').length).val('');  
        lastMall.find('.area').attr('id','area_'+$('#malls').find('.weui-cells_form').length).val('');  
        lastMall.find('.sales').attr('id','sales_'+$('#malls').find('.weui-cells_form').length).val('');

        scrollTo(lastMall);
    });
    
    $("#authentication_form").validate({
        rules: {
            company_name: {
                required: true
            },
            uscc: {
                required: true
            }
        },
        messages: {
            company_name: {
                required: "公司名为必填项"
            },
            uscc: {
                required: "统一社会信用代码为必填项"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('company_name', $('#company_name').val());
            $.cookie('uscc', $('#uscc').val());
            
            window.location.href = '/v2/price?id='+getURLParameter('id');
        }
    })
});