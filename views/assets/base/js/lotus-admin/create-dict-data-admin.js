$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "create-dict-data-fail":
                $('.callout-danger').text('新建字典数据失败，请重新操作').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    $('#dictTypeCode').val(getURLParameter('dictTypeCode'));

    $("#create-dict-data-form").validate({
        rules: {
            dictName: {
                required: true,
                minlength: 2
            },
            dictOrder: {
                required: true,
                number: true
            }
        },
        messages: {
            dictName: {
                required: "请输入数据名称",
                minlength: "请输入合适的数据名称"
            },
            dictOrder: {
                required: "请输入数据顺序",
                number: "请输入合适的数据顺序"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveDictData();
        }
    });
})

function saveDictData() {
    var dictTypeCode = $('#dictTypeCode').val();
    var dictName = $('#dictName').val();
    var dictCode = $('#dictCode').val();
    var dictOrder = $('#dictOrder').val();
    var dictInfo = $('#dictInfo').val();

    if(dictTypeCode != '' && dictName != '' && dictCode!= '' && dictOrder != ''){
        var map = {
                    "dictInfo": dictInfo,
                    "dictName": dictName,
                    "dictOrder": dictOrder,
                    "dictCode": dictCode,
                    "dictTypeCode": dictTypeCode
                };

        $.ajax({
            url: $.api.baseAdmin+"/api/dict/saveDictData",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    window.location.href = 'dict?s=create-dict-data-succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'create-dict-data?s=create-dict-data-fail';
            }
        });
    }
}
