$(document).ready(function(){
    $('#confirm_engineering').click(function(){
        window.location.href = '/v2/contract?id='+getURLParameter('id');
    });
});