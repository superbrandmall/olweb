$(document).ready(function(){
    updateSelectMallDropDown();
    
    if($.cookie('searchMallCode') != 'null' && $.cookie('searchMallCode') != null){
        var newOption = new Option($.cookie('searchMallCode').split(':::')[0], $.cookie('searchMallCode').split(':::')[1], true, true);
        $('#mallCode').append(newOption).trigger('change');
    } else {
        $("#mallCode").val($.cookie('mallSelected').split(':::')[1]).trigger('change');
    }
    
    if($.cookie('searchBiz') != null){
        $('#biz').val($.cookie('searchBiz')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    renderModality0(1,items,($('#biz').val() || ''));

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
            $('.page-size').text('20');
            break;
    }
    
    $('#clear').click(function(){
        $('#mallCode').val('').trigger('change');
        $('#biz').val('').trigger('change');
        $.cookie('searchMallCode', null);
         $.cookie('searchBiz', null);
    })
    
    $('#search').click(function(){
        if($('#mallCode').val() != null){
            $.cookie('searchMallCode', $('#select2-mallCode-container').text().split(' [ ')[0]+':::'+$('#mallCode').val());
        } else {
            $.cookie('searchMallCode', null);
        }
        $.cookie('searchBiz', $('#biz').val());
        renderModality0(1,items,($('#biz').val() || ''));
    })
});

function renderModality0(p,c,m){
    $('#console').html('');
    
    var modality0 = ['零售','娱乐服务','儿童','餐饮','主力店'];
    
    $.each(modality0, function(i,v){
        if(m == '' || (m != '' && m == i)){
            $('#console').append('<tr data-index="'+i+'">\n\
            <td><a href="javascript: void(0);">'+v+' (I)</a></td>\n\
            <td>0.00</td>\n\
            <td>0</td>\n\
            <td>0.00</td>\n\
            <td>0%</td>\n\
            <td>0</td>\n\
            <td>0</td>\n\
            <td>0</td></tr>');
        }
    })
    generatePages(p, 1, c);
    $(".pagination-info").html('显示 1 到 '+modality0.length+' 行，共 '+modality0.length+'行');
}