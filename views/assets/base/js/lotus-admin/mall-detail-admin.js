$.mall = '';

$(document).ready(function(){
    findMallByCode();
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()),0);
    });
    
    $("#create-form").validate({
        rules: {
            mallCode: {
                required: true,
                minlength: 7
            },
            mallName: {
                required: true,
                minlength: 2
            },
            cityDistrict: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            name: {
                required: true
            },
            address: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            mallCode: {
                required: "请输入项目代码",
                minlength: "请输入正确项目代码"
            },
            mallName: {
                required: "请输入项目名称",
                minlength: "请输入完整项目名称"
            },
            cityDistrict: {
                required: "请选择所属区域"
            },
            startDate: {
                required: "请输入生效开始日期"
            },
            endDate: {
                required: "请输入生效结束日期"
            },
            name: {
                required: "请输入签约主体"
            },
            address: {
                required: "请输入项目地址",
                minlength: "请输入完整项目地址"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveMall();
        }
    });
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
                    $('#state').text(response.data.mallLotusBase.state == 1 ? '使用中' : '已删除');
                    $('#mallName2').text(response.data.mallName);
                    $('#mallCode2').text(response.data.code);
                    
                    var isFamous = 0;
                    var mallArea = 0;
                    var weekdayCustomerNo = 0;
                    var weekendCustomerNo = 0;
                    var neighborTraffic = '';
                    if(response.data.mallLotusExtensionList != null) {
                        if(response.data.mallLotusExtensionList.length > 0) {
                            $.each(response.data.mallLotusExtensionList, function(j,w){
                                switch (w.keyType) {
                                    case "isFamous":
                                        isFamous = w.keyValue;
                                        break;
                                    case "mallArea":
                                        mallArea = w.keyValue;
                                        break;
                                    case "weekdayCustomerNo":
                                        weekdayCustomerNo = w.keyValue;
                                        break;
                                    case "weekendCustomerNo":
                                        weekendCustomerNo = w.keyValue;
                                        break;
                                    case "neighborTraffic":
                                        neighborTraffic = w.keyValue;
                                        break;
                                    default:
                                        break;
                                }
                            })
                        }
                    }
                    
                    $('#mallCode').val(response.data.code);
                    $('#mallName').val(response.data.mallName);
                    if(response.data.mallLotusBase.cityDistrict.indexOf('市') >= 0){
                        $('#cityDistrict').val(response.data.mallLotusBase.cityDistrict.split('市')[1]).trigger('change');
                    }
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    $('#name').val(response.data.mallLotusBase.name);
                    $('#address').val(response.data.mallLotusBase.address);
                    $('#mallArea').val(mallArea);
                    $('#weekdayCustomerNo').val(weekdayCustomerNo);
                    $('#weekendCustomerNo').val(weekendCustomerNo);
                    $('#neighborTraffic').val(neighborTraffic);
                    
                    if(isFamous == 1) {
                        $('#isFamous').prop('checked', true);
                    } else {
                        $('#isFamous').prop('checked', false);
                    }
                    $('#description').val(response.data.description);             
                    
                    $('input.money').each(function(){
                        if($(this).val() != ''){
                            $(this).val(accounting.formatNumber($(this).val()));
                        }
                    })
                }
            }
        }
    })
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

        var name = $('#name').val();
        var address = $('#address').val();
        var mallLotusExtensionList = [];
        
        var mallArea = null;
        if($('#mallArea').val() != ''){
            mallArea = numberWithoutCommas($('#mallArea').val());   
            var mallLotusExtensionMallArea = {
                "creatorOpenId": openId,
                "keyName": "项目面积",
                "keyType": "mallArea",
                "keyValue": mallArea,
                "keyValueName": "",
                "mallCode":	$.mall.code,
                "updateOpenId": openId
            };
            mallLotusExtensionList.push(mallLotusExtensionMallArea);
        }    

        var weekdayCustomerNo = null;
        if($('#weekdayCustomerNo').val() != ''){
            weekdayCustomerNo = numberWithoutCommas($('#weekdayCustomerNo').val());    
            var mallLotusExtensionWeekdayCustomerNo = {
                "creatorOpenId": openId,
                "keyName": "周内客流数",
                "keyType": "weekdayCustomerNo",
                "keyValue": weekdayCustomerNo,
                "keyValueName": "",
                "mallCode":	$.mall.code,
                "updateOpenId": openId
            };
            mallLotusExtensionList.push(mallLotusExtensionWeekdayCustomerNo);
        }
        
        var weekendCustomerNo = null;
        if($('#weekendCustomerNo').val() != ''){
            weekendCustomerNo = numberWithoutCommas($('#weekendCustomerNo').val());      
            var mallLotusExtensionWeekendCustomerNo = {
                "creatorOpenId": openId,
                "keyName": "周末客流数",
                "keyType": "weekendCustomerNo",
                "keyValue": weekendCustomerNo,
                "keyValueName": "",
                "mallCode":	$.mall.code,
                "updateOpenId": openId
            };
            mallLotusExtensionList.push(mallLotusExtensionWeekendCustomerNo);
        }    
        
        var neighborTraffic = $('#neighborTraffic').val();
        if(neighborTraffic != ''){
            var mallLotusExtensionNeighborTraffic = {
                "creatorOpenId": openId,
                "keyName": "临街情况",
                "keyType": "neighborTraffic",
                "keyValue": neighborTraffic,
                "keyValueName": "",
                "mallCode":	$.mall.code,
                "updateOpenId": openId
            };
            mallLotusExtensionList.push(mallLotusExtensionNeighborTraffic);
        }
        
        var isFamous = 0;
        if($('#isFamous').prop('checked') == true){
            isFamous = 1;
        }
        var mallLotusExtensionIsFamous = {
            "creatorOpenId": openId,
            "keyName": "知名连锁购物中心",
            "keyType": "isFamous",
            "keyValue": isFamous,
            "keyValueName": "1:是 0:否",
            "mallCode":	$.mall.code,
            "updateOpenId": openId
        };
        mallLotusExtensionList.push(mallLotusExtensionIsFamous);
        
        var description = $('#description').val() || null;
        
        var map = {
            "code": $.mall.code,
            "creatorOpenId": $.mall.openId,
            "description": description,
            "endDate": $.mall.endDate,
            "id": $.mall.id,
            "location": address,
            "mallLotusBase": {
              "address": address,
              "bankAccount": "",
              "bankName": "",
              "building": 1,
              "cityDistrict": $.mall.mallLotusBase.cityDistrict,
              "code": $.mall.mallLotusBase.code,
              "creatorOpenId": $.mall.mallLotusBase.creatorOpenId,
              "deliveryAddress": address,
              "endTime": "",
              "id": $.mall.mallLotusBase.id,
              "mail": "",
              "mallCode": $.mall.mallLotusBase.mallCode,
              "mallName": $.mall.mallLotusBase.mallName,
              "mallStatus": $.mall.mallLotusBase.mallStatus,
              "name": name,
              "phoneNum": "",
              "province": $.mall.mallLotusBase.province,
              "regAddress": address,
              "startTime": "",
              "state": $.mall.mallLotusBase.state,
              "updateOpenId": openId,
              "uscc": ""
            },
            "mallLotusExtensionList": mallLotusExtensionList,
            "mallName": $.mall.mallName,
            "mallType": $.mall.mallType,
            "startDate": $.mall.startDate,
            "updateOpenId": openId
            };

        if(name != '' && address != ''){
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
                        if(response.data.resultCode === 'SUCCESS') {
                            if(xhr.getResponseHeader("Login") !== null){
                                $.cookie('login', xhr.getResponseHeader("Login"));
                            }
                            if(xhr.getResponseHeader("Authorization") !== null){
                                $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                            }

                            window.location.href = '/kow-admin/malls?s=succeed';
                        } else {
                            alertMsg(response.data.resultCode,response.data.resultMsg);
                        }
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }
    })
}