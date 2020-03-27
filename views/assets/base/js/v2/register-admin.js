$(document).ready(function(){
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