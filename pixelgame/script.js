// Author: Marcio Dantas | https://marc-dantas.github.io/marc-dantas

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = {
    player: { x: 0, y: 0 },
    fruits: [],
    graphics: {
        renderPlayer: (width, height) => {
            ctx.fillStyle = '#222';
            ctx.fillRect(width, height, 1, 1);
        },

        renderFruit: (width, height) => {
            ctx.fillStyle = '#F00';
            ctx.fillRect(width, height, 1, 1);
        },

        clearScreen: () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        clearPixel: (width, height) => {
            ctx.clearRect(width, height, 1, 1);
        },

        renderAllFruits: () => {
            game.fruits.forEach(fruit => {
                game.graphics.renderFruit(fruit.x, fruit.y);
            });
            console.log(`All fruits has been rendered.`);
        }
    },

    callKeyboardEvents: eventFunctions => {
        document.addEventListener('keydown', event => {
            if (eventFunctions && eventFunctions[event.key]) {
                eventFunctions[event.key]();
            } else {
                console.log(`No event functions found for key: ${event.key}.`);
            }
        });
    },

    callFruitCollisionEvent: eventFunction => {
        for (const fruit of game.fruits) {
            if (fruit.x === game.player.x && fruit.y === game.player.y) {
                eventFunction();
            }
        }
    },

    insertFruit: () => {
        game.fruits.push({
            x: Math.round(Math.random() * canvas.width),
            y: Math.round(Math.random() * canvas.height)
        });
    },

    deleteFruitByIndex: (index) => {
        game.fruits.splice(index, 1);
    },

    deleteFruitByPosition: (x, y) => {
        for (const fruit of game.fruits) {
            if (fruit.x === x && fruit.y === y) {
                game.deleteFruitByIndex(game.fruits.indexOf(fruit));
            }
        }
    },

    start: () => {
        game.graphics.renderPlayer(game.player.x, game.player.y);
        game.callKeyboardEvents(keyActions);
    }
}

const keyActions = {
    ArrowUp: () => {
        game.graphics.clearScreen();
        if (game.player.y > 0) {
            game.player.y--;
            game.callFruitCollisionEvent(() => {
                game.deleteFruitByPosition(game.player.x, game.player.y);
            });
        }
        game.graphics.renderAllFruits();
        game.graphics.renderPlayer(game.player.x, game.player.y);
        console.log(`Move up with position: ${game.player.x}, ${game.player.y}.`);
    },

    ArrowDown: () => {
        game.graphics.clearScreen();
        if (game.player.y < canvas.height - 1) {
            game.player.y++;
            game.callFruitCollisionEvent(() => {
                game.deleteFruitByPosition(game.player.x, game.player.y);
            });
        }
        game.graphics.renderAllFruits();
        game.graphics.renderPlayer(game.player.x, game.player.y);
        console.log(`Move down with position: ${game.player.x}, ${game.player.y}.`);
    },

    ArrowLeft: () => {
        game.graphics.clearScreen();
        if (game.player.x > 0) {
            game.player.x--;
            game.callFruitCollisionEvent(() => {
                game.deleteFruitByPosition(game.player.x, game.player.y);
            });
        }
        game.graphics.renderAllFruits();
        game.graphics.renderPlayer(game.player.x, game.player.y);
        console.log(`Move left with position: ${game.player.x}, ${game.player.y}.`);
    },

    ArrowRight: () => {
        game.graphics.clearScreen();
        if (game.player.x < canvas.width - 1) {
            game.player.x++;
            game.callFruitCollisionEvent(() => {
                game.deleteFruitByPosition(game.player.x, game.player.y);
            });
        }
        game.graphics.renderAllFruits();
        game.graphics.renderPlayer(game.player.x, game.player.y);
        console.log(`Move right with position: ${game.player.x}, ${game.player.y}.`);
    },

    f: () => {
        game.insertFruit();
        game.graphics.renderAllFruits();
        console.log(`Inserted fruit at game.fruits: ${game.fruits.length}.`);
    }
}

game.start();
