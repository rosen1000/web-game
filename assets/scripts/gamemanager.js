let GameManager = {
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "Warrior":
                player = new Player(classType, 300, 0, 40, 3);
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

        if (player.mana > 0) {
            document.querySelector(".interface").innerHTML =
                `<img class="avatar" src="./assets/heroes/${classType.toLowerCase()}.png" alt="${classType}">` +
                `<div><h3>${classType}</h3>` +
                `<p class="player-hp">Health: ${player.hp}</p>` +
                `<p>Mana: ${player.mana}</p>` +
                `<p>Attack: ${player.atk}</p>` +
                `<p>Speed: ${player.speed}</p></div>`;
        } else {
            document.querySelector(".interface").innerHTML = 
                `<img class="avatar" src="./assets/heroes/${classType.toLowerCase()}.png" alt="${classType}">` +
                `<div><h3>${classType}</h3>` +
                `<p class="player-hp">Health: ${player.hp}</p>` +
                `<p>Attack: ${player.atk}</p>` +
                `<p>Speed: ${player.speed}</p></div>`;
        }
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
            '<a href="#" class="prefight" onclick="GameManager.attack("attack")">Attack!</a>' +
            '<a href="#" onclick="GameManager.attack("defend")">Defend!</a>' + 
            '<a href="#" onclick="GameManager.attack("magic")">Use Magic!</a>';
        if (enemy.mana > 0) {
            document.querySelector(".enemy").innerHTML =
                `<img class="avatar" src="./assets/enemies/${enemy.enemyType.toLowerCase()}.png" alt="${enemy.enemyType}">` +
                `<div><h3>${enemy.enemyType}</h3>` +
                `<p class="enemy-hp">Health: ${enemy.hp}</p>` +
                `<p>Mana: ${enemy.mana}</p>` +
                `<p>Attack: ${enemy.atk}</p>` +
                `<p>Speed: ${enemy.speed}</p></div>`;
        } else {
            document.querySelector(".enemy").innerHTML =
                `<img class="avatar" src="./assets/enemies/${enemy.enemyType.toLowerCase()}.png" alt="${enemy.enemyType}">` +
                `<div><h3>${enemy.enemyType}</h3>` +
                `<p class="enemy-hp">Health: ${enemy.hp}</p>` +
                `<p>Attack: ${enemy.atk}</p>` +
                `<p>Speed: ${enemy.speed}</p></div>`;
        }
    },
    fight: function (type) {
        if (checkWin()) return;
        let enemyOptions = ["attack", "attack", "defend"];
        let enemyOption = enemyOptions[Math.floor(Math.random() * enemyOptions.length)];

        let playerAgl = Math.floor(Math.random() * player.speed);
        let enemyAgl = Math.floor(Math.random() * enemy.speed);

        if (playerAgl >= enemyAgl) {
            switch (type) {
                case "attack":
                    player.attack();
                    if (checkWin()) return;
                    break;
                case "defend":
                    player.defend();
                    break;
                case "magic":
                    player.magic();
                    if (checkWin()) return;
            }
        } else {
            switch (enemyOption) {
                case "attack":
                    enemy.attack();
                    if (checkWin()) return;
                    break;
                case "defend":
                    enemy.defend();
                    if (checkWin()) return;
                    break;
            }
        }
        
        return;

        let attackP = function () {
            let enemyStats = enemy.attack();
            if (player.hp <= 0) return true;
            alert("the enemy dealth " + enemyStats + " dmg");
            player.hp -= enemyStats;
            playerHP.innerHTML = 'Health: ' + player.hp;
            if (player.hp <= 0) { return true } else { return false };
        }

        let attackE = function () {
            let playerStats = player.attack();
            if (enemy.hp <= 0) return true;
            alert("you dealth " + playerStats + " dmg")
            enemy.hp -= playerStats;
            enemyHP.innerHTML = 'Health: ' + enemy.hp;
            if (enemy.hp <= 0) { return true } else { return false };
        }

        if (player.speed > enemy.speed) {
            if (attackE()) {
                alert("you win!");
            } else if (attackP()) {
                alert("you lost :(");
            }
        } else {
            if (attackP()) {
                alert("you lost :(");
            } else if (attackE()) {
                alert("you win!");
            }
        }
        playerHP.innerHTML = 'Health: ' + player.hp;
        enemyHP.innerHTML = 'Health: ' + enemy.hp;
    },
    checkWin: function () {
        if (enemy.hp <= 0) {
            alert("You won!");
            return true;
        } else if (player.hp <= 0) {
            alert("You lost :(");
            return true;
        }
        return false;
    }
}