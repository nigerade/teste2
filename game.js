//Misc Helpers
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

(function () {
    
    let playerId;
    let playerRef;
    let players = {};
    let playerElements = {};

    const playerName = document.querySelector("#player-name");
    
    function initGame() {

        const allPlayersRef = firebase.database().ref(`players`);

        allPlayersRef.on("value", (snapshot) => {
            
            players = snapshot.val() || {};

            Object.keys(players).forEach((key) => {
                
                //const characterState = players[key];
                //let el = playerElements[key];

                
            })

           
          })

    }
  
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`);

        playerName.innerHTML = playerId;
        

        playerRef.set({
            id: playerId
        })

        playerRef.onDisconnect().remove();
  
        initGame();
      } 

    })
  
    firebase.auth().signInAnonymously().catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  
  
  })();
  