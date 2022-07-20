$.store = '';

$(document).ready(function(){
    findStoreByCode();
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    updateKowLeasingByRoleId('kow_leasing'); // 铺位负责人
    
    $("#create-form").validate({
        rules: {
            unitCode: {
                required: true,
                minlength: 2
            },
            unitType: {
                required: true
            },
            mallCode: {
                required: true
            },
            floorName: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            approveFirst: {
                required: true
            },
            unitName: {
                required: true,
                minlength: 2
            },
            length: {
                required: true
            },
            width: {
                required: true
            },
            height: {
                required: true
            },
            area: {
                required: true
            }
        },
        messages: {
            unitCode: {
                required: "请输入合同铺位号",
                minlength: "请输入完整合同铺位号"
            },
            unitType: {
                required: "请选择类型"
            },
            mallCode: {
                required: "请选择所属项目"
            },
            floorName: {
                required: "请选择所属楼层"
            },
            startDate: {
                required: "请选择生效开始日期"
            },
            endDate: {
                required: "请选择生效结束日期"
            },
            approveFirst: {
                required: "请选择铺位负责人1"
            },
            unitName: {
                required: "请输入合同铺位号",
                minlength: "请输入完整合同铺位号"
            },
            length: {
                required: "请输入铺位长度"
            },
            width: {
                required: "请输入铺位宽度"
            },
            height: {
                required: "请输入铺位高度"
            },
            area: {
                required: "请输入铺位面积"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveStore();
        }
    });
})

function findStoreByCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByShopCode?shopCode="+getURLParameter('id'),
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
                    $.store = response.data;
                    $('#shopStatus').text(response.data.shopStatus == 1 ? '空闲' : '租用');
                    $('#state').text(response.data.state == 1 ? '使用中' : '已删除');
                    $('#unitName2').text(response.data.unitName);
                    $('#unitCode2').text(response.data.unitCode);
                    $('#unitCode').val(response.data.unitCode);
                    updateDictDropDownByDictTypeCode('UNIT_TYPE','unitType',$.api.unitType[0],$.api.unitType[1]); // 铺位类型
                    updateSelectMallDropDown(20) // 所属项目
                    var mallCode = new Option(response.data.mallName, response.data.mallCode, true, true);
                    $('#mallCode').append(mallCode).trigger('change');
                    $('#floorName').val(response.data.floorName).trigger('change');
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    var approveFirst = new Option(response.data.approveFirst, response.data.approveFirst, true, true);
                    $('#approveFirst').append(approveFirst).trigger('change');
                    if(response.data.approveSecond != null) {
                        var approveSecond = new Option(response.data.approveSecond, response.data.approveSecond, true, true);
                        $('#approveSecond').append(approveSecond).trigger('change');
                    }
                    if(response.data.approveThird != null) {
                        var approveThird = new Option(response.data.approveThird, response.data.approveThird, true, true);
                        $('#approveThird').append(approveThird).trigger('change');
                    }
                    $('#unitName').val(response.data.unitName);
                    var length = response.data.unitSize.split('x')[0];
                    var width = response.data.unitSize.split('x')[1];
                    var height = response.data.unitSize.split('x')[2];
                    $('#length').val(length);
                    $('#width').val(width);
                    $('#height').val(height);
                    $('#area').val(response.data.unitArea);
                    
                    if(response.data.mulitPathFlag == 1) {
                        $('#mulitPathFlag').prop('checked', true);
                    } else {
                        $('#mulitPathFlag').prop('checked', false);
                    }
                    
                    if(response.data.enterFlag == 1) {
                        $('#enterFlag').prop('checked', true);
                    } else {
                        $('#enterFlag').prop('checked', false);
                    }
                    
                    if(response.data.liftFlag == 1) {
                        $('#liftFlag').prop('checked', true);
                    } else {
                        $('#liftFlag').prop('checked', false);
                    }
                    
                    $('#unitDesc').val(response.data.unitDesc);
                    
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

function saveStore() {
    Ewin.confirm({ message: "确定要提交保存该铺位信息吗？" }).on(function (e) {
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
        
        var approveFirst = $('#approveFirst').val();
        var approveSecond = $('#approveSecond').val() || null;
        var approveThird = $('#approveThird').val() || null;
        var unitName = $('#unitName').val();
        var length = $('#length').val();
        var width = $('#width').val();
        var height = $('#height').val();
        var unitSize = length+'x'+width+'x'+height;
        var area = numberWithoutCommas($('#area').val());
        var mulitPathFlag = 0;
        if($('#mulitPathFlag').prop('checked') == true){
            mulitPathFlag = 1;
        }
        var enterFlag = 0;
        if($('#enterFlag').prop('checked') == true){
            enterFlag = 1;
        }
        var liftFlag = 0;
        if($('#liftFlag').prop('checked') == true){
            liftFlag = 1;
        }
        var unitDesc = $('#unitDesc').val() || null;

        if(approveFirst != '' && unitName != '' && length != '' && width != '' && height != '' && area != ''){
            var map = {
                "abcRent": $.store.abcRent,
                "approveFirst": approveFirst,
                "approveSecond": approveSecond,
                "approveThird": approveThird,
                "area": area,
                "code": $.store.code,
                "creatorOpenId": $.store.creatorOpenId,
                "endDate": $.store.endDate,
                "enterFlag": enterFlag,
                "floorName": $.store.floorName,
                "id": $.store.id,
                "liftFlag": liftFlag,
                "mallCode": $.store.mallCode,
                "modality": "",
                "mulitPathFlag": mulitPathFlag,
                "shopStatus": $.store.shopStatus,
                "startDate": $.store.startDate,
                "unitCode": $.store.unitCode,
                "unitDesc": unitDesc,
                "unitName": unitName,
                "unitSize": unitSize,
                "unitType": $.store.unitType,
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
                        if(response.data.resultCode !== 'ERROR') {
                            if(xhr.getResponseHeader("Login") !== null){
                                $.cookie('login', xhr.getResponseHeader("Login"));
                            }
                            if(xhr.getResponseHeader("Authorization") !== null){
                                $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                            }

                            window.location.href = '/kow-admin/stores?s=succeed';
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

function updateKowLeasingByRoleId(id) {
    $('#approveFirst, #approveSecond, #approveThird').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/user/role/yzj/findAllByRoleId",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {         
                return {
                    search: params.term,
                    roleId: id
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'];
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.name,
                                text: item.name
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })
}
