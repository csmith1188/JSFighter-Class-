const START_HP = 20;
const START_SP = 10;
const DEFAULT_ATK = 5;
const DEFAULT_DEF = 5;
const DEFAULT_TEK = 5;

//sets constants names
const P0NAME = 'Crash'
const P0CHARA = 'crashr'
const P1NAME = 'Sam'
const P1CHARA = 'saml'

let playerTurn = false;
let logging = true;

let Player0;
let Player1;

//varible for finding % of players HP used for the HealthBar
let player0PercentHP;
let player1PercentHP;
let player0PercentSP;
let player1PercentSP;

// declared variables for the boxes
let gameBox;
let headerBox;
let graphicsBox;
let barsBox;
let controlsBox;
let outputBox;

class Fighter {
  constructor(name, charaName) {
    //'contructor' is in all JS classes
    // It gets run immediately when a new object is created from a class

    // Set all of our default values for this new fighter here
    this.name = name;
    this.hp = START_HP;
    this.sp = START_SP;
    this.atk = DEFAULT_ATK;
    this.def = DEFAULT_DEF;
    this.tek = DEFAULT_TEK;
    this.charaName = charaName;
  }

  //this logs who attacked who

  attack(target) {
    console.log(this.name + ' attacked ' + target.name);
    let randomDamage = Math.ceil((Math.random() * this.atk))
    console.log(randomDamage);
    outputBox.innerHTML += '<br>' + this.name + " dealt " + '<span class="damageColor">' +  randomDamage + '</span>' + " damage.<br>"
    if (koCheck(target, randomDamage)) {

    } else {

    }
    endTurn()
  updateBars()
  hitGraphics()
  }

  single(target) {
    this.attack(target);


  }

  double(target) {
    this.attack(target);
      if (this.sp >= 5) {
      this.sp = this.sp - 5
      outputBox.innerHTML += '<br><span class="abilityColor"> Double Kick </span><br>'
      this.attack(target);
    }
  }


  //this logs that they recovered
  recover() {
    console.log('Recovered!');
    if (this.hp < START_HP) {
      this.hp = this.hp + 2
      outputBox.innerHTML += '<br>' + this.name + ' has recovered <span class="recoverColor">2</span> HP <br>'
  } else {
    if (0 == START_HP - this.hp){
    outputBox.innerHTML += '<br> You are at full HP <br>'
  } else{
    this.hp = START_HP
  }
   }
   endTurn()
updateBars()
  }
}


function startup() {
  Player0 = new Fighter(P0NAME, P0CHARA);
  Player1 = new Fighter(P1NAME, P1CHARA);

  //this makes a shortcut for 'document.getElementById'
  gameBox = document.getElementById('gameBox');
  headerBox = document.getElementById('headerBox');
  graphicsBox = document.getElementById('graphicsBox');
  barsBox = document.getElementById('barsBox');
  controlsBox = document.getElementById('controlsBox');
  outputBox = document.getElementById('outputBox');


  //this shows the fighter images in the graphics box
  graphicsBox.innerHTML = '<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_idle.png" alt="' + Player0.name + '" class="fighterIMG">'
  graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_idle.png" alt="' + Player1.name + '" class="fighterIMG">'


  console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)
  console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)

  showControls() //runs the showControls() function
  updateBars() //runs the updateBars() function
}

function showControls() {
  //checks to see which players turn it is and show the apropriate controls
  if (playerTurn) {
    //show buttons for player1 and overwrites player0's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player1.single(Player0)">Single Attack!</button>'
    controlsBox.innerHTML += '<br><button type="button" name="attack" onclick="Player1.double(Player0)">Double Attack!</button><br>'
    controlsBox.innerHTML += '<br><button type="button" name="recover" onclick="Player1.recover(Player1)">Recover!</button><br>'

  } else {
    //show buttons for player0 and overwrites player1's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player0.single(Player1)">Single Attack!</button>'
    controlsBox.innerHTML += '<br><button type="button" name="attack" onclick="Player0.double(Player1)">Double Attack!</button><br>'
    controlsBox.innerHTML += '<br><button type="button" name="recover" onclick="Player0.recover(Player0)">Recover!</button><br>'
  }
}


//checks the target's HP is less than or equal to 0, Then retuns true or false.
function koCheck(target, amount) {
  target.hp = target.hp - amount;
  if (target.hp <= 0) {
    return true;
  } else {
    return false;
  }
}


function updateBars() {
  //calculates the percent of HP
  player0PercentHP = (Player0.hp / START_HP) * 100
  player1PercentHP = (Player1.hp / START_HP) * 100
  player0PercentSP = (Player0.sp / START_SP) * 100
  player1PercentSP = (Player1.sp / START_SP) * 100

  //Makes sure Player0's health is not greater than 100% or less than 0%
  if (player0PercentHP <= 0) {
    player0PercentHP = 0
  } else if (player0PercentHP > 100) {
    player0PercentHP = 100
  } else {
    player0PercentHP = player0PercentHP
  }

  //Makes sure Player1's health is not greater than 100% or less than 0%
  if (player1PercentHP <= 0) {
    player1PercentHP = 0
  } else if (player1PercentHP > 100) {
    player1PercentHP = 100
  } else {
    player1PercentHP = player1PercentHP
  }

  //Makes sure Player0's SP is not greater than 100% or less than 0%
  if (player0PercentSP <= 0) {
    player0PercentSP = 0
  } else if (player0PercentSP > 100) {
    player0PercentSP = 100
  } else {
    player0PercentSP = player0PercentSP
  }

  //Makes sure Player1's SP is not greater than 100% or less than 0%
  if (player1PercentSP <= 0) {
    player1PercentSP = 0
  } else if (player1PercentSP > 100) {
    player1PercentSP = 100
  } else {
    player1PercentSP = player1PercentSP
  }
  barsBox.innerHTML = ''
  barsBox.innerHTML += 'P0<div class="hpBar"><div style="width:' + player0PercentHP + '%; height: 100%;" id="p0HPfill" class="HPfill"></div></div>'
  barsBox.innerHTML += '<div class="spBar"><div style="width:' + player0PercentSP + '%; height: 100%;" id="p0SPfill" class="SPfill"></div></div>'
  barsBox.innerHTML += 'P1<div class="hpBar"><div style="width:' + player1PercentHP + '%; height: 100%;" id="p1HPfill" class="HPfill"></div></div>'
  barsBox.innerHTML += '<div class="spBar"><div style="width:' + player1PercentSP + '%; height: 100%;" id="p1SPfill" class="SPfill"></div></div>'
}

// EndTurn code
function endTurn() {
  playerTurn = !playerTurn
  if (koCheck(Player0, 0) || koCheck(Player1, 0)){
    hideControls();
  } else {
    showControls()
  }
}

function hideControls() {
  controlsBox.innerHTML = "";
}

function hitGraphics() {
  if (playerTurn) {
    graphicsBox.innerHTML = '<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_attack.png" alt="' + Player0.name + '" class="fighterIMG">'
    graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_hit.png" alt="' + Player1.name + '" class="fighterIMG">'
  } else {
    graphicsBox.innerHTML = '<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_hit.png" alt="' + Player0.name + '" class="fighterIMG">'
    graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_attack.png" alt="' + Player1.name + '" class="fighterIMG">'
  }

  }
}

function hideControls() {
  controlsBox.innerHTML = "";

}




/*

MHW = 'delicious'

MHWoutput > MHWinput

*/
