let GameManager = {
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "Warrior":
                player = new Player(classType, 300, 100, 40, 3);
                break;
            case "Mage":
                player = new Player(classType, 180, 400, 20, 6);
                break;
            case "Archer":
                player = new Player(classType, 150, 200, 50, 10);
                break;
            default:
                alert("error, please restart the page");
                break;
        }

        document.querySelector(".interface").innerHTML =
            `<img class="avatar" src="./assets/heroes/${classType.toLowerCase()}.png" alt="${classType}">` +
            `<div><h3>${classType}</h3>` +
            `<p class="player-hp">Health: ${player.hp}</p>` +
            `<p>Mana: ${player.mana}</p>` +
            `<p>Attack: ${player.atk}</p>` +
            `<p>Speed: ${player.speed}</p></div>`;
    },
    setPreFight: function () {
        document.querySelector(".header").innerHTML = "<p><h1>Find an Enemy!</h1><p>";
        document.querySelector(".actions").innerHTML = '<a href="#" class="prefight" onclick="GameManager.setFight()">Find enemy</a>';
        document.querySelector(".arena").style.visibility = "visible";
    },
    setFight: function () {
        let enemy00 = new Enemy("Goblin", 100, 0, 20, 4);
        let enemy01 = new Enemy("Thrall", 200, 300, 30, 5);
        let choosen = Math.floor(Math.random() * 2);

        switch (choosen) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
                break;
        }

        document.querySelector(".header").innerHTML = `<p>What will you do?</p>`;
        document.querySelector(".actions").innerHTML =
            '<a href="#" class="prefight" onclick="PlayerMoves.calcAttack()">Attack!</a>' +
            '<a href="#" onclick="PlayerMoves.defend()">Defend!</a>' + 
            '<a href="#" onclick="PlayerMoves.magic()">Use Magic!</a>';
        document.querySelector(".enemy").innerHTML =
            `<img class="avatar" src="./assets/enemies/${enemy.enemyType.toLowerCase()}.png" alt="${enemy.enemyType}">` +
            `<div><h3>${enemy.enemyType}</h3><p class="enemy-hp">Health: ${enemy.hp}</p>` +
            `<p>Mana: ${enemy.mana}</p>` +
            `<p>Attack: ${enemy.atk}</p>` +
            `<p>Speed: ${enemy.speed}</p></div>`;
    }
}