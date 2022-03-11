$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.callout-info').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "fail":
                $('.callout-danger').show().delay(2000).hide(0);
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

    $("#create-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            type: {
                required: true
            },
            businessScope: {
                minlength: 4
            },
            capital: {
                number: true
            },
            uscc: {
                rangelength: [18,18],
                numChar: true
            },
            tenantCode: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            name: {
                required: "请输入商户名称",
                minlength: "请输入完整商户名称"
            },
            type: {
                required: "请选择类型"
            },
            businessScope: {
                minlength: "请输入完整行业名称"
            },
            capital: {
                number: "注册资本请输入数字"
            },
            uscc: {
                rangelength: "请输入正确组织机构代码证",
                numChar: "请输入正确组织机构代码证"
            },
            tenantCode: {
                required: "请输入商户编号",
                minlength: "请输入正确商户编号"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkTenantName($('#name').val());
        }
    });
})

function checkTenantName(name) {
    $.ajax({
        url: $.api.baseLotus+"/api/tenant/lotus/findAllByName?name="+name,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    var duplicate = false;
                    $.each(response.data, function(i,x) {
                        if(x.name == name){
                            duplicate = true;
                        }
                    })
                    
                    if(duplicate == true) {
                        $('.callout-warning').show().delay(2000).hide(0);
                        $('html, body').animate({
                            scrollTop: $('#webui').offset().top
                        }, 0);
                    } else {
                        addTenant();
                    }
                } else {
                    addTenant();
                }
            } else {
                $('.callout-warning').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
            }                               
        }
    }); 
}

function addTenant() {
    var name = $('#name').val();
    var businessScope = $('#businessScope').val() || null;
    var type = $('#type').val();
    var capital = $('#capital').val() || null;
    var tenantCode = $('#tenantCode').val();
    var uscc = $('#uscc').val() || null;

    if(name != '' && type!= '' && tenantCode != ''){
        var map = {
            "businessScope": businessScope,
            "type": type,
            "capital": capital,
            "name": name,
            "tenantCode": tenantCode,
            "status": 1,
            "uscc": uscc,
            "tianyanchaId": null,
            "authState": null
        };

        $.ajax({
            url: $.api.baseLotus+"/api/tenant/lotus/saveOrUpdate",
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

                    window.location.href = 'home?s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                    window.location.href = 'create-tenant?s=fail';
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'create-tenant?s=fail';
            }
        });
    }
}