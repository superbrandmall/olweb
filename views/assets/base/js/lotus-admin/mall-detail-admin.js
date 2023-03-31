$.mall = '';

$(document).ready(function(){    
//    $("#create-form").validate({
//        rules: {
//            unitName: {
//                required: true,
//                minlength: 2
//            },
//            unitType: {
//                required: true
//            },
//            mallCode: {
//                required: true
//            },
//            selectFloor: {
//                required: true
//            },
//            startDate: {
//                required: true
//            },
//            endDate: {
//                required: true
//            },
//            selectUser1: {
//                required: true
//            },
//            unitArea: {
//                required: true
//            }
//        },
//        messages: {
//            unitName: {
//                required: "请输入门牌号",
//                minlength: "请输入完整门牌号"
//            },
//            unitType: {
//                required: "请选择铺位类型"
//            },
//            mallCode: {
//                required: "请选择所属项目"
//            },
//            selectFloor: {
//                required: "请选择所属楼层"
//            },
//            startDate: {
//                required: "请选择生效开始日期"
//            },
//            endDate: {
//                required: "请选择生效结束日期"
//            },
//            selectUser1: {
//                required: "请选择铺位负责人1"
//            },
//            unitArea: {
//                required: true
//            }
//        },
//        errorPlacement: function(error, element) {
//            error.appendTo('#errorcontainer-' + element.attr('id'));
//        },
//        submitHandler: function() {
//            saveMall();
//        }
//    });
    
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
                    updateDictByDictTypeCodeAndVal('MALL_TYPE','mallType',response.data.mallType);  
                    $('#deliveryAddress').val(response.data.mallLotusBase.deliveryAddress);
                    $('#regAddress').val(response.data.mallLotusBase.regAddress);
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    $('#openStartTime').val(response.data.mallLotusBase.startTime);
                    $('#openEndTime').val(response.data.mallLotusBase.endTime);
                    
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

function saveMall() {
    Ewin.confirm({ message: "确定要保存修改该铺位信息吗？" }).on(function (e) {
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
            "abcRent": $.store.abcRent,
            "approveFirst": $('#selectUser1').val(),
            "approveSecond":$('#selectUser2').val(),
            "approveThird": $('#selectUser3').val(),
            "area": numberWithoutCommas($('#unitArea').val()),
            "code": $.store.code,
            "creatorOpenId": $.store.creatorOpenId,
            "endDate": $('#endDate').val(),
            "enterFlag": $.store.enterFlag,
            "floorCode": $('#selectFloor').val(),
            "floorName": $('#select2-selectFloor-container').text(),
            "id": $.store.id,
            "liftFlag": $.store.liftFlag,
            "mallCode": $('#mallCode').val(),
            "modality": $('#modality_1').val(),
            "mulitPathFlag": $.store.mulitPathFlag,
            "shopStatus": $.store.shopStatus,
            "startDate": $('#startDate').val(),
            "unitCode": $.store.unitCode,
            "unitDesc": $('#remark').val(),
            "unitName": $('#unitName').val(),
            "unitSize": $.store.unitSize,
            "unitType": $('#unitType').val(),
            "updateOpenId": openId
        };

        $.ajax({
            url: $.api.baseLotus+"/api/shop/lotus/saveOrUpdate",
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

                    window.location.href = '/lotus-admin/stores?s=succeed';
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