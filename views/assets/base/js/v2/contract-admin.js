$(document).ready(function(){
    var videoSrc = $("#stamp_video iframe").attr("src");

    $('#stamp_video').on('show.bs.modal', function () { // on opening the modal
      // set the video to autostart
      $("#stamp_video iframe").attr("src", videoSrc+"?autoplay=1");
    });

    $("#stamp_video").on('hidden.bs.modal', function (e) { // on closing the modal
      // stop the video
      $("#stamp_video iframe").attr("src", null);
    });
});