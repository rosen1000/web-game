let enemy;

function Enemy(enemyType, hp, mana, atk, speed, def) {
    this.enemyType = enemyType;
    this.hp = hp;
    this.mana = mana;
    this.atk = atk;
    this.speed = speed;
    this.def = def;
    this.defends = false;
}

let EnemyMoves = {
    attack: function () {
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
        let logs = document.querySelector(".arena");
        let enemyStats = enemyAttack();

        if (player.defends) {
            enemyStats = Math.floor(enemyStats / 9);
            player.hp -= enemyStats;
        } else {
            player.hp -= enemyStats;
        }

        logs.innerHTML += `<br>${enemy.enemyType} attacked for ${enemyStats} damage`
        playerHP.innerHTML = '<p class="player-hp">Health: ' + player.hp + '</p>';
    },
    defend: function () {
        enemy.defends = true;
        document.querySelector(".arena").innerHTML += `<br>${enemy.enemyType} defends`;
    }
}