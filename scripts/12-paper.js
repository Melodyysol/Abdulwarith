let score = JSON.parse(localStorage.getItem
('score'))|| {
    wins: 0,
    losses: 0,
    ties: 0
  };
  updateScoreElement();
  let isAutoPlaying = false;
  let intervalId;
  function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove)
      },1000);
      isAutoPlaying = true
    }else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }
  document.querySelector('.js-auto-play-button')
    .addEventListener('click', autoPlay)
  function resetButton(){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
  }
  function ResetButtonPopUp() {
    document.querySelector('.js-reset-pop-up')
    .innerHTML = `Are you sure you want to reset the score?
     <button class="js-yes">Yes</button><button class="js-no">No</button>
    `;

    if(document.querySelector('.js-yes')
        .addEventListener('click', () => {
          resetButton()
        document.querySelector('.js-reset-pop-up')
          .innerHTML = '';
        })
    ){
      
    }else if(document.querySelector('.js-no')
        .addEventListener('click',()=>{
          document.querySelector('.js-reset-pop-up')
        .innerHTML = '';
        })
    ){
      
    }
  }

  document.querySelector('.js-reset-score-button')
    .addEventListener('click',ResetButtonPopUp);

  document.querySelector('.js-rock-button')
    .addEventListener('click', ()=>{
      playGame('rock')
    })
  document.querySelector('.js-paper-button')
    .addEventListener('click', ()=>{
      playGame('paper')
    });
  document.querySelector('.js-scissors-button')
    .addEventListener('click', ()=>{
      playGame('scissors')
    });

    document.body.addEventListener('keydown', (event) => {
      if(event.key === 'r'){
        playGame('rock')
      }else if(event.key === 'p'){
        playGame('paper')
      }else if(event.key === 's'){
        playGame('scissors')
      }else if(event.key === 'Backspace'){
        ResetButtonPopUp()
      }else if(event.key === 'Enter'){
        autoPlay()
      }
    })

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie'
    }else if(computerMove === 'paper'){
      result = 'You Win'
    }
    else if(computerMove === 'scissors'){
      result = 'You Lose'
    }
  }
  else  if(playerMove === 'paper'){
    if(computerMove === 'paper'){
      result = 'Tie'
    }else if(computerMove === 'rock'){
      result = 'You Win'
    }
    else if(computerMove === 'scissors'){
      result = 'You Lose'
    }
  }
  else  if(playerMove === 'scissors'){
    if(computerMove === 'scissors'){
      result = 'Tie'
    }else if(computerMove === 'paper'){
      result = 'You Win'
    }
    else if(computerMove === 'rock'){
      result = 'You Lose'
    }
  }
  if(result === 'You Win'){
    score.wins+=1
  }else if(result === 'You Lose'){
    score.losses+=1
  }else if(result === 'Tie'){
    score.ties+=1
  }

  localStorage.setItem('score', JSON.stringify(score))

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = `${result}.`
  document.querySelector('.js-moves').innerHTML = `
  You <img class="move-icon" src="images/${playerMove}-emoji.png">
<img class="move-icon" src="images/${computerMove}-emoji.png"> Computer`
}


function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber>= 0 && randomNumber < 1/3){
    computerMove = 'rock'
  }else if(randomNumber>= 1/3 && randomNumber < 2/3){
    computerMove = 'paper'
  } else if(randomNumber>= 2/3 && randomNumber < 1){
    computerMove = 'scissors'
  }
  return computerMove;
}
