document.getElementById("money-bani").innerHTML = localStorage.clickcount + " BANI";

function clickCounter() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      var radios = document.getElementsByName('inlineRadioOptions');
      for(let i=0; i < radios.length; i++) {
        if(radios[i].checked) {
          localStorage.clickcount = Number(localStorage.clickcount) + Number(radios[i].value);
          break;
        }
      }
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("money-bani").innerHTML = localStorage.clickcount + " BANI";
  }

}

$(function(){
  $("button").click(function() {
    
      var fired_button = $(this).val();
      if (localStorage.clickcount && localStorage.clickcount >= 0) {
        localStorage.clickcount = Number(localStorage.clickcount)-Number(fired_button);
        document.getElementById("money-bani").innerHTML = localStorage.clickcount + " BANI";
      }
  });
});
function buyItem(){

  if (localStorage.clickcount && localStorage.clickcount >= 0) {
    localStorage.clickcount = Number(localStorage.clickcount)-Number(fired_button);
    document.getElementById("money-bani").innerHTML = localStorage.clickcount + " BANI";
  }
  
}


