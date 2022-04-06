var col_len_num = 5;
var rows_len = 2;
var row_index = 0;
var col_index = 0;
var isWinner = false;
var arr = ['3','*','1','-','9'];
var solution = -6;

// function get_random_number() {
//   var count = 0;
//   var str;
//   var string = "";
//   var value;
//   var random;
//   while(count < col_len_num) {
//     value = Math.floor(Math.random()*14);
//     if(value == 10) str = '+';
//     else if(value == 11) str = '-';
//     else if(value == 12) str = '*';
//     else if(value == 13) str = '/';
//     else str = String(value);

//     if(count == col_len_num-1 && (str == '*' || str == '/' || str == '+' || str == '-'))
//       continue;
//     if(count == 0 && (str == '*' || str == '/'))
//       continue;
//     if(count > 0 && arr[count-1] == count && (str == '*' || str == '/' || str == '+' || str == '-'))
//       continue;
//     arr[count] = str;
//     string+=str;
//     count++;
//   }
//     random = Math.floor(eval(string));
//     console.log(random);
  
//   return random;
// }


function checkRowEqualSolution(target) {
  let val;
  let value = "";
  
  for(var i = 0; i< col_len_num; i++) {
    _id = row_index * 10 + i;
    val = document.getElementById(_id).textContent;
    console.log(val)
    value += String(val);
  }
  
  try {
    //console.log(eval(value) + " " + value + " " + target)
    //console.log("what")
    if (eval(value) == target)
      return true;
  }
  catch(e){console.log(e)}
  return false;
}



function update_button(element) {
  const val = element.textContent;
  //console.log(col_index + " " + row_index)
  if (String(val) == "⌫") {
    if (col_index == 0 && row_index == 0) 
      return;
    if(col_index == 0)
    return;
    col_index--;

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
    
    
    
    if (col_index == col_len_num -1) {
      document.getElementById(_id).innerHTML = val;
      if(checkRowEqualSolution(solution) == true) {
        col_index = 0;
        row_index++;
      }
      else {
        col_index = col_len_num;
      }
    }
    else if(col_index < col_len_num -1) {
      document.getElementById(_id).innerHTML = val;
      col_index++;
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
          if(!isWinner)
            update_button(this);
        },
      });
      row.appendChild(btn);
    }
    document.body.appendChild(row);
  }
}

function create_num_matrix() {
  let random = solution;
  //let random = Math.floor(Math.random()*20-10);
  //window.alert(random + " is the chosen number");
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
