$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "create-dict-type-fail":
                $('.callout-danger').text('新建字典类型失败，请重新操作').show().delay(2000).hide(0);
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
    
    if($.api.dictModule.length <= 0) {
        findDictModule();
    } else {
        renderDictModule();
    }

    $("#create-dict-type-form").validate({
        rules: {
            dictTypeName: {
                required: true,
                minlength: 2
            },
            dictTypeCode: {
                required: true,
                minlength: 2
            },
            dictModule: {
                required: true
            }
        },
        messages: {
            dictTypeName: {
                required: "请输入类型名称",
                minlength: "请输入合适的类型名称"
            },
            dictTypeCode: {
                required: "请输入类型代码",
                minlength: "请输入合适的类型代码"
            },
            dictModule: {
                required: "请选择所属模块"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveDictType();
        }
    });
})

function saveDictType() {
    var dictTypeName = $('#dictTypeName').val();
    var dictTypeCode = $('#dictTypeCode').val();
    var dictModule = $('#dictModule').val();
    var dictExtend = $('#dictExtend').val();

    if(dictTypeName != '' && dictTypeCode!= '' && dictModule != ''){
        var map = {
            "dictExtend": dictExtend,
            "dictModule": dictModule,
            "dictTypeCode": dictTypeCode,
            "dictTypeName": dictTypeName
        };

        $.ajax({
            url: $.api.baseAdmin+"/api/dict/saveDictType",
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

                    window.location.href = 'dict?s=create-dict-type-succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                    window.location.href = 'create-dict-type?s=create-dict-type-fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'create-dict-type?s=create-dict-type-fail';
            }
        });
    }
}

function findDictModule(){
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findDictModule",
        type: "GET",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0) { 
                    $.each(response.data, function(i,v){
                        $.api.dictModule.push(v.dictModule);
                    });
                    renderDictModule();
                }
            } 
        }
    });
}

function renderDictModule() {
    $('#dictModule').html('');
    $('#dictModule').append('<option value="">未选择</option>');
    $.each($.api.dictModule, function(i,v) {
        $('#dictModule').append('<option value="'+v+'">'+v+'</option>');   
    })
}
