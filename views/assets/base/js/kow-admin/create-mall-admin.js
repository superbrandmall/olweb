$(document).ready(function(){
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()),0);
    });
    
    $('#startDate').datepicker('update',date);
    $('#endDate').datepicker('update','2099-12-31');
    
    findDictCodeByDictTypeCode('MALL_TYPE');
    
    $("#create-form").validate({
        rules: {
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
            addMall();
        }
    });
})

function addMall() {
    Ewin.confirm({ message: "确定要提交保存该项目信息吗？" }).on(function (e) {
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
        
        var mallName = $('#mallName').val();
        var province = '上海市';
        var cityDistrict = $('#cityDistrict').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
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
            "updateOpenId": openId
        };
        mallLotusExtensionList.push(mallLotusExtensionIsFamous);
        
        var description = $('#description').val() || null;
        
        var mallType = null;
        var mt = JSON.parse(sessionStorage.getItem('MALL_TYPE'));
        if(mt.length > 0){
            $.each(mt, function(i,v) {
                if(v.dictName == 'KOW'){
                    mallType = v.dictCode;
                    return false;
                }
            })
        }

        if(mallName!= '' && cityDistrict != '' && startDate != '' && endDate != '' && name != '' && address != ''){
            var map = {
                "creatorOpenId": openId,
                "description": description,
                "endDate": endDate,
                "location": address,
                "mallLotusBase": {
                  "address": address,
                  "bankAccount": "",
                  "bankName": "",
                  "building": 1,
                  "cityDistrict": province+cityDistrict,
                  "creatorOpenId": openId,
                  "deliveryAddress": address,
                  "endTime": "",
                  "mail": "",
                  "mallName": mallName,
                  "mallStatus": 1,
                  "name": name,
                  "phoneNum": "",
                  "province": province,
                  "regAddress": address,
                  "startTime": "",
                  "updateOpenId": openId,
                  "uscc": ""
                },
                "mallLotusExtensionList": mallLotusExtensionList,
                "mallName": mallName,
                "mallType": mallType,
                "startDate": startDate,
                "updateOpenId": openId
            };

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