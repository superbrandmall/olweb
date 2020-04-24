$(document).ready(function(){
    getBrandCategory();
    
    $('.add').click(function(e){
        e.preventDefault();
        var ov = $('#brands').find('.panel-body:first').find($("input[type='radio']:checked")).val();
        var newBrand = $('#brands').find('.panel-body:first').clone();
        $('#brands').append(newBrand);
        var lastBrand = $('#brands').find('.panel-body:last');
        
        lastBrand.find('.brand').attr('id','brand_'+$('#brands').find('.panel-body').length).val('');  
        lastBrand.find('.category').attr({
            'id':'category_'+$('#brands').find('.panel-body').length,
            'name':'category_'+$('#brands').find('.panel-body').length
        }).val('');
        lastBrand.find('.operation').attr({
            'id':'operation_'+$('#brands').find('.panel-body').length,
            'name':'operation_'+$('#brands').find('.panel-body').length
        }).val('');
        //$("input[name='operation_1'][value='"+ov+"']").prop("checked",true);

        scrollTo(lastBrand);
    });
    
    $('#register').click(function(){
        if(getURLParameter('type')){
            if(getURLParameter('type') == 'leasing'){
                window.location.href = '/v2/floor-plan?f='+getURLParameter('f');
            } else if(getURLParameter('type') == 'ads'){
                window.location.href = '/v2/advertising?f='+getURLParameter('f');
            }
        }
    });
});

function getBrandCategory() {
    $.each($.parseJSON(sessionStorage.getItem("category")), function(i,v) {
        if($.cookie('lang') === 'en-us'){
            $('#category_1').append('<option value="'+v.code+'">'+v.name+'</option>');
        } else {
            $('#category_1').append('<option value="'+v.code+'">'+v.desc+'</option>');
        }
    });
} 