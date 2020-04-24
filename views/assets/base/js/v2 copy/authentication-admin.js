$(document).ready(function(){ 
    $('.add').click(function(e){
        e.preventDefault();
        var newMall = $('.add').parent().parent().find('.panel-body:first').clone();
        $(this).parent().parent().append(newMall);
        var lastMall = $('.add').parent().parent().find('.panel-body:last');
        lastMall.find('input').val('');
        scrollTo(lastMall);
    });
    
    $('#to_authenticate').click(function(){
        window.location.href = '/v2/price?id='+getURLParameter('id');
    });
});