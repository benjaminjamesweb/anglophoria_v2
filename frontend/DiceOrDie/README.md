Section 1 - Project Description

1.1 Project

Dice or Die

1.2 Description

Dice or Die is a single-player game in which the user must dice (chop) fruits and vegetables as quickly as possible. This game is intended for English-language learners (but it could obviously be adapted for any other language). By playing this game, users train themselves to react more quickly to basic vocabulary (in this game, the target is fruits and vegetables).

Dice or Die takes place in a restaurant kitchen. In the corner of the screen, a chef calls out the ingredients he/she needs (e.g. “tomato… apple… lettuce…”). After hearing each item, the user is presented with a screen of options (various fruits/vegetables) and has only a few seconds to click on the appropriate item. When clicked, the item is clicked (chopped up), the user gains points (+10 points), and then the chef proceeds to call out the next item(s). However, if the player clicks on the wrong item, they will lose points (-5 points). To win the game, they must have enough points by the time the game is over (maybe a threshold of 50 points?). The full game lasts 60 seconds. It’s supposed to be fast and exciting, not boring. It should also be hard to win, so the user plays it many times.

1.3 Revision History

I have revised the core/additional features section in my Project Proposal, which I will paste here:

Core features:

• Two countdowns should be clearly displayed: the game countdown (T-60) and the turn countdown (T-5). These stats should be clear and visually “reactive” (e.g. if a turn is lost, the turn countdown turns red; if the game is lost, the game countdown turns red)

• Point counting should be clear and “reactive” (e.g. when the user gains points, the point counter section should flash green; if points are lost, it should flash red)

• Shuffling of items for each turn, with varying numbers of items (e.g. the first turn might have two items – apple and banana – but the last turn might have fifteen items). This shuffling could be done either randomly or by pre-programming various level “initializations” (that also have a random element of what order they are presented in). I will start with the random approach and see how much I need to “customize” it to make the game adequate.

Additional features:

• Cool animations (fruits/vegetables exploding into little cubes when diced… dancing fruits when the game is won… etc.)

• Advanced reactivity from the chef NPC (e.g. “too slow” when the turn countdown runs out)

• (Extra: Tracking top scores of players?)

I also revised the technology stack:

• Technology stack: javascript (with html + css)

At the time of writing this, I'm not sure about what other tech I will integrate into this project. One idea is to use React.

Section 2 - Overview

2.1 Purpose

The intended audience is English-language learners. The initial version of Dice or Die that I am creating is specifically for low-level learners (A2). However, theoretically, the user should be able to change the difficulty of the game before playing, so it could also appeal to high-level learners (B2, C1, etc.). I would achieve this by "scaling" the language (harder vocabulary) and increasing the speed at which the chef speaks.

2.2 Scope

As mentioned earlier, this mini-game is just one part of a larger application called “Anglophoria,” a site for English-language leaners to practice their English skills (specifically for improving their speed and confidence through fun games, rather than really “teaching” them grammar rules, etc.).

2.3 Requirements

For the purposes of this assignment, I want to ensure that the game has:

Seamless gameplay, including flawless button controls (start game, replay, see instructions, etc.), accurate countdowns (60 seconds for the whole game, 5 seconds for each turn), and accurate point counting (clicking on the correct item earns points, clicking on the wrong item loses points, etc.)

Visually appealing hand-drawn elements

2.3.1 Functional Requirements

• R1: The game first allows the user to click “start game” or “instructions”

• R2: clicking “instructions” opens up an appropriate description of the game, that the user can exit out of to return to the main start screen

• R3: clicking “start game” correctly initializes the game

• R4: the game has simple, intuitive UI, allowing a first-time player to start the game with no confusion.

• R5: There are three displays at the top of the screen: time remaining for the game (counting down from 60 seconds), time remaining in the turn (5 seconds), and total points earned

• R6: There should be about ~20 fruit and veggie icons displayed (although maybe less at the start).

• R7: There should be a “chef” in the bottom right of the screen, who tells the user which fruit or veggie to click (ideally this would be done orally, but I'm going to start with just a speech bubble)

• R8: The basic game functionality should be flawless: clicking the correct fruit/veggie earns the user 10 points, and they move on immediately to the next turn; clicking the wrong fruit/veggie loses the user 5 points; if the user fails to pass the turn, there should be a “waiting time” of a few seconds before they can start the next turn

• R9: This logic should be made clear to the user through intuitive visual elements (e.g. when points are lost, the points should turn red momentarily, as 5 points are subtracted; when the turn is lose, the turn countdown should also turn red, etc.)

• R10: When the game is over (60 seconds have passed), the game should display some sort of message to the user, either congratulating them or not, and ask them if they want to play again.

2.3.2 Non-Functional Requirements

The game should only allow one user at a time. It should not crash or lag for any reason. It should run smoothly on any browser (hosted on github pages).

2.3.3 Technical Requirements

Standard technical requirements (for a web app) apply. It should run flawlessly on any computer or laptop.

2.3.4 Security Requirements

My app is a simple web app, so there are no specific security requirements. I will add security requirement here if they are thought to be necessary.

2.3.5 Estimates

My estimate for total completion of the game is 15 hours.

2.3.6 Traceability Matrix

Omitted - I don't understand this part.

NOTE: I will provide detailed documentation for Sections 3 - 12 concurrently as I develop the app. For now, I can only give vague descriptions.

Section 3 - System Architecture

The main system architecture to be added is a mongoDB database that will keep track of users and their "won" games (possibly including "high scores" or other information)

Section 4 - Data Dictionary

User:

user_ID (decimal)

user_name (VARCHAR)

user_password (VARCHAR)

games_won (int)

account_type (VARCHAR)

account_created (date)

payment_info (foreign key: payment_id)

NOTE: The main field to consider here is the games_won field, which should successfully update the display on the main screen to show the number of games the user has won. The other fields are less important (for me).

Section 5 - Data Design

Different tables:

payment_info:

payment_info_ID (decimal)

user_ID (foreign key: user_ID)

payment_method (VARCHAR) *e.g. "Visa Credit Card"

There is a one to one (optional) relationship between users and payment_info (because not all users will have a premium subscription account)

perhaps there will be more tables, such as:

games_won:

game_ID (decimal)

game_name (VARCHAR) *e.g. "Dice or Die"

CEFR_level (enum) *e.g. "A1"

date_won (date)

language_category (enum) *e.g. "Grammar"

Section 6 - UI Design

I have already created advanced UI design for this game - you can see the deployed app on github pages.

Section 7 - 12

To be done later
