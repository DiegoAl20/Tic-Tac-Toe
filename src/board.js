class Juego {
    comprobarGanadorHorizontal(tablero, valor) {
        if (tablero[0][0] === valor && tablero[0][1] === valor && tablero[0][2] === valor) {
            return true;
        }

        if (tablero[1][0] === valor && tablero[1][1] === valor && tablero[1][2] === valor) {
            return true;
        }

        if (tablero[2][0] === valor && tablero[2][1] === valor && tablero[2][2] === valor) {
            return true;
        }

        return false;
    }

    comprobarGanadorVertical(tablero, valor) {
        if (tablero[0][0] === valor && tablero[1][0] === valor && tablero[2][0] === valor) {
            return true;
        }

        if (tablero[0][1] === valor && tablero[1][1] === valor && tablero[2][1] === valor) {
            return true;
        }

        if (tablero[0][2] === valor && tablero[1][2] === valor && tablero[2][2] === valor) {
            return true;
        }

        return false;
    }

    comprobarGanadorDiagonal(tablero, valor) {
        if (tablero[0][0] === valor && tablero[1][1] === valor && tablero[2][2] === valor) {
            return true;
        }

        if (tablero[0][2] === valor && tablero[1][1] === valor && tablero[2][0] === valor) {
            return true;
        }


        return false;
    }
}

class Tablero {
    constructor() {
        this.tablero = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }

    asignarValor(y, x, valor) {
        if (this.tablero[y][x] === "") {
            this.tablero[y][x] = valor;
            return;
        }

        return;
    }

    limpiarTablero() {
        for (let i = 0; i < this.tablero.length; i++) {
            for (let j = 0; j < this.tablero[i].length; j++) {
                this.tablero[i][j] = "";
            }
        }
    }

    estadoTablero() {
        console.log(this.tablero);
    }
}

// Lógica del DOM
const modal = document.getElementById("modal");
const modalWinner = document.querySelector(".modal-winner");
const modalInformation = document.querySelector(".modal-information");
const buttonClose = document.querySelector(".play-again");
const textInformation = document.querySelector("#text-player");
const boardCells = document.querySelectorAll(".table-cell");

let turn = "X";
let gameEnded = false;
let counter = 0;
let tablero = new Tablero();
let juego = new Juego();

function displayModal(turn, gameEnded) {
    if (gameEnded) {
        modalWinner.textContent = turn;
        modalInformation.textContent = "¡Es el ganador!";
    } else {
        modalWinner.textContent = "";
        modalInformation.textContent = "¡Es un empate!";
    }
    modal.style.display = "flex";
}

buttonClose.addEventListener('click', function () {
    tablero.limpiarTablero();
    turn = "X";
    gameEnded = false;
    counter = 0;
    textInformation.textContent = "Turn of X";
    boardCells.forEach((cell) => {
        cell.textContent = "";
    })
    modal.style.display = "none";
});

// Asignar los turnos
document.addEventListener('click', (e) => {
    if (gameEnded) return;

    let clickedElement = e.target;
    let getId = e.target.id;
    const positions = getId.split("-");

    if (clickedElement.matches(".table-cell")) {
        if (!clickedElement.textContent) {

            if (turn === "X") {
                clickedElement.classList.remove("color-red");
                clickedElement.classList.add("color-blue");
            } else {
                clickedElement.classList.remove("color-blue");
                clickedElement.classList.add("color-red");
            }

            // Poner los elementos en pantalla y en el tablero.
            clickedElement.textContent = turn;
            tablero.asignarValor(positions[0], positions[1], turn);
            counter++;
            
            // Comprobando ganador o cambiar el turno
            if (juego.comprobarGanadorHorizontal(tablero.tablero, turn)
                || juego.comprobarGanadorVertical(tablero.tablero, turn)
                || juego.comprobarGanadorDiagonal(tablero.tablero, turn)) 
                {
                    textInformation.textContent = `El ganador es ${turn}`;
                    gameEnded = true;
                    displayModal(turn, gameEnded);
                } else if (counter === 9) {
                    textInformation.textContent = "Es un empate";
                    displayModal(turn, gameEnded);
                } else {
                    turn = (turn === "X") ? "O" : "X";
                    textInformation.textContent = (turn === "X") ? "Turn of X" : "Turn of O";
                }
        }
    }
});