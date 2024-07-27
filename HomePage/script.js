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
        const level = this.dataset.level;
        const category = this.dataset.category;

        // Check if the currently displayed game details match the clicked tile
        if (detailsSection.style.display === 'flex' &&
            document.getElementById('game-title').textContent === title) {
            detailsSection.style.display = 'none';
        } else {
            document.getElementById('game-title').textContent = title;
            document.getElementById('game-image').src = imgSrc;
            document.getElementById('game-level').textContent = level;
            document.getElementById('game-category').textContent = category;

            // Append the new section if it doesn't already exist
            if (!document.getElementById('slide1')) {
                const newContent = `
                    <section class="slide1" id="slide1">
                        <h1>Select your estimated English level
                            <span id="toggle-help-1" class="material-icons" style="cursor: pointer;">help</span> <!-- Material icon question mark -->
                        </h1>
                        <div class="levels">
                            <p id="a1">A1</p>
                            <p id="a2">A2</p>
                            <p id="b1">B1</p>
                            <p id="b2">B2</p>
                            <p id="c1">C1</p>
                            <p id="c2">C2</p>
                        </div>
                        <div id="help-message-1" style="display: none;"> <!-- Initially hidden -->
                            <p class="title">CEFR defines proficiency levels as follows:</p>
                            <div class="cefr-levels">
                                <p>A1 (Beginner): Can understand basic words and phrases for everyday needs.</p>
                                <p>A2 (Elementary): Can communicate simple tasks and routine information.</p>
                                <p>B1 (Intermediate): Can handle familiar topics and express personal opinions.</p>
                                <p>B2 (Upper Intermediate): Can understand main ideas and interact fluently on a variety of topics.</p>
                                <p>C1 (Advanced): Can use language effectively and flexibly for social, academic, and professional purposes.</p>
                                <p>C2 (Proficient): Can understand virtually everything heard or read and express ideas precisely.</p>
                            </div>
                        </div>
                    </section>
                `;
                detailsSection.querySelector('.inner').insertAdjacentHTML('beforeend', newContent);

                // Add event listener for help message toggle
                document.getElementById('toggle-help-1').addEventListener('click', function() {
                    const helpMessage = document.getElementById('help-message-1');
                    helpMessage.style.display = helpMessage.style.display === 'none' ? 'block' : 'none';
                });
            }

            detailsSection.style.display = 'flex';
        }
    });
});