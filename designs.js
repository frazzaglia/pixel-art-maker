var pixel_table = $("#pixel_canvas");


function clearGrid() {
  pixel_table.children().remove();
}

function resetGrid() {
  pixel_table.children().remove();
  $("#table_height").val(10);
  $("#table_width").val(10);
  makeGrid();
}

function random_rgba() {
  let o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

function makeGrid() {
  const table_height = $("#table_height").val();
  const table_width = $("#table_width").val();

  console.log(table_height);
  console.log(table_width);
  for(let i = 0; i < table_height; i++) {
    const row = pixel_table.append("<tr></tr>");
    for(let j = 0; j < table_width; j++) {
      const cell = $("tr")
        .last()
        .append("<td></td>");
    }
  }

  // $("td").click(function() {
  //   //var colorOne = $("#colorPickerLeft").val();
  //   $(this).css("background-color", "red");
  // });

  $("td").contextmenu(function() {
    event.preventDefault();
    let colorRight = $("#colorPickerRight").val();
    $(this).css("background-color", colorRight);
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
        let colorLeft = $("#colorPickerLeft").val();
        $(this).css("background-color", colorLeft);
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

  $("#submit").click(function() {
    event.preventDefault();
    clearGrid();
    makeGrid();
  });
});
