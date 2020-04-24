$(document).ready(function(){
    getBrandCategory();
    
    $('.add').click(function(e){
        e.preventDefault();
        var newBrand = $('#brands').find('.weui-cells_form:first').clone();
        $('#brands').append(newBrand);
        var lastBrand = $('#brands').find('.weui-cells_form:last');
        
        lastBrand.find('.brand').attr('id','brand_'+$('#brands').find('.weui-cells_form').length).val('');  
        lastBrand.find('.category').attr({
            'id':'category_'+$('#brands').find('.weui-cells_form').length,
            'name':'category_'+$('#brands').find('.weui-cells_form').length
        }).val('');
        lastBrand.find('.operation').attr({
            'id':'operation_'+$('#brands').find('.weui-cells_form').length,
            'name':'operation_'+$('#brands').find('.weui-cells_form').length
        }).val('');

        scrollTo(lastBrand);
    });
    
    $("#register_form").validate({
        rules: {
            brand_1: {
                required: true
            },
            category_1: {
                required: true
            },
            operation_1: {
                required: true
            },
            contact_name_1: {
                required: true
            }
        },
        messages: {
            brand_1: {
                required: "品牌名为必填项"
            },
            category_1: {
                required: "业态为必填项"
            },
            operation_1: {
                required: "运营模式为必填项"
            },
            contact_name_1: {
                required: "姓名为必填项"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('brand_1', $('#brand_1').val());
            $.cookie('category_1', $('#category_1').find('option:selected').val());
            $.cookie('operation_1', $('#operation_1').find('option:selected').val());
            $.cookie('contact_name_1', $('#contact_name_1').val());
            $.cookie('company_name', $('#company_name').val());
            $.cookie('email', $('#email').val());
            $.cookie('job_title', $('#job_title').val());
            
            if(getURLParameter('type')){
                if(getURLParameter('type') == 'leasing'){
                    window.location.href = '/v2/floor-plan?f='+getURLParameter('f')+'&type=leasing';
                } else if(getURLParameter('type') == 'ads'){
                    window.location.href = '/v2/advertising?f='+getURLParameter('f')+'&type=ads';
                } else {
                    window.location.href = '/v2/info';
                }
            }
        }
    })
});

function getBrandCategory() {
    $.each($.parseJSON(sessionStorage.getItem("category")), function(i,v) {
        if($.cookie('lang') === 'en-us'){
            $('#category_1').append('<option value="'+v.code+'">'+v.name+'</option>');
        } else {
            $('#category_1').append('<option value="'+v.code+'">'+v.desc+'</option>');
        }
    });
    
    $('#brand_1').val($.cookie('brand_1'));
    $('#category_1').val($.cookie('category_1'));
    $('#operation_1').val($.cookie('operation_1'));
    $('#contact_name_1').val($.cookie('contact_name_1'));
    $('#company_name').val($.cookie('company_name'));
    $('#email').val($.cookie('email'));
    $('#job_title').val($.cookie('job_title'));
} 