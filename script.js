const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = {
    snake: [{ x: 0, y: 0 }],
    direction: { x: 1, y: 0 },
    fruits: [],
    running: false,
    interval: null,
    speed: 200,
    graphics: {
        renderSnake: () => {
            ctx.fillStyle = '#222';
            game.snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, 1, 1);
            });
        },
        renderFruit: (x, y) => {
            ctx.fillStyle = '#F00';
            ctx.fillRect(x, y, 1, 1);
        },
        clearScreen: () => {
            ctx.fillStyle = '#FFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        renderAllFruits: () => {
            game.fruits.forEach(fruit => {
                game.graphics.renderFruit(fruit.x, fruit.y);
            });
        }
    },
    callKeyboardEvents: eventFunctions => {
        document.addEventListener('keydown', event => {
            if (eventFunctions && eventFunctions[event.key]) {
                eventFunctions[event.key]();
            }
        });
    },
    callFruitCollisionEvent: () => {
        for (const fruit of game.fruits) {
            if (fruit.x === game.snake[0].x && fruit.y === game.snake[0].y) {
                game.deleteFruitByPosition(fruit.x, fruit.y);
                game.snake.push({ ...game.snake[game.snake.length - 1] });
                game.insertFruit();
                return true;
            }
        }
        return false;
    },
    insertFruit: () => {
        let newFruit;
        do {
            newFruit = {
                x: Math.floor(Math.random() * canvas.width),
                y: Math.floor(Math.random() * canvas.height)
            };
        } while (game.fruits.some(fruit => fruit.x === newFruit.x && fruit.y === newFruit.y) ||
                 game.snake.some(segment => segment.x === newFruit.x && segment.y === newFruit.y));
        game.fruits.push(newFruit);
    },
    deleteFruitByPosition: (x, y) => {
        game.fruits = game.fruits.filter(fruit => fruit.x !== x || fruit.y !== y);
    },
    moveSnake: () => {
        const head = { x: game.snake[0].x + game.direction.x, y: game.snake[0].y + game.direction.y };

        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
            game.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            game.reset();
            return;
        }

        game.snake.unshift(head);
        if (!game.callFruitCollisionEvent()) {
            game.snake.pop();
        }

        game.graphics.clearScreen();
        game.graphics.renderAllFruits();
        game.graphics.renderSnake();
    },
    reset: () => {
        clearInterval(game.interval);
        game.snake = [{ x: 0, y: 0 }];
        game.direction = { x: 1, y: 0 };
        game.fruits = [];
        game.running = false;
        game.start();
    },
    start: () => {
        if (game.running) return;
        game.running = true;
        game.insertFruit();
        game.graphics.clearScreen();
        game.graphics.renderSnake();
        game.graphics.renderAllFruits();
        game.callKeyboardEvents(keyActions);
        game.interval = setInterval(game.moveSnake, game.speed);
    }
};
const keyActions = {
    w: () => {
        if (game.direction.y === 0) {
            game.direction = { x: 0, y: -1 };
        }
    },
    s: () => {
        if (game.direction.y === 0) {
            game.direction = { x: 0, y: 1 };
        }
    },
    a: () => {
        if (game.direction.x === 0) {
            game.direction = { x: -1, y: 0 };
        }
    },
    d: () => {
        if (game.direction.x === 0) {
            game.direction = { x: 1, y: 0 };
        }
    },
    g: game.start
};

game.callKeyboardEvents(keyActions);
