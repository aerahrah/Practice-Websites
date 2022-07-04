//global variables
let playerScore=0;
let computerScore= 0;
let battleResult;
let temp_player = "fa-poop";
let temp_computer = "fa-robot";
const pick = ["ROCK","PAPER","SCISSORS"];

//Icons
const icon_rock = "fa-hand-back-fist";
const icon_paper = "fa-hand";
const icon_scissor = "fa-hand-scissors";

//Colors
const red_color ="#f03e3e";
const green_color ="#37b24d";
const blue_color ="#1c7ed6";
const bg_color ="#212529";
//Query selectors
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const design = document.querySelector(".design");
const score_computer = document.getElementById('scoreBoard_computer');
const score_player = document.getElementById('scoreBoard_player');
const battle_result = document.getElementById('battleResults');
const icon_player =document.querySelector(".icon-player");
const icon_computer =document.querySelector(".icon-computer");
const item_player = document.querySelectorAll(".item-player");
const item_computer = document.querySelectorAll(".item-computer");
const final_result = document.querySelector(".finalResult");
const play_again = document.querySelector(".play-again");

//DOMS DESIGN
let add_player =(choice,icon, color)=>{
    add_item_player();
    add_class_player(icon);
    add_color(color,".icon-player",".player");
    game(choice);
};
let add_computer = (f_choice, icon, color) =>{
    add_class_computer(icon);
    add_color(color,".icon-computer",".computer");
    add_item_computer(f_choice);
};
let add_item_player = () =>{
    item_player.forEach(panel=>{
        panel.addEventListener('click',()=>{
            remove_item_player("actived");
            panel.classList.add('actived');     
        })
    }) 
};
let design_merge=(players, battleResult)=>{
    score_computer.textContent=computerScore;
    score_player.textContent=playerScore;
    document.querySelector(players).style.transform= "scale(1.16)";
    document.querySelector(players).style.transition= ".2s ease-in";
    battle_result.textContent=battleResult;
};
let add_item_computer = (choice) =>{
        let queryStr = document.querySelector(".item-computer."+choice); 
        if(choice="rock"){
            remove_item_comp("actived");
            queryStr.classList.add('actived');  
        }
        else if(choice="paper"){
            remove_item_comp("actived");
            queryStr.classList.add('actived');  
        }
        else if(choice="scissor"){
            remove_item_comp("actived");
            queryStr.classList.add('actived');  
        }
};
let add_class_player =(player_pick) =>{
    remove_class(temp_player, temp_computer);
    temp_player=player_pick;
    icon_player.classList.add(player_pick);
};

let add_class_computer =(computer_pick) =>{
    temp_computer=computer_pick;
    icon_computer.classList.add(computer_pick);
};

let add_color= (color,icon_player,player) =>{
    document.querySelector(icon_player).style.cssText= "color:"+color+";";
    document.querySelector(player).style.cssText= "color:"+color+";"+" border:4px solid "+color+";";
};

let remove_class= (player, computer) =>{
    icon_player.classList.remove(player);
    icon_computer.classList.remove(computer);
};
let remove_item_player = (p_choice) =>{
    item_player.forEach(panel =>{
        panel.classList.remove(p_choice);
    })
};
let remove_item_comp = (p_choice) =>{
    item_computer.forEach(panel =>{
        panel.classList.remove(p_choice);
    })
};

// LOGIC OF THE GAME

let computer_choice =()=>{
    let choice = Math.floor(Math.random() * 3);
    switch(choice){
        case 0: {
            add_computer("rock", icon_rock, red_color);
            return computerSelection=pick[0];
        }
        case 1: {
            add_computer("paper", icon_paper, green_color);
            return computerSelection=pick[1];
        }
        case 2: {
            add_computer("scissor", icon_scissor, blue_color);
            return computerSelection=pick[2];
        }
    }
};
let playRound=(playerSelection, computerSelection)=>{
    if (playerSelection === computerSelection) {
        battleResult = "tie";
        score_computer.textContent=computerScore;
        score_player.textContent=playerScore;
        document.querySelector(".player").style.transform= "scale(1.16)";
        document.querySelector(".player").style.transition= ".2s ease-in";
        document.querySelector(".computer").style.transform= "scale(1.16)";
        document.querySelector(".computer").style.transition= ".2s ease-in";
        battle_result.textContent=battleResult;
      }
      if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK')
      ) {
        battleResult = "Player won the round";
        playerScore++;
        design_merge(".player", battleResult);
      }
      if (
        (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
        (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
        (computerSelection === 'PAPER' && playerSelection === 'ROCK')
      ) {
        battleResult = "Computer won the round";
        computerScore++;
        design_merge(".computer", battleResult);
      }
};

let game = (choice)=>{
    playRound(choice, computer_choice());
    if(playerScore == 5){
        design.style.display="flex";
        final_result.textContent="You Won!!";
        battle_result.textContent="you won the game!!";
    }else if(computerScore == 5){
        design.style.display="flex";
        final_result.textContent="You lost!!";
        battle_result.textContent="computer won the game!!";
    }else{
        console.log( "tie whole game");
    }
};

rock.addEventListener("click", ()=>{
    add_player(pick[0],icon_rock,red_color);
});
paper.addEventListener("click", ()=>{
    add_player(pick[1],icon_paper,green_color);
});
scissor.addEventListener("click", ()=>{
    add_player(pick[2],icon_scissor,blue_color);
});
play_again.addEventListener("click", ()=>{
    playerScore=0;
    computerScore=0;
    score_computer.textContent="score";
    score_player.textContent="score";
    design.style.display="none";
    battle_result.textContent="result";
    remove_item_comp("actived");
    remove_item_player("actived");
    document.querySelector(".icon-player").style.cssText= "color: "+ bg_color+";";
    document.querySelector(".player").style.cssText= "color: "+bg_color+";"+" border:none;";
    document.querySelector(".icon-computer").style.cssText= "color: "+ bg_color+";";
    document.querySelector(".computer").style.cssText= "color: "+bg_color+";"+" border:none;";
});