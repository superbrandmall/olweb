$(document).ready(function(){
    $('#confirm_engineering').click(function(){
        window.location.href = '/v2/improve-info?id='+getURLParameter('id');
    });
});