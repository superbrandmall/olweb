$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "create-dict-type-succeed":
                $('.callout-warning').text('新建字典类型成功!').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "create-dict-data-succeed":
                $('.callout-warning').text('新建字典数据成功!').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "edit-dict-data-succeed":
                $('.callout-warning').text('修改字典数据成功!').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "edit-dict-type-succeed":
                $('.callout-warning').text('修改字典类型成功!').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "edit-dict-type-fail":
                $('.callout-danger').text('修改字典类型失败!').show().delay(2000).hide(0);
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
    
    $("#dictModule_form").validate({
        rules: {
            dictModule: {
                required: true
            }
        },
        messages: {
            dictModule: {
                required: "请选择所属模块"
            }
        },
        errorPlacement: function(error, element) {
            findAllDict(1,items,'');
        },
        submitHandler: function() {
            findAllDict(1,items,'dictModule');
        }
    });
    
    $("#dictTypeCode_form").validate({
        rules: {
            dictTypeCode: {
                required: true
            }
        },
        messages: {
            dictTypeCode: {
                required: "请输入类型代码"
            }
        },
        errorPlacement: function(error, element) {
            findAllDict(1,items,'');
        },
        submitHandler: function() {
            findAllDict(1,items,'dictTypeCode');
        }
    });
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllDict(getURLParameter('page'),items,'');
    } else {
        findAllDict(1,items,'');
    }

    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('10');
            break;
    }
    
    $('#createDictData').click(function(){
        if($('#dictTypeCode').val() != ''){
            window.location.href = 'create-dict-data?dictTypeCode='+$('#dictTypeCode').val();
        }
    })
})

function findAllDict(p,c,u) {
    var url,flag;
    switch (u) {
        case 'dictModule':
            url = 'findAllByDictModule/'+$('#dictModule').val()+'?';
            flag = 1;
            break;
        case 'dictTypeCode':
            url = 'findAllByDictTypeCode/'+$('#dictTypeCode').val()+'?';
            flag = 0;
            break;
        default:
            url = 'findAll?';
            flag = 1;
            break;
    }
    
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/"+url+"page="+(p-1)+"&size="+c+"&sort=id,desc",
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

                $('#dictL,#dictS,.pagination .pagination, .pagination-info').html('');
                if(flag == 1) {
                    if(response.data.content.length > 0){
                        var pages =  response.data.totalPages;
                        generatePages(p, pages, c);

                        sessionStorage.setItem("dictDataList", JSON.stringify(response.data.content));
                        $.each(response.data.content, function(i,v) {
                            $('#dictL').append('<tr data-index="'+i+'">\n\
<td>'+v.dictTypeCode+'</td>\n\
<td>'+v.dictTypeName+'</td>\n\
<td>'+v.dictModule+'</td>\n\
<td><a href="javascript: void(0);" onclick=\'javascript: dictDataModalToggle("'+i+'")\' class="btn btn-info btn-xs">数据列表</a>\n\
<a href="javascript: void(0);" onclick=\'javascript: dictTypeModalToggle("'+i+'")\' class="btn btn-warning btn-xs">修改</a>\n\
</td></tr>');
                            $('#dictS').append('\
    <tr data-index="'+i+'">\n\
    <td colspan="65">\n\
    <div class="card-views"><div class="card-view"><span class="title">类型代码</span><span class="value">'+v.dictTypeCode+'</span></div></div>\n\
    <div class="card-views"><div class="card-view"><span class="title">类型名称</span><span class="value">'+v.dictTypeName+'</span></div></div>\n\
    <div class="card-views"><div class="card-view"><span class="title">所属模块</span><span class="value">'+v.dictModule+'</span></div></div>\n\
    <div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value"><a href="javascript: void(0);" onclick=\'javascript: dictDataModalToggle("'+i+'")\' class="btn btn-info btn-xs">数据列表</a>\n\
    <a href="javascript: void(0);" onclick=\'javascript: dictTypeModalToggle("'+i+'")\' class="btn btn-warning btn-xs">修改</a></span></div></div>\n\
    </td></tr>');
                        })

                        if(p == pages){
                            $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                        } else {
                            $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                        }
                    } else {
                        $('#dictL').append('<tr><td colspan="4" style="text-align: center;">没有查到相关记录！</td></tr>');
                        $('#dictS').append('<tr><td style="text-align: center;">没有查到相关记录！</td></tr>');
                    }
                } else {
                    if(response.data != null){
                        sessionStorage.setItem("dictDataList", JSON.stringify(response.data));
                        $('#dictL').append('<tr data-index="0">\n\
<td>'+response.data.dictTypeCode+'</td>\n\
<td>'+response.data.dictTypeName+'</td>\n\
<td>'+response.data.dictModule+'</td>\n\
<td><a href="javascript: void(0);" onclick=\'javascript: dictDataModalToggle("00")\' class="btn btn-info btn-xs">数据列表</a>\n\
<a href="javascript: void(0);" onclick=\'javascript: dictTypeModalToggle("00")\' class="btn btn-warning btn-xs">修改</a>\n\
</td></tr>');
                        $('#dictS').append('\
                        <tr data-index="0">\n\
                        <td colspan="65">\n\
                        <div class="card-views"><div class="card-view"><span class="title">类型代码</span><span class="value">'+response.data.dictTypeCode+'</span></div></div>\n\
                        <div class="card-views"><div class="card-view"><span class="title">类型名称</span><span class="value">'+response.data.dictTypeName+'</span></div></div>\n\
                        <div class="card-views"><div class="card-view"><span class="title">所属模块</span><span class="value">'+response.data.dictModule+'</span></div></div>\n\
                        <div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value"><a href="javascript: void(0);" onclick=\'javascript: dictDataModalToggle("00")\' class="btn btn-info btn-xs">数据列表</a>\n\
                        <a href="javascript: void(0);" onclick=\'javascript: dictTypeModalToggle("00")\' class="btn btn-warning btn-xs">修改</a></span></div></div>\n\
                        </td></tr>');
                    } else {
                        $('#dictL').append('<tr><td colspan="4" style="text-align: center;">没有查到相关记录！</td></tr>');
                        $('#dictS').append('<tr><td style="text-align: center;">没有查到相关记录！</td></tr>');
                    }
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

function dictDataModalToggle(index){
    $('#dictDataL,#dictDataS').html('');
    var dictDataList;
    if(index == '00'){
        dictDataList  = JSON.parse(sessionStorage.getItem("dictDataList")).dictDataList;
    } else {
        dictDataList  = JSON.parse(sessionStorage.getItem("dictDataList"))[index].dictDataList;
    }
    
    if(dictDataList.length > 0){
        $.each(dictDataList, function(i,v) {
            $('#dictDataL').append('<tr data-index="'+i+'">\n\
            <td>'+v.dictOrder+'</td>\n\
            <td>'+v.dictTypeCode+'</td>\n\
            <td>'+v.dictName+'</td>\n\
            <td>'+v.dictCode+'</td>\n\
            <td><a href="/lotus-admin/edit-dict-data?dictTypeCode='+v.dictTypeCode+'&id='+v.id+'" class="btn btn-warning btn-xs">修改</a></td></tr>');
            
            $('#dictDataS').append('<tr data-index="'+i+'">\n\
            <td colspan="65">\n\
            <div class="card-views"><div class="card-view"><span class="title">顺序</span><span class="value">'+v.dictOrder+'</span></div></div>\n\
            <div class="card-views"><div class="card-view"><span class="title">类型代码</span><span class="value">'+v.dictTypeCode+'</span></div></div>\n\
            <div class="card-views"><div class="card-view"><span class="title">名称</span><span class="value">'+v.dictName+'</span></div></div>\n\
            <div class="card-views"><div class="card-view"><span class="title">代码</span><span class="value">'+v.dictCode+'</span></div></div>\n\
            <div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value"><a href="/lotus-admin/edit-dict-data?dictTypeCode='+v.dictTypeCode+'&id='+v.id+'" class="btn btn-warning btn-xs">修改</a></span></div></div>\n\
            </td></tr>');
        })
    } else {
        $('#dictDataL').append('<tr><td colspan="5" style="text-align: center;">没有查到相关记录！</td></tr>');
        $('#dictDataS').append('<tr><td style="text-align: center;">没有查到相关记录！</td></tr>');
    }
    $('#dict_data').modal('toggle');
}

function dictTypeModalToggle(index){
    $('#edit-dict-type-form input, #edit-dict-type-form select').val('');
    var dictType;
    if(index == '00'){
        dictType  = JSON.parse(sessionStorage.getItem("dictDataList"));
        sessionStorage.setItem('dictType',sessionStorage.getItem("dictDataList"));
    } else {
        dictType  = JSON.parse(sessionStorage.getItem("dictDataList"))[index];
        sessionStorage.setItem('dictType',JSON.stringify(dictType));
    }
    
    if(dictType != null){
        renderDictModule_Type();
        $('#editDictTypeName').val(dictType.dictTypeName);
        $('#editDictTypeCode').val(dictType.dictTypeCode);
        $('#editDictModule').val(dictType.dictModule);
        $('#editDictExtend').val(dictType.dictExtend);
    }
    $('#dict_type').modal('toggle');
    $('#edit-dict-type-form button').click(function(){
        validateEditDictTypeForm();
    })
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
            } else {
                alertMsg(response.code,response.customerMessage);
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

function renderDictModule_Type() {
    $('#editDictModule').append('<option value="">未选择</option>');
    $.each($.api.dictModule, function(i,v) {
        $('#editDictModule').append('<option value="'+v+'">'+v+'</option>');   
    })
}

function validateEditDictTypeForm() {
    $("#edit-dict-type-form").validate({
        rules: {
            dictTypeName: {
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
            dictModule: {
                required: "请选择所属模块"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            editDictType();
        }
    });
}

function editDictType() {
    var dictTypeName = $('#editDictTypeName').val();
    var dictTypeCode = $('#editDictTypeCode').val();
    var dictModule = $('#editDictModule').val();
    var dictExtend = $('#editDictExtend').val();

    if(dictTypeName != '' && dictTypeCode!= '' && dictModule != ''){
        var map = $.parseJSON(sessionStorage.getItem("dictType"));
        map.dictExtend = dictExtend;
        map.dictModule = dictModule;
        map.dictTypeName = dictTypeName;

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

                    window.location.href = 'dict?s=edit-dict-type-succeed';
                } else {
                    alertModalMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                window.location.href = 'dict?s=edit-dict-type-fail';
            }
        });
    }
}