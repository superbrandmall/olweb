$(document).ready(function(){
    $('#mallName').text($.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']');
})