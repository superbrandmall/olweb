$(document).ready(function(){
    $(function(){
        var $toast = $('#js_toast');

        $('#showTooltips').on('click', function(){
            $('.page.cell').removeClass('slideIn');

            $toast.fadeIn(100);
            setTimeout(function () {
                $toast.fadeOut(100);
                window.location.href = '/v2/default';
            }, 2000);
        });
    });
});