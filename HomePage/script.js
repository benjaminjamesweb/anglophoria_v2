function toggleMenu() {
    var menu = document.getElementById("side-menu");
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}


document.querySelectorAll('.game-tile').forEach(tile => {
    tile.addEventListener('click', function(event) {
        event.preventDefault();
        
        const detailsSection = document.getElementById('game-details');
        const title = this.dataset.title;
        const imgSrc = this.dataset.img;
        const level = this.dataset.header;
        const category = this.dataset.description;

        if (detailsSection.style.display === 'flex' &&
            document.getElementById('game-title').textContent === title) {
            detailsSection.style.display = 'none';
        } else {
            document.getElementById('game-title').textContent = title;
            document.getElementById('game-image').src = imgSrc;
            document.getElementById('game-level').textContent = level;
            document.getElementById('game-category').textContent = category;

            if (!document.getElementById('levelsDropdown')) {
                const newContent = `
                <div class="confirm-level">
                <p> Confirm your level: </p>
                    <select id="levelsDropdown">
                        <option value="a1" selected>A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                    </div>
                  <button class="playButton" onclick="window.location.href='../DiceOrDie/index.html'">Play</button>
                `;
                detailsSection.querySelector('.inner').insertAdjacentHTML('beforeend', newContent);
            }

            detailsSection.style.display = 'flex';
        }
    });
});

document.querySelector('.playButton').addEventListener('click', function() {
    window.location.href = '../DiceOrDie/index.html';
});

function toggleParameters() {
    var parametersDiv = document.getElementById('parameters');
    if (parametersDiv.style.display === 'block') {
        parametersDiv.style.display = 'none';
    } else {
        parametersDiv.style.display = 'block';
    }
}