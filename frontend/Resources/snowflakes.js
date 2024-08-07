const numSnowflakes = 100;

for (let i = 0; i < numSnowflakes; i++) {
    createSnowflake();
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`;
    snowflake.style.animationDelay = `${Math.random() * 3}s`;
    document.querySelector('.snowflake-container').appendChild(snowflake);
}
