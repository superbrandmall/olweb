$(document).ready(function(){    
    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.moduleCode == 'IT_ADMIN' || v.moduleCode == 'LOTUS_ENGINEERING'){
            auth = 1;
            return false;
        }
    })
    
    $("#create-form").validate({
        rules: {
            unitName: {
                required: true,
                minlength: 2
            },
            unitType1: {
                required: true
            },
            mallCode: {
                required: true
            },
            selectFloor: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            selectUser1: {
                required: true
            },
            unitArea: {
                required: true
            },
            modality_1: {
                required: true
            },
            modality_2: {
                required: true
            }
        },
        messages: {
            unitName: {
                required: "请输入门牌号",
                minlength: "请输入完整门牌号"
            },
            unitType1: {
                required: "请选择铺位类型"
            },
            mallCode: {
                required: "请选择所属项目"
            },
            selectFloor: {
                required: "请选择所属楼层"
            },
            startDate: {
                required: "请选择生效开始日期"
            },
            endDate: {
                required: "请选择生效结束日期"
            },
            selectUser1: {
                required: "请选择铺位负责人1"
            },
            unitArea: {
                required: "请输入租赁面积"
            },
            modality_1: {
                required: "请选择一级业态"
            },
            modality_2: {
                required: "请选择二级业态"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            if(numberWithoutCommas($('#unitArea').val()) < 1 ) {
                auth = 0;
                $('#errorcontainer-unitArea').html('<label id="unitArea-error" class="error" for="unitArea" style="">租赁面积最小为1平方米</label>');
            } else {
                auth = 1;
                $('#errorcontainer-unitArea').html('<label id="unitArea-error" class="error" for="unitArea" style="display: none;"></label>');
            }
    
            if(auth == 1){
                saveStore();
            }
        }
    });
    
    updateDictDropDownByDictTypeCode('UNIT_TYPE', 'unitType1', '未选择', '');
    updateUserDropDown(20);
    $("#mallCode").val(null).trigger('change');
    
    $("#mallCode").on('change',function(){
        findFloorDropDownByMallCode($('#mallCode').val());
        updateSelectStoreDropDownByMallCode(10,$('#mallCode').val());
    })
    
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
    
    $("#modality_1").on('change',function(){
        if($(this).val() != '') {
            findBizByBiz1($(this).val());
        }
    })
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
})

function findBizByBiz1(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality1?modality1="+encodeURIComponent(biz),
        type: "GET",
        async: true,
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
                    $.each(response.data, function(i,v) {
                        $('#modality_2').append('<option value="'+v.modality2+'">'+v.modality2+'</option>');
                        if ($("#modality_2 option:contains('"+v.modality2+"')").length > 1){
                            $("#modality_2 option:contains('"+v.modality2+"'):gt(0)").remove();
                        }
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
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
        
        var shopState = 1;
        if(dateCompare($('#endDate').val(),date) == 'smaller'){
            shopState = 0;
        }
        
        var unitParent = null;
        if($('#selectStore').val() != null && $('#selectStore').val() != ''){
            unitParent = $('#selectStore').find('option:selected').val().split(':::')[2]+':::'+$('#selectStore').find('option:selected').val().split(':::')[0]+':::'+$('#selectStore').find('option:selected').text().split(' | ')[1]+':::'+$('#selectStore').find('option:selected').val().split(':::')[1];
        }

        var map = {
            "abcRent": null,
            "approveFirst": $('#selectUser1').val(),
            "approveSecond":$('#selectUser2').val(),
            "approveThird": $('#selectUser3').val(),
            "area": numberWithoutCommas($('#unitArea').val()),
            "creatorOpenId": openId,
            "endDate": $('#endDate').val(),
            "floorCode": $('#selectFloor').val(),
            "floorName": $('#selectFloor').find('option:selected').text(),
            "mallCode": $('#mallCode').val(),
            "modality": "",
            "modality1": $('#modality_1').val(),
            "modality2": $('#modality_2').val(),
            "shopStatus": 1,
            "shopState": shopState,
            "state": 1,
            "startDate": $('#startDate').val(),
            "unitDesc": $('#remark').val(),
            "unitName": $('#unitName').val(),
            "unitType": $('#unitType1').val(),
            "unitParent": unitParent,
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