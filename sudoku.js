

            var og_grid_dict = {
              c00 : 4, c01 : 3, c02 : 5, c03 : 2, c04 : 0, c05 : 0, c06 : 7, c07 : 8, c08 : 1,
              c10 : 6, c11 : 0, c12 : 2, c13 : 5, c14 : 7, c15 : 0, c16 : 4, c17 : 9, c18 : 3,
              c20 : 0, c21 : 9, c22 : 7, c23 : 8, c24 : 3, c25 : 4, c26 : 5, c27 : 6, c28 : 2,
              c30 : 8, c31 : 2, c32 : 6, c33 : 0, c34 : 9, c35 : 5, c36 : 3, c37 : 4, c38 : 7,
              c40 : 0, c41 : 7, c42 : 4, c43 : 6, c44 : 8, c45 : 2, c46 : 9, c47 : 1, c48 : 5,
              c50 : 9, c51 : 5, c52 : 1, c53 : 7, c54 : 4, c55 : 3, c56 : 6, c57 : 0, c58 : 8,
              c60 : 5, c61 : 0, c62 : 9, c63 : 3, c64 : 2, c65 : 0, c66 : 0, c67 : 7, c68 : 4,
              c70 : 2, c71 : 4, c72 : 8, c73 : 0, c74 : 5, c75 : 7, c76 : 1, c77 : 3, c78 : 6,
              c80 : 7, c81 : 6, c82 : 3, c83 : 4, c84 : 1, c85 : 8, c86 : 2, c87 : 5, c88 : 9
            }

            var cur_grid_dict = Object.assign({}, og_grid_dict);

            var solution_dict = {};


            class Dropdown extends React.Component {

                constructor(props) {
                    super(props);
                    this.state = {
                        response: ""
                    }
                }

                render() {
                    return (
                        <div c>
                            <input onChange={this.updateResponse} value={this.state.response} maxlength="1"/>
                        </div>
                    );
                }

                // function to update response variable of state
                updateResponse = (event) => {
                    this.setState({
                        response: event.target.value
                    });
                    
                    const num = parseInt(event.target.value);
                    if (num > 0 && num < 10) {
                        cur_grid_dict[event.target.parentElement.parentElement.id] = num;
                    }
                }
            } // end Dropdown class
            
            // function to add dropdown menus for each non filled out square
            function addDropdown(cell) {
                if (document.querySelector('#c' + cell).innerHTML === "0") {
                    ReactDOM.render(<Dropdown />, document.querySelector('#c' + cell));
                }
            }

            function showBoard(cell, dict) {
                document.querySelector('#c' + cell).innerHTML = dict['c' + cell];
            }
            
            var generatedBool = false;

            function generateBoard() {
                // add dictionary to html and add component to each mutable cell in table
                if (generatedBool === false) {
                    for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        let cell = i + "" + j;
                        showBoard(cell, og_grid_dict);
                        addDropdown(cell);
                    }
                }
                generatedBool = true;
                }
            } // end generateBoard method
            

            
            // reset grid to og_grid_dict
            document.getElementById("reset").addEventListener("click", function() {
                location.reload();
            });

            function convertBoard(dict) {
                let board = [];
                for (let i = 0; i < 9; i++) {
                    board.push([]);
                    for (let j = 0; j < 9; j++) {
                        board[i].push(dict["c" + i + j]);
                    }
                }
                return board;
            }

            // Holds logic for sudoku puzzle
            class SudokuPuzzle {
                constructor(dict) {
                    this.dict = Object.assign({}, dict);
                    this.board = convertBoard(this.dict);
                }

                getBoard() {
                    return this.board;
                }

                // check if board === solution board
                equals(SudokuPuzzle) {
                    let incorrectArr = [];
                    for (let i = 0; i < 9; i++) {
                        for (let j = 0; j < 9; j++) {
                            if (SudokuPuzzle.getBoard()[i][j] !== this.getBoard()[i][j]) {
                                incorrectArr.push("c" + i + "" + j);
                            }
                        }
                    }
                    return incorrectArr;
                }

                isValidMove(SudokuMove) {
                    let row = SudokuMove.getRow();
                    let col = SudokuMove.getCol();
                    let val = SudokuMove.getVal();

                    // check for valid in row or col
                    for (let k = 0; k < 9; k++) {
                        if (this.getBoard()[row][k] === val) {
                            return false;
                        }
                        if (this.getBoard()[k][col] === val) {
                            return false;
                        }
                    }

                    // check for valid in box
                    for (let i = 0; i < 9; i++) {
                        for (let j = 0; j < 9; j++) {
                            if (Math.floor(i / 3) === Math.floor(row / 3 ) && Math.floor(j / 3) === Math.floor(col / 3)) {
                                if (this.getBoard()[i][j] === val) {
                                    return false;
                                }
                            }
                        }
                    }
                    return true;
                } // end isValidMove method

                updateBoard(SudokuMove) {
                    let row = SudokuMove.getRow();
                    let col = SudokuMove.getCol();
                    let val = SudokuMove.getVal();

                    this.board[row][col] = val;
                }
            } // end SudokuPuzzle class

            class SudokuMove {
                constructor(row, col, val) {
                    this.row = row;
                    this.col = col;
                    this.val = val;
                }

                getRow() {
                    return this.row;
                }

                getCol() {
                    return this.col;
                }

                getVal() {
                    return this.val;
                }
            }

            class SudokuSolver {
                constructor(SudokuPuzzle) {
                    this.p = SudokuPuzzle;
                    this.stack = [];
                }

                // Iterate through values 1-9 in specific location on board.
                // If one value is a valid move, return the move with the value.
                // Else if no moves are valid, return null.
                getValidMove(row, col, digit) {
                    for (let val = digit + 1; val < 9 + 1; val++) {
                        let move = new SudokuMove(row, col, val);
                        if (this.p.isValidMove(move)) {
                            return move;
                        }
                    }
                    return null;
                }

                playMove(SudokuMove) {
                    this.p.updateBoard(SudokuMove);
                    this.stack.push(SudokuMove);
                }

                backtrack() {
                    let lastMove = this.stack.pop();
                    return lastMove.getVal();
                }

                reset(move) {
                    let reset = new SudokuMove(move.getRow(), move.getCol(), 0);
                    this.p.updateBoard(reset);
                }

                solve() {

                    var backtrack = false;

                    do {
                        for (var row = 0; row < 9; row++) {
                            for (var col = 0; col < 9; col++) {
                                if (this.p.getBoard()[row][col] === 0) {
                                    var move;
                                    if (backtrack === false) {
                                        move = this.getValidMove(row, col, 0);
                                    } else {
                                        move = this.getValidMove(row, col, this.backtrack());
                                        backtrack = false;
                                    }
                                    
                                    if (move !== null) {
                                        this.playMove(move);
                                    } else {
                                        backtrack = true;
                                        let lastMove = this.stack[this.stack.length - 1];
                                        this.reset(lastMove)
                                        row = -1;
                                        break;
                                    }
                                }
                            } // end inner loop
                        } // end outer loop
                    } while (row !== 9 && col !== 8 && backtrack !== true); // while not at end of board and not backtracking
                } // end solve method

               getP() {
                   return this.p;
               } 

            } // end SudokuSolver class

            // check grid/user inputs on "check" button click
            function check() {
                if (generatedBool === true && solvedBool === false) {
                    solve();
                    let sudoku = new SudokuPuzzle(cur_grid_dict);
                    let solution = new SudokuPuzzle(solution_dict);

                    let incorrectArr = sudoku.equals(solution);
                    if (incorrectArr.length === 0) {
                        // console.log("Solved!");
                    } else {
                        // console.log("Incorrect");
                        for (let i = 0; i < incorrectArr.length; i++) { // changes background color of incorrect inputs to red
                            document.querySelector("#" + incorrectArr[i]).firstChild.firstChild.style.background = "red";
                        }

                        let inputs = document.querySelectorAll("input");
                        for (let i = 0; i < inputs.length; i++) { // changes background color correct inputs back to white
                            if (parseInt(inputs[i].value) === solution_dict[inputs[i].parentElement.parentElement.id]) {
                                inputs[i].style.background = "white";
                            }
                        }
                    }
                } // end if "generated" check
                
            } // end check method

            var solvedBool = false;

            // solves sudoku on "solve" and "check" button clicks
            function solve() {
                if (generatedBool === true && solvedBool === false) {
                    let sudoku = new SudokuPuzzle(og_grid_dict);
                    console.log(og_grid_dict);
                    let solver = new SudokuSolver(sudoku);
                    solver.solve();
                    
                    for (var i = 0; i < 9; i++) { // translate solution from board to dict
                        for (var j = 0; j < 9; j++) {
                            solution_dict["c" + i + "" + j] = solver.getP().getBoard()[i][j];
                        }
                    }

                    // iff solve() is being called by solve button, then show solution and show input numbers w/ green background
                    let id = event.target.id;
                    if (id === "solve") {
                        for (var i = 0; i < 9; i++) {
                            for (var j = 0; j < 9; j++) {
                                let cell = i + "" + j;
                                showBoard(cell, solution_dict);
                                showGreen(cell);
                            }
                        }
                        solvedBool = true; // to know "solve" button was clicked for check method
                    }
                } // end if "generated" check

                
                
            } // end global solve method

            function showGreen(cell) {
                let inputs = document.querySelectorAll("input");
                for (let i = 0; i < inputs.length; i++) {
                    if (og_grid_dict['c' + cell] === 0) {
                        document.querySelector('#c' + cell).style.background = "green";
                    }
                }
            } // end showGreen method

            // fetch('http://127.0.0.1:5000/Sudoku1')
            // .then(response => response.json())
            // .then(data => console.log(data));
