var map = [];
var count = 1
var cell = document.getElementsByClassName("unchecked");
var flagging = false;
var empty = [];
var cleared = 0;
var flagTotal = 0;
var flags = [];
var toDo = [];
var completed = [];
var mineTotal = 0;
var mines = [];

window.onload = function() {
  document.getElementById("minesLeft").innerText = mineTotal;
  var td = document.getElementsByTagName("td");
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", mine);
  }
  map = createArray(1,9,9);
  for(i=0;i<mineTotal;i++) {
    mineGen(); 
  }
  document.querySelectorAll("td").forEach(e => {
    let row = e.getAttribute("row");
    let column = e.getAttribute("column");
    let mines = getSurrounding(e).toString();
    if (map[row][column] != "*") {
      map[row][column] = mines; 
    }
  });
  
  let tmp = []
  empty.forEach(e => {
    let row = e[0];
    let col = e[1];
    if (map[row][col] == "*") {
      tmp.push(e);
    }
  });
  for(i = 0; i < tmp.length; i++) {
    let elem = tmp[i];
    let index = empty.indexOf(elem);
    empty.splice(index, 1);
  }

  startArea();
}

function mine(evt) {
  let elem = evt.currentTarget;
  let row = elem.getAttribute("row"); 
  let column = elem.getAttribute("column");
  let cell = map[row][column];
  if (flagging == true) {
    flag(elem);
  }
  else {
    if (elem.innerText != "❌") {
      if(elem.className == "unchecked" && cell != "*" && cell != "0") {
        elem.className = "empty";
        elem.innerText = map[row][column];
        cleared += 1;
      } 
      else if (cell == "*") {
        // window.alert("you blew up!");
        gameOver();
      }
      else if (cell == "0") {
        startArea(elem);
      }
    }
  }
}

function createArray(num, height, width) {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    var currLetter;
    var array = [];    
    for (var i = 0; i < height; i++) { 
      array.push([]);      
      currLetter = letters[i];
      for (var j = 0; j < width; j++) {  
         array[i].push(currLetter + (num + j));      
      }    
    }    
    return array;  
}

function mineGen() {
  let row = Math.floor(Math.random() * 9);
  let column = Math.floor(Math.random() * 9);
  if(map[row][column] == "*") {
    mineGen();
  }
  else {
     map[row][column] = "*";
    mines.push(row.toString() + column.toString());
  }
}

function getSurrounding(elem) {
  let row = elem.getAttribute("row");
  let column = elem.getAttribute("column");
  let mineCount = 0;
  let surroundings = [];

  let tl = (parseInt(row, 10) - 1).toString() + (parseInt(column, 10) - 1);
  let tm = (parseInt(row, 10) - 1).toString() + column;
  let tr = (parseInt(row, 10) - 1).toString() + (parseInt(column, 10) + 1);
  let l = row + (parseInt(column, 10) - 1).toString();
  let r = row + (parseInt(column, 10) + 1).toString();
  let bl = (parseInt(row, 10) + 1).toString() + (parseInt(column, 10) - 1);
  let bm = (parseInt(row, 10) + 1).toString() + column;
  let br = (parseInt(row, 10) + 1).toString() + (parseInt(column, 10) + 1);
  
  surroundings.push(tl);
  surroundings.push(tm);
  surroundings.push(tr);
  surroundings.push(l);
  surroundings.push(r);
  surroundings.push(bl);
  surroundings.push(bm);
  surroundings.push(br);

  for(i = 0; i < surroundings.length; i++) {
    if (surroundings[i].includes("-") || surroundings[i].includes("9")) {
      continue;
    }
    else {
      let sRow = surroundings[i].charAt(0);
      let sColumn = surroundings[i].charAt(1);
      if(map[sRow][sColumn] == "*") {
        mineCount += 1;
      } 
    }  
  }
  if (mineCount == 0) {
    empty.push(elem.id);
  }
  return mineCount;
}

function flagStyle() {
  let button = document.getElementById("flag");
  
  if (button.className == "unselected") {
    button.className = "selected";
    flagging = true;
  }
  else {
    button.className = "unselected";
    flagging = false;
  }
}

function flag(elem) {
  if (elem.innerText == "") {
    flags.push(elem.id);
      if (flagTotal >= mineTotal) {
        window.alert("you put too many flags");
      }
      else {
        if (arraysEqual(flags, mines)) {
          alert("You Win");
          gameOver();
        }
        elem.innerText = "❌";
        flagTotal += 1; 
        document.getElementById("minesLeft").innerText = mineTotal - flagTotal;
      } 
  }
  else if(elem.innerText == "❌") {
    elem.innerText = "";
    flagTotal -= 1;
    let index = flags.indexOf(elem.id);
    flags.splice(index, 1);
  }
}

function startArea(elem) {
  var rnd = Math.floor(Math.random() * empty.length);
  if (empty.length != 0) {
    if (elem == undefined) {
      elem = document.getElementById(empty[rnd]);
    }
    let row = elem.getAttribute("row"); 
    let column = elem.getAttribute("column");
    if(map[row][column] == "*") {
      startArea();
    }
    else {
      elem.className = "empty";
      elem.innerText = " ";
      cleared += 1; 
    }

    let surroundings = [];

    let tl = (parseInt(row, 10) - 1).toString() + (parseInt(column, 10) - 1);
    let tm = (parseInt(row, 10) - 1).toString() + column;
    let tr = (parseInt(row, 10) - 1).toString() + (parseInt(column, 10) + 1);
    let l = row + (parseInt(column, 10) - 1).toString();
    let r = row + (parseInt(column, 10) + 1).toString();
    let bl = (parseInt(row, 10) + 1).toString() + (parseInt(column, 10) - 1);
    let bm = (parseInt(row, 10) + 1).toString() + column;
    let br = (parseInt(row, 10) + 1).toString() + (parseInt(column, 10) + 1);
    
    surroundings.push(tl);
    surroundings.push(tm);
    surroundings.push(tr);
    surroundings.push(l);
    surroundings.push(r);
    surroundings.push(bl);
    surroundings.push(bm);
    surroundings.push(br);

    for(i = 0; i < surroundings.length; i++) {
      if (surroundings[i].includes("-") || surroundings[i].includes("9")) {
        continue;
      }
      else {
        let sRow = surroundings[i].charAt(0);
        let sColumn = surroundings[i].charAt(1);
        document.getElementById(surroundings[i]).className = "empty";
        if (map[sRow][sColumn] != 0) {
          document.getElementById(surroundings[i]).innerText = map[sRow][sColumn]; 
        }
        else {
          document.getElementById(surroundings[i]).innerText = " "
        }
        cleared += 1;
        if (!completed.includes(elem) && map[sRow][sColumn] == 0) {
          toDo.push(document.getElementById(sRow+sColumn));
        }
      }  
    }
    completed.push(elem);
    if(toDo.length != 0) {
      startArea(toDo.pop());
    }
  }
}

function newGame() {
  document.getElementById("minesLeft").innerText = mineTotal;
  map = []
  count = 1
  cell = document.getElementsByClassName("unchecked");
  if (flagging == true) {
   flagStyle() 
  }
  empty = [];
  cleared = 0;
  flagTotal = 0;
  flags = [];
  toDo = [];
  completed = [];
  mines = [];
  
  document.getElementById("newGame").setAttribute("class", "hidden");
  
  let td = document.querySelectorAll("td").forEach(e => {
    e.setAttribute("class", "unchecked");
    e.setAttribute("unchecked", "true");
    e.innerText = "";
    e.style = null;
  })
  
  map = createArray(1,9,9);
  for(i=0;i<mineTotal;i++) {
    mineGen(); 
  }
  document.querySelectorAll("td").forEach(e => {
    let row = e.getAttribute("row");
    let column = e.getAttribute("column");
    let mines = getSurrounding(e);
    if (map[row][column] != "*") {
      map[row][column] = mines; 
    }
  });
  
  let tmp = []
  empty.forEach(e => {
    let row = e[0];
    let col = e[1];
    if (map[row][col] == "*") {
      tmp.push(e);
    }
  });
  for(i = 0; i < tmp.length; i++) {
    let elem = tmp[i];
    let index = empty.indexOf(elem);
    empty.splice(index, 1);
  }

  startArea();
}

function gameOver() {
  document.getElementById("newGame").setAttribute("class", "shown");

  document.querySelectorAll("td").forEach(e => {
    let row = e.getAttribute("row");
    let col = e.getAttribute("column");
    let cell = map[row][col];

    if(cell == "*" && e.innerText != "❌") {
      // e.setAttribute("class", "mine");
      e.style.backgroundColor = "salmon";
      e.innerText = "*";
    }
    else if (cell != "*" && e.innerText == "❌") {
      // e.setAttribute("class", "safe");
      e.style.backgroundColor = "lightgreen";
      e.innerText = "✅";
    }
    else if(cell == "*" && e.innerText == "❌") {
      e.style.backgroundColor = "salmon";
    }
    else {
      e.setAttribute("class", "empty");
      if (map[row][col] != 0) {
       e.innerText = map[row][col]; 
      }
      else {
        e.innerText = " "
      }
    }
  });
}

function arraysEqual(a, b) {
  // if (a === b) return true;
  // if (a == null || b == null) return false;
  // if (a.length !== b.length) return false;

  // for (var i = 0; i < a.length; ++i) {
  //   if (a[i] !== b[i]) return false;
  // }
  // return true;
  if (a.every(item => b.includes(item)) && b.every(item => a.includes(item))) {
    return true;
  }
}

function start() {
  if (document.querySelector('input[name="difficulty"]:checked') != null) {
    let mineSelection = document.querySelector('input[name="difficulty"]:checked').getAttribute("mines");
    mineTotal = parseInt(mineSelection, 10);
    newGame();
    document.getElementById("start").setAttribute("class", "hidden");
    document.getElementById("game").setAttribute("class", "shown");
  }
  else {
    alert("please select a difficulty");
  }
}

function difficulty() {
  document.getElementById("start").setAttribute("class", "shown");
  document.getElementById("game").setAttribute("class", "hidden");
  document.getElementById("resume").setAttribute("class", "shown");
}

function resume() {
  document.getElementById("start").setAttribute("class", "hidden");
  document.getElementById("game").setAttribute("class", "shown");
  document.getElementById("resume").setAttribute("class", "hidden");
}