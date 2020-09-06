$(document).ready(function(){
    
    $(".label").on('click', function (){
        //$.cookie('category',$(this));
        $('.active').removeClass('active');
        $(this).addClass('active');
    })
    
    $("#confirm_category").on('click', function (){
         window.location.href = '/v2/shop?id='+getURLParameter('id')+'&type=leasing';
    })
});