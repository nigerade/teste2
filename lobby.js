(function () {
    
    let playerId;
    let playerRef;
    let players = {};
    
    function initLobby() {

        const allPlayersRef = firebase.database().ref(`players`);

        allPlayersRef.on("value", (snapshot) => {
            
            players = snapshot.val() || {};
            let playersCont = 0;

            Object.keys(players).forEach((key) => {
              playersCont += 1;
            })

            if(playersCont == 2){
                window.location.href = "game.html";
            }
          })

    }
  
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`);
        

        playerRef.set({
            id: playerId
        })

        playerRef.onDisconnect().remove();
  
        initLobby();
      } 

    })
  
    firebase.auth().signInAnonymously().catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  
  
  })();
  