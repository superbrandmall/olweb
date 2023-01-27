$(document).ready(function(){    
    $("#create-form").validate({
        rules: {
            unitName: {
                required: true,
                minlength: 2
            },
            unitType: {
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
            }
        },
        messages: {
            unitName: {
                required: "请输入门牌号",
                minlength: "请输入完整门牌号"
            },
            unitType: {
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
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveStore();
        }
    });
    
    
    updateDictDropDownByDictTypeCode('UNIT_TYPE', 'unitType', '未选择', '');
    updateUserDropDown(20);
    $("#mallCode").val(null).trigger('change');
    
    $("#mallCode").on('change',function(){
        findFloorDropDownByMallCode($('#mallCode').val());
    })
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
})

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
        
        var height = $('#height').val();

        var map = {
            "abcRent": null,
            "approveFirst": $('#approveFirst').val(),
            "approveSecond":('#approveSecond').val(),
            "approveThird": ('#approveThird').val(),
            "area": $('#unitArea').val(),
            "creatorOpenId": openId,
            "endDate": $('#endDate').val(),
            "enterFlag": ('#approveFirst').val(),
            "floorName":('#approveFirst').val(),
            "id": ('#approveFirst').val(),
            "liftFlag": ('#approveFirst').val(),
            "mallCode": $('#mallCode').val(),
            "modality": ('#approveFirst').val(),
            "mulitPathFlag": 0,
            "shopStatus": 1,
            "startDate": $('#startDate').val(),
            "unitCode": $('#unitCode').val(),
            "unitDesc":('#approveFirst').val(),
            "unitName": $('#unitName').val(),
            "unitSize": '0x0x'+height,
            "unitType": $('#unitType').val(),
            "creatorOpenId": openId
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