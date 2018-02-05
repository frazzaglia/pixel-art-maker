let pixel_table = $("#pixel_canvas");
const maxTableSize = 50;
let isMouseLeftPressed = false;
let isMouseMiddlePressed = false;

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

function random_number(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function random_fill() {
  const rowsNumber = pixel_table[0].rows.length;
  const columnsNumber = pixel_table[0].rows[0].cells.length;
  let random_cells_to_fill = (rowsNumber*columnsNumber)/2;
  for (let i = 0; i < random_cells_to_fill; i++) {
    let random_row_number = random_number(0, rowsNumber);
    let random_col_number = random_number(0, columnsNumber);
    pixel_table.children()[random_row_number].cells[random_col_number].style.backgroundColor = random_rgba();
  }
}

function fillCellWithColor(element, color) {
  element.css("background-color", color);
}

function trimToLimit(size) {
  if(size > maxTableSize) {
    return maxTableSize;
  }
  return size;
}

function makeGrid() {
  //Limit to maxTableSize (50) rows and columns number.
  $("#table_height").val(trimToLimit($("#table_height").val()));
  $("#table_width").val(trimToLimit($("#table_width").val()));
  const table_height = $("#table_height").val();
  const table_width = $("#table_width").val();
  for (let i = 0; i < table_height; i++) {
    const row = pixel_table.append("<tr></tr>");
    for (let j = 0; j < table_width; j++) {
      const cell = $("tr")
        .last()
        .append("<td></td>");
    }
  }

  $("td").contextmenu(function() {
    event.preventDefault();
    let colorRight = $("#colorPickerRight").val();
    fillCellWithColor($(this), colorRight);
    isMouseRightPressed = true;
  });

  $("td").dblclick(function() {
    fillCellWithColor($(this), random_rgba());
  });

  $("td").mouseover(function() {
    if(isMouseLeftPressed) {
      let colorLeft = $("#colorPickerLeft").val();
      fillCellWithColor($(this), colorLeft);
    } else if(isMouseRightPressed) {
      let colorRight = $("#colorPickerRight").val();
      fillCellWithColor($(this), colorRight);
    } else if(isMouseMiddlePressed) {
      fillCellWithColor($(this), 'white');
    }
  });

  $("td").mouseup(function() {
    isMouseLeftPressed = false;
    isMouseRightPressed = false;
    isMouseMiddlePressed = false;
  });

  $("td").mousedown(function(e) {
    switch (e.which) {
      case 1:
        // //left Click
        let colorLeft = $("#colorPickerLeft").val();
        fillCellWithColor($(this), colorLeft);
        isMouseLeftPressed = true;
        break;
      case 2:
        //middle Click
        fillCellWithColor($(this), 'white');
        isMouseMiddlePressed = true;
        break;
    }
    return true;
  });
}

$("document").ready(function() {
  makeGrid();

  $("#submit").click(function() {
    event.preventDefault();
    clearGrid();
    makeGrid();
  });

  $("#reset").click(function() {
    event.preventDefault();
    resetGrid();
  });

  $("#random_fill").click(function() {
    event.preventDefault();
    random_fill();
  });
});
