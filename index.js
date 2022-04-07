var col_len_num = 7;
var rows_len = 5;
var row_index = 0;
var col_index = 0;
var gameOver = false;
var arr = ["3", "*", "1", "-", "5","-","4"];
var solution = -6;

function checkRowEqualSolution(target) {
  let val;
  let value = "";

  for (var i = 0; i < col_len_num; i++) {
    _id = row_index * 10 + i;
    val = document.getElementById(_id).textContent;
    value += String(val);
    var num = parseInt(val)
    if(num <= 9 && num >=0){
      if(sessionStorage.getItem(val))
        sessionStorage.setItem(val,String(parseInt(sessionStorage.getItem(val))+1));
      else
        sessionStorage.setItem(val,1);
    }
  }

  try {
    if (eval(value) == target) return true;
  } catch (e) {
  }
  return false;
}

function checkRowForMatching() {
  let array = [...arr];
  let btn;
  let str;
  let isWinning = true;
  for(var i=0; i< col_len_num;i++) {
    _id = row_index * 10 + i;
    btn = document.getElementById(_id);
    str = String(btn.textContent);
    if(array[i]==str){
      btn.style.backgroundColor = 'green';
      array[i] = "-1";
    }
    else{
      isWinning = false;
      var index = array.findIndex((element)=>  element == str);
      if(index != -1){
        btn.style.backgroundColor = 'yellow';
        array[index] = "-1";
      }
      else{
        btn.style.backgroundColor = 'black';
      }
    }
    btn.style.color = "white";
  }
  return isWinning;
}

function update_button(element) {
  const val = element.textContent;
  const del = document.getElementById("124").textContent;
  if (val == del) {
    if (col_index == 0 && row_index == 0) {
      document.getElementById(0).innerHTML = "&nbsp;";
      return;
    }
    col_index--;
    if (col_index < 0)
       col_index = 0;

    _id = row_index * 10 + col_index;
    document.getElementById(_id).innerHTML = "&nbsp;";
  } else {
    _id = row_index * 10 + col_index;
    if (row_index == rows_len) return;

    if (col_index == col_len_num - 1) {
      document.getElementById(_id).innerHTML = val;
      if (checkRowEqualSolution(solution) == true) {
        if(checkRowForMatching()){
          gameOver = true;
          window.alert("Congratulations You Won");
          sessionStorage.setItem("wins",String(parseInt(sessionStorage.getItem("wins"))+1));
          sessionStorage.setItem("played",String(parseInt(sessionStorage.getItem("played"))+1));
          sessionStorage.setItem("averageGames",parseInt(sessionStorage.getItem("wins"))/parseInt(sessionStorage.getItem("played"))*100);
          return;
        }  
        col_index = 0;
        row_index++;
        if(row_index == rows_len){
            gameOver = true;
            window.alert("You lost.. Big Time");
            sessionStorage.setItem("played",String(parseInt(sessionStorage.getItem("played"))+1));
            sessionStorage.setItem("averageGames",(parseInt(sessionStorage.getItem("wins"))/parseInt(sessionStorage.getItem("played"))*100).toFixed(2));
        }
      } else {
        col_index = col_len_num;
      }
    } else if (col_index < col_len_num - 1) {
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
        id: 100 + i * 10 + j,
        onclick: function () {
          if (!gameOver) update_button(this);
        },
      });
      row.appendChild(btn);
    }
    document.body.appendChild(row);
  }
}

function create_num_matrix() {
  if(!sessionStorage.getItem("played"))
      sessionStorage.setItem("played",0);
  if(!sessionStorage.getItem("wins"))
      sessionStorage.setItem("wins",0);
  if(!sessionStorage.getItem("averageGames"))
      sessionStorage.setItem("averageGames",0);
        
  let random = solution;
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
function show_scores() {
  if(!document.getElementById('scores')) {
    var scores_board = Object.assign(document.createElement("div"), {
      className: "scores-div",
      id: "scores",
    });
    document.body.appendChild(scores_board);
  
  var close_btn = Object.assign(document.createElement("button"),{
    id:'close',
    onclick:"document.getElementById('scores').style.display = 'none'",
    textContent: "x"
  });
  
  close_btn.onclick = ()=>{
    var targetDiv = document.getElementById("scores");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
    }
  }
  scores_board.appendChild(close_btn);
  var title = Object.assign(document.createElement("h5"), {
    textContent: "Scores",
    className: "scores-title",
  });
  scores_board.appendChild(title);

  var stats_games = Object.assign(document.createElement("label"),{
      id: "stats_games",
      className: "stats-games"
  });
  if(!sessionStorage.getItem("played"))
      stats_games.textContent = "0 Played  0 Won  NaN%";
  else {
    stats_games.textContent = sessionStorage.getItem("played") + " Played   " +  sessionStorage.getItem("wins") + " Won   " +  sessionStorage.getItem("averageGames") + "%";

  }
  scores_board.appendChild(stats_games);
  for (var i = 0; i <= 9; i++) {
    var score_rows = Object.assign(document.createElement("div"), {
      textContent: i + ")    " + 0,
      className: "scores-ranks",
      id: "stats_num"+String(i)
    });
    scores_board.appendChild(score_rows);
  }
}
else {
  document.getElementById('scores').style.display = 'block'
  if(!sessionStorage.getItem("played") || sessionStorage.getItem("played") == "0"){
    for (var i = 0; i <= 9; i++) {
      var stats = document.getElementById('stats_num'+String(i));
      stats.textContent = "";
      stats.textContent = i + ")    " + 0
    }
  }
  else {
    for (var i = 0; i <= 9; i++) {
      var stats = document.getElementById('stats_num'+String(i));
      stats.textContent = "";
      stats.textContent = i + ")    " + sessionStorage.getItem(String(i))
    }
  }
  
  var stats_games = document.getElementById('stats_games');
  stats_games.textContent = sessionStorage.getItem("played") + " Played   " +  sessionStorage.getItem("wins") + " Won   " +  sessionStorage.getItem("averageGames") + "%";
}
}
