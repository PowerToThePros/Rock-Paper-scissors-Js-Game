
      let score = { /*a object to keep track of the score*/
        wins: 0,
        losses: 0,
        ties: 0
      };

      score = JSON.parse(localStorage.getItem('Score')) || score; // the default value score is cleaner then the line below
      //score = !savedScore ? score : savedScore;

      updateResultElement('Make a move');
      updateScoreElement();

      let isAutoPlaying = false;

      let modal = document.querySelector('.js-modal');

      // event listeners insted of onclick
                                                                          // common mistake is that you put only playGame('rock') in here but that would call a function
      document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('rock')});
      document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('paper')});
      document.querySelector('.js-scissors-button').addEventListener('click', () => {playGame('scissors')});
      document.querySelector('.js-auto-play-button').addEventListener('click', () => {autoPlay();});
      document.querySelector('.js-reset-score-button').addEventListener('click', () => {resetScore();});

      // add event listener has a parameter that contains the event
      document.body.addEventListener('keydown', (event)=>{

        if(modal.classList.contains('visible')) return;

        if(event.key === 'r')
        {
          playGame('rock');
        }
        else if(event.key === 'p')
        {
          playGame('paper');
        }
        else if(event.key === 's')
        {
          playGame('scissors');
        }
        else if(event.key === 'a')
        {
          autoPlay();
        }
        else if(event.key === 'Backspace')
        {
          resetScore();
        }

      });

      function playGame(move)
      {
        const computerMove = pickComputerMove();
        let result = '';

        if(move === 'rock')
        {
          if(computerMove === 'rock')
          {
            result = 'Tie';
          }
          else if(computerMove === 'paper')
          {
            result = 'Lose';
          }
          else
          {
            result = 'Win';
          }
        }       
        else if(move === 'paper')
        {
          if(computerMove === 'rock')
          {
            result = 'Win';
          }
          else if(computerMove === 'paper')
          {
            result = 'Tie';
          }
          else
          {
            result = 'Lose';
          }
        }
        else if(move === 'scissors')
        {
          if(computerMove === 'Rock')
          {
            result = 'Lose';
          }
          else if(computerMove === 'paper')
          {
            result = 'Win';
          }
          else
          {
            result = 'Tie';
          }
        }
        else
        {
          alert('error');
          return;
        }
        
        if(result === 'Win')
        {
          score.wins++;
        }
        else if(result === 'Lose')
        {
          score.losses++;
        }
        else if(result === 'Tie')
        {
          score.ties++;
        }

        localStorage.setItem('Score', JSON.stringify(score)); /*local storage keeps data saved even when refreshing the page, but it only saves strings, so we convert it into a json string*/

        updateResultElement(result);
        updateScoreElement();

        document.querySelector('.js-moves').innerHTML = `you picked <img class="move-Image" src="images/${move}-emoji.png"> computer picked <img class="move-Image" src="images/${computerMove}-emoji.png">`;

      }

      function pickComputerMove()
      {
        const randomNumber = Math.random();

        let computerMove = '';

        if(randomNumber >= 0 && randomNumber < 1/3)
        {
          computerMove = 'rock';
        }
        else if(randomNumber >= 1/3 && randomNumber < 2/3)
        {
          computerMove = 'paper';
        }
        else
        {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      function updateScoreElement()
      {
        // searches for the html element with the class js-score and updates the innerHTML
        document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
      }

      function updateResultElement(result)
      {
          document.querySelector('.js-result').innerHTML = result;
      }

      let intervalId;
      const autoPlayButton = document.querySelector('.js-auto-play-button');

      function autoPlay()
      {
        if(!isAutoPlaying)
          {
                                    // arrow function 
          intervalId = setInterval(() =>
          {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          },1000);
          isAutoPlaying = true;
          autoPlayButton.classList.add('active-auto-play');
          autoPlayButton.innerHTML = 'Stop Auto Play';
        }
        else
        {
          clearInterval(intervalId);
          isAutoPlaying = false;
          autoPlayButton.classList.remove('active-auto-play');
          autoPlayButton.innerHTML = 'Auto Play';
        }
      }

      function resetScore()
      {
        openModalWindow();
      }

      function openModalWindow()
      {
        modal.classList.add('visible');

        document.querySelector('.js-deny-button').addEventListener('click', () =>{
        closeModalWindow();
        });

        document.querySelector('.js-confirm-button').addEventListener('click', () =>{
        score.wins = 0; 
        score.losses = 0; 
        score.ties = 0; 
        localStorage.removeItem('Score'); 
        updateResultElement('Make a move');
        updateScoreElement();
        closeModalWindow();
        });

      }

      function closeModalWindow()
      {
        modal.classList.remove('visible');
      }