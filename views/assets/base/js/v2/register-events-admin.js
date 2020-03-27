$(document).ready(function(){
    $('#register').click(function(){
        if(getURLParameter('id')){
            window.location.href = '/v2/choose-event?id='+getURLParameter('id');
        }
    });
});