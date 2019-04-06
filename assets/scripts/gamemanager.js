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
        try {
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
                `<a class="prefight" onclick="GameManager.fight('attack')">Attack!</a>` +
                `<a onclick="GameManager.fight('defend')">Defend!</a>` +
                `<a onclick="GameManager.fight('magic')">Use Magic!</a>`;
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
        } catch (e) {
            if (e) console.log(e);
        }
    },
    fight: function (type) {
        if (this.checkWin()) return;

        let playerAgl = Math.floor(Math.random() * player.speed);
        let enemyAgl = Math.floor(Math.random() * enemy.speed);

        let attackP = function () {
            switch (type) {
                case "attack":
                    PlayerMoves.attack();
                    if (GameManager.checkWin()) return;
                    break;
                case "defend":
                    PlayerMoves.defend();
                    break;
                case "magic":
                    PlayerMoves.magic();
                    if (GameManager.checkWin()) return;
            }
        }

        let attackE = function () {
            let enemyOptions = ["attack", "attack", "defend"];
            let enemyOption = enemyOptions[Math.floor(Math.random() * enemyOptions.length)];
            switch (enemyOption) {
                case "attack":
                    EnemyMoves.attack();
                    if (GameManager.checkWin()) return;
                    break;
                case "defend":
                    EnemyMoves.defend();
                    if (GameManager.checkWin()) return;
                    break;
            }
        }

        let logs = document.querySelector(".arena");
        if (playerAgl >= enemyAgl) {
            logs.innerHTML = `${player.classType} goes first!`;
            attackP();
            attackE();
            if (enemy.defends && player.defends) {
                logs.innerHTML += `<br>Nothing happens`;
            } else if (enemy.defends) {
                logs.innerHTML += `<br>${enemy.enemyType} can't defend`;
            }
        } else {
            logs.innerHTML = `${enemy.enemyType} goes first!`;
            attackE();
            attackP();
            if (player.defends && enemy.defends) {
                logs.innerHTML += `<br>Nothing happens`;
            } else if (player.defends) {
                logs.innerHTML += `<br>${player.classType} can't defend`;
            }
        }

        player.defends = false;
        enemy.defends = false;

        /*
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
        */
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