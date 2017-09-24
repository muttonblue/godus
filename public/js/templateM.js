(function(){
  console.log('templateM');
  txt = 'x';
  something = function() {
    $('#stage').load('/jquery/result.html');
    $.post("getuserlogin", {suggest: txt}, function(result){
         $("span").html(result);
     });
  }; //something

})();
