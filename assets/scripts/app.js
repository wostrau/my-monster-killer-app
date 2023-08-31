const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

const endRound = (damageValue) => {
    const playerDamage = dealPlayerDamage(damageValue);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
    }
};

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
};

const healPlayer = (healAmount) => {
    let healValue;

    if (currentPlayerHealth >= chosenMaxLife - healAmount) {
        alert('You cannot heal above your max initial health');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = healAmount;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
};

const attackHandler = () => {
    attackMonster('ATTACK');
    endRound(MONSTER_ATTACK_VALUE);
};
const strongAttackHandler = () => {
    attackMonster('STRONG_ATTACK');
    endRound(MONSTER_ATTACK_VALUE);
};
const healPlayerHandler = () => {
    healPlayer(HEAL_VALUE);
    endRound(MONSTER_ATTACK_VALUE);
    console.log(currentPlayerHealth)
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
