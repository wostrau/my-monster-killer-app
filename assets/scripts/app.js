const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'PLAYER_MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';


let battleLog = [];
let lastLoggedEntry;

const getMaxLifeValues = () => {
    const enteredValue = prompt('Choose maximum health for you and the monster', '100');
    const parsedValue = parseInt(enteredValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw { message: 'Invalid user input, not a number!' };
    }

    return parsedValue;
};

let chosenMaxLife;

try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was used');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const writeToLog = (event, value, monsterHealth, playerHealth) => {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_GAME_OVER:
            break;
    }

    battleLog.push(logEntry);
    return logEntry;
};

const reset = () => {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
};

const endRound = (damageValue) => {
    if (currentMonsterHealth <= 0) return;

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(damageValue);
    currentPlayerHealth -= playerDamage;

    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

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
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    }


};

const attackMonster = (mode) => {
    let maxDamage;
    let logEvent;

    switch (mode) {
        case MODE_ATTACK:
            maxDamage = ATTACK_VALUE;
            logEvent = LOG_EVENT_PLAYER_ATTACK;
            break;
        case MODE_STRONG_ATTACK:
            maxDamage = STRONG_ATTACK_VALUE;
            logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
            break;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        writeToLog(
            logEvent,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
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

    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healAmount,
        currentMonsterHealth,
        currentPlayerHealth
    );
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
const printLogHandler = () => {
    // (1) for
    for (let i = 0; i < battleLog.length; i++) {
        console.log(battleLog[i].event);
    }

    // (2 + 3) for of + for in (inside)
    let i = 0;
    for (const logEntry of battleLog) {
        if (logEntry.event === LOG_EVENT_GAME_OVER) continue;

        if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {
            console.log(`#${i}`);

            for (const key in logEntry) {
                console.log(`${key} => ${logEntry[key]}`);
            }

            lastLoggedEntry = i;
            break;
        }

        i++;
    }

    // (4) while
    let j = 0;
    while (j < battleLog.length) {
        console.log(battleLog[j].value);

        j++;
    }

    // (5) do { ... } while ( ... ) -->
    // --> alternative to 'while' loop,
    // body will always be executed at least for the first time!
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
