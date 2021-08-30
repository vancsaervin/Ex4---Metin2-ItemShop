document.getElementById("money-bani").innerHTML =
  localStorage.clickcount + " BANI";

document.getElementById("money-euro").innerHTML =
  localStorage.clickcount2 + " EURO";

function clickCounter() {
  if (typeof Storage !== "undefined") {
    if (localStorage.clickcount) {
      var radios = document.getElementsByName("inlineRadioOptions");
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          localStorage.clickcount =
            Number(localStorage.clickcount) + Number(radios[i].value);
          break;
        }
      }
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("money-bani").innerHTML =
      localStorage.clickcount + " BANI";
  }
}

$("button").click(function () {
  var fired_button = $(this).val();
  if(localStorage.clickcount>= Number(fired_button)){
  if (localStorage.clickcount && localStorage.clickcount >= 0) {
    localStorage.clickcount =
      Number(localStorage.clickcount) - Number(fired_button);
    document.getElementById("money-bani").innerHTML =
      localStorage.clickcount + " BANI";

    localStorage.clickcount2 =
      Number(localStorage.clickcount2) + Number(fired_button);
    document.getElementById("money-euro").innerHTML =
      localStorage.clickcount2 + " EURO";
  }
}
else
{
alert("Baga ba bani!");
}
});

$('[data-search]').on('keyup', function() {
	var searchVal = $(this).val();
	var filterItems = $('[data-filter-item]');

	if ( searchVal != '' ) {
		filterItems.addClass('visually-hidden');
		$('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('visually-hidden');
	} else {
		filterItems.removeClass('visually-hidden');
	}
});