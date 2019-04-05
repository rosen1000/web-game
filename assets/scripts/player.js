let player;

function Player(classType, hp, mana, atk, speed, def) {
    this.classType = classType;
    this.hp = hp;
    this.mana = mana;
    this.atk = atk;
    this.speed = speed;
    this.def = def;
}

let PlayerMoves = {
    calcAttack: function () {
        let playerAttack = function () {
            let basedmg;
            if (player.mana > 0) {
                basedmg = (player.atk * player.mana) / 100;
            } else {
                basedmg = player.atk;
            }

            let offsetdmg = Math.floor(Math.random() * 10);
            let outputdmg = basedmg + offsetdmg;
            let combo = Math.floor(Math.random() * 3) + 1;
            return outputdmg;
        }

        let enemyAttack = function () {
            let basedmg;
            if (enemy.mana > 0) {
                basedmg = (enemy.atk * enemy.mana) / 100;
            } else {
                basedmg = enemy.atk;
            }

            let offsetdmg = Math.floor(Math.random() * 10);
            let outputdmg = basedmg + offsetdmg;
            return outputdmg;
        }

        let playerHP = document.querySelector(".player-hp");
        let enemyHP = document.querySelector(".enemy-hp");
        let playerStats = playerAttack();
        let enemyStats = enemyAttack();

        let attackP = function () {
            if (player.hp <= 0) return true;
            alert("the enemy dealth " + enemyStats + " dmg");
            player.hp -= enemyStats;
            playerHP.innerHTML = 'Health: ' + player.hp;
            if (player.hp <= 0) { return true } else { return false };
        }

        let attackE = function () {
            if (enemy.hp <= 0) return true;
            alert("you dealth " + playerStats + " dmg")
            enemy.hp -= playerStats;
            enemyHP.innerHTML = 'Health: ' + enemy.hp;
            if (enemy.hp <= 0) { return true } else { return false };
        }

        if (player.speed > enemy.speed) {
            if (attackE()) {
                alert("you win!");
            } else if (attackP()){
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
    defend: function () {
        
    }
}