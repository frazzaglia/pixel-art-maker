var pixel_table = $("#pixel_canvas");



function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function makeGrid() {

  for(let i = 0; i < 5; i++) {
    const row = pixel_table.append("<tr></tr>");
    for(let j = 0; j < 5; j++) {
      const cell = $("tr")
        .last()
        .append("<td></td>");
    }
  }

  // Your code goes here!

  // $("td").click(function() {
  //   //var colorOne = $("#colorPickerLeft").val();
  //   $(this).css("background-color", "red");
  // });

  $("td").contextmenu(function() {
    event.preventDefault();
    // var colorTwo = $("#colorPickerRight").val();
    $(this).css("background-color", "blue");
  });

  $("td").dblclick(function() {
    $(this).css("background-color", random_rgba());
  });
//
//   $('td').scroll(function() {
//     debugger
//     didScroll = true;
// });


  $("td").mousedown(function(e) {
    switch(e.which) {
      case 1:
        //left Click
        console.log("left");
        $(this).css("background-color", "red");
        break;
      case 2:
        //middle Click
        console.log("middle");
        $(this).css("background-color", "rgb(255, 255, 255)");
        break;
      // case 3:
      //   //right Click
      //   console.log("right");
      //   e.preventDefault();
      //   $(this).css("background-color", "blue");
      //   break;
    }
    return true; // to allow the browser to know that we handled it.
  });

}

$("document").ready(function() {
  makeGrid();
});
