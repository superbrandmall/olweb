$(document).ready(function(){
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $('#unitCode').on('blur',function(){
        $('#unitName').val($(this).val());
    });
    
    // 初始化
    updateDictDropDownByDictTypeCode('UNIT_TYPE','unitType',$.api.unitType[0],$.api.unitType[1]); // 铺位类型
    updateSelectMallDropDown(20) // 所属项目
    $('#startDate').datepicker('update',date);
    $('#endDate').datepicker('update','2099-12-31');
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
            addStore();
        }
    });
})

function addStore() {
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
        
        var unitCode = $('#unitCode').val();
        var unitType = $('#unitType').val();
        var mallCode = $('#mallCode').val();
        var floorName = $('#floorName').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
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

        if(unitCode!= '' && unitType != '' && mallCode != '' && floorName != '' && startDate != '' && endDate != '' && approveFirst != '' && unitName != '' && length != '' && width != '' && height != '' && area != ''){
            var map = {
                "abcRent": 0,
                "approveFirst": approveFirst,
                "approveSecond": approveSecond,
                "approveThird": approveThird,
                "area": area,
                "creatorOpenId": openId,
                "endDate": endDate,
                "enterFlag": enterFlag,
                "floorName": floorName,
                "liftFlag": liftFlag,
                "mallCode": mallCode,
                "modality": "",
                "mulitPathFlag": mulitPathFlag,
                "shopStatus": 1,
                "startDate": startDate,
                "unitCode": unitCode,
                "unitDesc": unitDesc,
                "unitName": unitName,
                "unitSize": unitSize,
                "unitType": unitType,
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
