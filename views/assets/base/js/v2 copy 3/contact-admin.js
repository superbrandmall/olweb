$(document).ready(function(){
    
})

function textarea(input) {
    var content = $(input);
      var max =  content.next().find('i') .text();
    var value = content.val();
    if (value.length>0) {

        value = value.replace(/\n|\r/gi,"");
        var len = value.length;
        content.next().find('span').text(len) ;
         if(len>max){
             content.next().addClass('f-red');
         }else{
             content.next().removeClass('f-red');
         }
    }
}