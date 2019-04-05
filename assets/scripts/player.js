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
        let playerStats = playerAttack();

        enemy.hp -= playerStats;
        enemyHP.innerHTML = '<p class="enemy-hp">Health: ' + enemy.hp + '</p>';
    },
    defend: function () {
        
    },
    magic: function () {
        
    }
}