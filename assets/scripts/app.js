const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const enteredValue = prompt('Choose maximum health for you and the monster', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const reset = () => {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
};

const endRound = (damageValue) => {
    if (currentMonsterHealth < 0) return;

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(damageValue);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('You would be dead but the bonus life saved you!');
        setPlayerHealth(initialPlayerHealth);
        return;
    }

    if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        reset();
    }
};

const attackMonster = (mode) => {
    let maxDamage;
    switch (mode) {
        case MODE_ATTACK:
            maxDamage = ATTACK_VALUE;
            break;
        case MODE_STRONG_ATTACK:
            maxDamage = STRONG_ATTACK_VALUE;
            break;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        reset();
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
    attackMonster(MODE_ATTACK);
    endRound(MONSTER_ATTACK_VALUE);
};
const strongAttackHandler = () => {
    attackMonster(MODE_STRONG_ATTACK);
    endRound(MONSTER_ATTACK_VALUE);
};
const healPlayerHandler = () => {
    healPlayer(HEAL_VALUE);
    endRound(MONSTER_ATTACK_VALUE);
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
