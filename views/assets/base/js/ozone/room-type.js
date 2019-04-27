$(document).ready(function() {
    $('#country_selection li a').each(function(i,elem){
        $(this).click(function (e) {
            e.preventDefault();
            if($(this).find('img').length > 0){
                $('#country_flag').show().attr('src', $(this).find('img').attr('src'));
            } else {
                 $('#country_flag').hide();
            }
            $('#country_code').text($(this).text());
        });
    });
});