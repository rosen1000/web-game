let enemy;

function Enemy(enemyType, hp, mana, atk, speed) {
    this.enemyType = enemyType;
    this.hp = hp;
    this.mana = mana;
    this.atk = atk;
    this.speed = speed;
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
        let enemyStats = enemyAttack();

        player.hp -= enemyStats;
        playerHP.innerHTML = '<p class="player-hp">Health: ' + player.hp + '</p>';
    },
    defend: function () {
        
    }
}