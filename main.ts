let startingPosX: number = 2;
let startingPosY: number = 0;

let currentX: number = startingPosX;
let currentY: number = startingPosY;

let speed: number = 300;

let grid: Array<Array<number>> = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

let grid_backup: Array<Array<number>> = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

let shape: number = 1;
let rotation = 0;

if (shape === 0) {
    currentY = 0
} else if (shape === 1) {
    currentY = 1
} else if (shape === 2) {
    currentY = 2
}

function render(a: number[][]): void {
    for (let y: number = 0; y < grid.length; y++) {
        for (let x: number = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 0) {
                led.unplot(x, y);
            } else {
                led.plot(x, y);
            }
        }
    }
}

function checklines(): number {
    

    for (let x = 4; x === 4 ;x++) {
        let sum: number = 0;
        for (let i: number = 0; i < grid[x].length; i++) {
            sum += grid[x][i];
        };

        if (sum === 5) {
            return sum;
        };
        
    }

    return -1;
    

    
}

function shapeLogic(t: number, s: number, r: number) {
    if (t === 0) { //deletion
        if (s === 0) {
            grid[currentY - 1][currentX] = 0;
        } else if (s === 1) {
            grid[currentY - 1][currentX] = 0;
            grid[currentY - 1][currentX - 1] = 0;
            grid[currentY - 2][currentX] = 0;
            grid[currentY - 2][currentX - 1] = 0;
        } else if (s === 2) {
            if (r === 0) {
                grid[currentY - 1][currentX] = 0;
                grid[currentY - 2][currentX - 1] = 0;
                grid[currentY - 1][currentX - 1] = 0;
            } else if (r === 1) {
                grid[currentY - 1][currentX] = 0;
                grid[currentY - 2][currentX - 1] = 0;
                grid[currentY - 1][currentX - 1] = 0;
                grid[currentY - 2][currentX] = 0;
            }
        }
    }
}

function move(dir: number) { // 0 - left, 1 - right

    if (currentY > 0 && currentY < grid.length) {
        shapeLogic(0, shape, rotation)

        if (dir === 0 && currentX !== 0 && grid[currentY][currentX - 1] === 0) {
            currentX--;
        } else if (dir === 1 && currentX !== grid[0].length - 1 && grid[currentY][currentX + 1] === 0) {
            currentX++;
        };
        
        if (shape === 0) {
            grid[currentY - 1][currentX] = 1;
            
        } else if (shape === 1) {
            grid[currentY - 1][currentX] = 1;
            grid[currentY - 1][currentX - 1] = 1;
            grid[currentY - 2][currentX] = 1;
            grid[currentY - 2][currentX - 1] = 1;
        } else if (shape === 2) {
            if (rotation === 0) {
                grid[currentY - 1][currentX] = 1;
                grid[currentY - 2][currentX - 1] = 1;
                grid[currentY - 1][currentX - 1] = 1;
            } else if (rotation === 1) {
                grid[currentY - 1][currentX] = 1;
                grid[currentY - 2][currentX] = 1;
                grid[currentY - 2][currentX - 1] = 1;
            }
        }
        
        render(grid);
    }
}

input.onButtonPressed(Button.A, function () {
    move(0);
})

input.onButtonPressed(Button.B, function () {
    move(1);
})

input.onButtonPressed(Button.AB, function() {
    if (shape === 2) {
        if (rotation === 0) {
            rotation = 1
        } else {
            rotation = 0
        }
        grid[currentY - 2][currentX] = 0;
    }
})

basic.forever(function () {
    if (currentY < grid.length) {
        if (shape === 0) {
            grid[currentY][currentX] = 1;
        } else if (shape === 1) {
            grid[currentY][currentX] = 1;
            grid[currentY][currentX - 1] = 1;
            grid[currentY - 1][currentX] = 1;
            grid[currentY - 1][currentX - 1] = 1;
        } else if (shape === 2) {
            if (rotation === 0) {
                grid[currentY][currentX] = 1;
                grid[currentY][currentX - 1] = 1;
                grid[currentY - 1][currentX - 1] = 1;
                grid[currentY - 2][currentX - 1] = 1;
            } else if (rotation === 1) {
                grid[currentY][currentX] = 1;
                grid[currentY - 1][currentX - 1] = 1;
                grid[currentY - 1][currentX] = 1;
            }
        }

        if (currentY !== 0) {

            if (shape === 0) {
                grid[currentY - 1][currentX] = 0;
            } else if (shape === 1) {
                if (currentY > 1) {
                    grid[currentY - 2][currentX] = 0;
                    grid[currentY - 2][currentX - 1] = 0;
                }
                
            } else if (shape === 2)  {
                if (rotation === 0) {
                    grid[currentY - 2][currentX - 1] = 0;
                    grid[currentY - 1][currentX] = 0;
                } else if (rotation === 1) {
                    grid[currentY - 2][currentX - 1] = 0;
                    grid[currentY - 2][currentX] = 0;
                }
            }
        };

        render(grid);

        if (currentY !== grid.length - 1) {
            if (shape === 0) {
                if (grid[currentY + 1][currentX] === 1) {
                    currentY = grid.length - 1;
                }
            } else if (shape === 1) {
                if (grid[currentY + 1][currentX] === 1 || grid[currentY + 1][currentX - 1] === 1) {
                    currentY = grid.length - 1;
                } 
            } else if(shape === 2) {
                if (rotation === 0) {
                    if (grid[currentY + 1][currentX] === 1 || grid[currentY + 1][currentX - 1] === 1) {
                        currentY = grid.length - 1;
                    }
                } else if (rotation === 1) {
                    if (grid[currentY + 1][currentX] === 1 || grid[currentY][currentX  - 1]) {
                        currentY = grid.length - 1;
                    }
                }
            }
        };

        currentY++;
    } else {
        currentX = startingPosX;
        currentY = startingPosY;
        
        shape = randint(0, 2);

        if (shape === 0) {
            currentY = 0
        } else if (shape === 1) {
            currentY = 1
        } else if (shape === 2) {
            currentY = 2
        }


        if (grid[startingPosY][startingPosX] === 1) {
            grid = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
        };

        checklines()

        if (checklines()) {
            grid.pop();
            grid.unshift([0, 0, 0, 0, 0]);
        };
    };

    basic.pause(speed);
})

//spawn, kolize, 