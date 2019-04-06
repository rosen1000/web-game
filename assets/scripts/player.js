let player;

function Player(classType, hp, mana, atk, speed, def) {
    this.classType = classType;
    this.hp = hp;
    this.mana = mana;
    this.atk = atk;
    this.speed = speed;
    this.def = def;
    this.defends = false;
}

let PlayerMoves = {
    attack: function () {
        let playerAttack = function () {
            let basedmg;
            if (player.mana > 0) {
                basedmg = (player.atk * player.mana) / 100;
            } else {
                basedmg = player.atk;
            }

            let offsetdmg = Math.floor(Math.random() * 10);
            let outputdmg = basedmg + offsetdmg;
            return outputdmg;
        }

        let enemyHP = document.querySelector(".enemy-hp");
        let logs = document.querySelector(".arena");
        let playerStats = playerAttack();

        if (enemy.defends) {
            playerStats = Math.floor(playerStats / 9);
            enemy.hp -= playerStats;
        } else {
            enemy.hp -= playerStats;
        }

        logs.innerHTML += `<br>${player.classType} attacked for ${playerStats} damage`
        enemyHP.innerHTML = '<p class="enemy-hp">Health: ' + enemy.hp + '</p>';
    },
    defend: function () {
        player.defends = true;
        document.querySelector(".arena").innerHTML += `<br>${player.classType} defends`;
    },
    magic: function () {
        
    }
}