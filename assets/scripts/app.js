const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

const attackMonster = (mode) => {
    let maxDamage;
    switch (mode) {
        case 'ATTACK':
            maxDamage = ATTACK_VALUE;
            break;
        case 'STRONG_ATTACK':
            maxDamage = STRONG_ATTACK_VALUE;
            break;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
    }

    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
    }
};

const attackHandler = () => attackMonster('ATTACK');
const strongAttackHandler = () => attackMonster('STRONG_ATTACK');

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
