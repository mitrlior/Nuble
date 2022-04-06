var col_len_num = 5;
var rows_len = 2;
var row_index = 0;
var col_index = 0;

function get_random_number() {
  let random = Math.floor(Math.random()*20-10);
  //window.alert(random + " is the chosen number");
  return random;
}



function update_button(element) {
  const val = element.textContent;
  // delete option
  if (String(val) == "⌫") {
    if (col_index == 0 && row_index == 0) 
      return;
    col_index--;
    if(col_index < 0) {
      col_index = col_len_num-1;
      row_index--;
    }
    if (row_index < 0) {
      row_index = 7;
      row_index = 0;
    }
    _id = row_index * 10 + col_index;
    document.getElementById(_id).innerHTML = "&nbsp;";
  } 
  else {
    _id = row_index * 10 + col_index;
    if (row_index == rows_len) return;
    col_index++;
    document.getElementById(_id).innerHTML = val;
    if (col_index == col_len_num) {
      col_index = 0;
      row_index++;
    }
  }
}

function create_calculator() {
  var row_num = 3;
  var col_num = 5;
  var values = [
    ["1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "0"],
    ["+", "-", "/", "*", "&#9003;"],
  ];
  for (var i = 0; i < row_num; i++) {
    var row = Object.assign(document.createElement("div"), {
      className: "num-row",
    });
    for (var j = 0; j < col_num; j++) {
      var btn = Object.assign(document.createElement("button"), {
        className: "num-row btn-calc",
        innerHTML: values[i][j],
        onclick: function () {
          update_button(this);
        },
      });
      row.appendChild(btn);
    }
    document.body.appendChild(row);
  }
}

function create_num_matrix() {
  let random = get_random_number();
  var matrix = Object.assign(document.createElement("div"), {
    className: "box rows",
  });
  for (var i = 0; i < rows_len; i++) {
    var row = Object.assign(document.createElement("div"), {
      class: "box rows row",
    });
    for (var j = 0; j < col_len_num; j++) {
      var _id = i * 10 + j;
      var btn = Object.assign(document.createElement("button"), {
        className: "box btn-num",
        innerHTML: "&nbsp;",
        id: _id,
      });
      row.appendChild(btn);
    }
    _id = i * 10 + j + 1;
    var eq_btn = Object.assign(document.createElement("button"), {
      className: "box btn-eq",
      innerHTML: "=",
      id: _id,
    });
    row.appendChild(eq_btn);
    _id++;
    var res_btn = Object.assign(document.createElement("button"), {
      className: "box btn-res",
      innerHTML: random,
      id: _id,
    });
    row.appendChild(res_btn);
    matrix.appendChild(row);
  }
  document.getElementById("box").appendChild(matrix);
}
