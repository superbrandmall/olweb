$(document).ready(function(){
    $(function(){
        var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $uploaderInput = $(".weui-uploader__input"),
            $uploaderFiles = ".weui-uploader__files"
            ;

        $uploaderInput.on("change", function(e){
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            for (var i = 0, len = files.length; i < len; ++i) {
                var file = files[i];

                if (url) {
                    src = url.createObjectURL(file);
                } else {
                    src = e.target.result;
                }
                
                $(this).parent().parent().find($uploaderFiles).html($(tmpl.replace('#url#', src)));
            }
        });
    });
});