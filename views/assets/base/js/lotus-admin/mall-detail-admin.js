$.mall = '';

$(document).ready(function(){    
    $("#create-form").validate({
        rules: {
            cityDistrict: {
                required: true
            },
            regAddress: {
                required: true
            },
            mallName: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            province: {
                required: true
            },
            deliveryAddress: {
                required: true
            },
            location: {
                required: true
            }
        },
        messages: {
            cityDistrict: {
                required: "请输入项目所属地"
            },
            regAddress: {
                required: "请输入注册地址"
            },
            mallName: {
                required: "请选择项目名称"
            },
            startDate: {
                required: "请选择大业主合同开始日期"
            },
            endDate: {
                required: "请选择大业主合同结束日期"
            },
            province: {
                required: "请输入项目所属省市"
            },
            deliveryAddress: {
                required: "请输入邮寄地址"
            },
            location: {
                required: "请输入位置"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveMall();
        }
    });
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true,
        'clearBtn': true
    });
    
    $("#openStartTime").timepicker({
        defaultTime:'10:00',
        showMeridian:false
    });
    
    $("#openEndTime").timepicker({
        defaultTime:'22:00',
        showMeridian:false
    });
    
    findMallByCode();
    getShops();
})

function findMallByCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/mall/lotus/findOneByCode?code="+getURLParameter('id'),
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
                
                if(response.data != null && response.data != ''){
                    $.mall = response.data;
                    if(response.data.mallLotusBase.mallStatus == 1){
                        $('#state').text('使用中');
                    } else {
                        $('#state').text('已删除').removeClass('badge-success').addClass('badge-danger');
                    }
                    $('#name2').text(response.data.mallName+'['+response.data.code+']');
                    $('#code').val(response.data.code);
                    $('#mallName').val(response.data.mallName);
                    $('#province').val(response.data.mallLotusBase.province);
                    $('#cityDistrict').val(response.data.mallLotusBase.cityDistrict);
                    $('#location').val(response.data.location);
                    $('#deliveryAddress').val(response.data.mallLotusBase.deliveryAddress);
                    $('#regAddress').val(response.data.mallLotusBase.regAddress);
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    $('#openStartTime').val(response.data.mallLotusBase.startTime);
                    $('#openEndTime').val(response.data.mallLotusBase.endTime);
                    
                    $('#building').text(response.data.mallLotusBase.building || '-');
                    if(!sessionStorage.getItem("floors-"+getURLParameter('id')) || sessionStorage.getItem("floors-"+getURLParameter('id')) == null || sessionStorage.getItem("floors-"+getURLParameter('id')) == '') {
                        getFloors();
                    } else {
                        $('#floor').text($.parseJSON(sessionStorage.getItem("floors-"+getURLParameter('id'))).length);
                    }
    
                    $('#name').val(response.data.mallLotusBase.name);
                    $('#bankName').val(response.data.mallLotusBase.bankName);
                    $('#bankAccount').val(response.data.mallLotusBase.bankAccount);
                    $('#uscc').val(response.data.mallLotusBase.uscc);
                    $('#phoneNum').val(response.data.mallLotusBase.phoneNum);
                    $('#address').val(response.data.mallLotusBase.address);
                    
                    $('#description').val(response.data.description);
                }
            }
        }
    })
}

function getFloors() {
    $.ajax({
        url: $.api.baseLotus+"/api/floor/lotus/findAllByMallCode?mallCode="+getURLParameter('id'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data.length > 0) {
                sessionStorage.setItem("floors-"+getURLParameter('id'), JSON.stringify(response.data) );
                $('#floor').text(response.data.length);
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getShops() {
    $.ajax({
        url: $.api.baseLotus+"/api/shop/lotus/findAllByMallCode?mallCode="+getURLParameter('id')+"&page=0&size=100",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0' && response.data.content.length > 0) {
                var leasing_area = 0;
                var shoppe_units = 0;
                var kiosk_units = 0;
                var stora_units = 0;
                $.each(response.data.content, function(i,v){
                    leasing_area = leasing_area + v.area;
                    switch (v.unitType) {
                        case 'shoppe':
                            shoppe_units++;
                            break;
                        case 'kiosk':
                            kiosk_units++;
                            break;
                        case 'warehouse':
                            stora_units++;
                            break;
                        case 'stora':
                            stora_units++;
                            break;
                        default:
                            break;
                    }
                })
                
                $('#leasingArea').text(numberWithCommas(leasing_area.toFixed(2)));
                $('#shoppeUnits').text(Math.round(shoppe_units));
                $('#kioskUnits').text(Math.round(kiosk_units));
                $('#storaUnits').text(Math.round(stora_units));
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function saveMall() {
    Ewin.confirm({ message: "确定要保存修改该项目信息吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var map = {
            "code": $.mall.code,
            "creatorOpenId": $.mall.creatorOpenId,
            "description": $('#description').val(),
            "endDate": $('#endDate').val(),
            "id": $.mall.id,
            "img": "",
            "location": $('#location').val(),
            "mallLotusBase": {
              "address": $('#address').val(),
              "bankAccount": $('#bankAccount').val(),
              "bankName": $('#bankName').val(),
              "building": $.mall.mallLotusBase.building,
              "cityDistrict": $('#cityDistrict').val(),
              "code": $.mall.mallLotusBase.code,
              "creatorOpenId": $.mall.creatorOpenId,
              "deliveryAddress": ($('#deliveryAddress').val() || ''),
              "endTime": $('#openEndTime').val(),
              "id": $.mall.mallLotusBase.id,
              "mail": $.mall.mallLotusBase.mail,
              "mallCode": getURLParameter('id'),
              "mallName": $('#mallName').val(),
              "mallStatus": $.mall.mallLotusBase.mallStatus,
              "name": $('#name').val(),
              "phoneNum": $('#phoneNum').val(),
              "province": $('#province').val(),
              "regAddress": $('#regAddress').val(),
              "startTime": $('#openStartTime').val(),
              "updateOpenId": openId,
              "uscc": $('#uscc').val()
            },
            "mallName": $('#mallName').val(),
            "mallType": $.mall.mallType,
            "phone": $('#phoneNum').val(),
            "remarkSecond": $.mall.remarkSecond,
            "startDate": $('#startDate').val(),
            "updateOpenId": openId
        }

        $.ajax({
            url: $.api.baseLotus+"/api/mall/lotus/saveOrUpdate",
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

                    window.location.href = '/lotus-admin/malls?s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    })
}