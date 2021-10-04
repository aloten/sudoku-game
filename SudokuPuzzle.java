import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

/**
 *  hold and manage the 2-D array
 *  provide external representation of the internal board
 *  validMove
 *  makeMove
 *  are all the squares filled in maybe isPuzzleSolved
 *  check if it is equal to solution
 *
 * @author Aidan Loten
 */
public class SudokuPuzzle {

    int BOARD_LENGTH = 9;
    private int[][] board = new int[BOARD_LENGTH][BOARD_LENGTH];

    /**
     * Constructor
     * @param filename
     */
    public SudokuPuzzle(String filename) {
        readFile(filename);
    } // end of constructor method

    /**
     * Read in the unsolved sudoku file and create board array
     * @param filename
     */
    public int[][] readFile(String filename) {
        Scanner scan;
        try {
            scan = new Scanner(new File("puzzles/" + filename + ".txt"));

        } catch (Exception e) {
            System.out.println("Failed to read file");
            return null;
        }

        while (scan.hasNextInt()) {
            for (int i = 0; i < BOARD_LENGTH; i++) {
                for (int j = 0; j < BOARD_LENGTH; j++) {
                    board[i][j] = scan.nextInt();
                }
            }
        }
        return board;

    } // end of readFile method

    /**
     * Checks for equivalence between unsolved sudoku board and solution
     * @param obj
     * @return false if not equal, else true
     */
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof SudokuPuzzle) {
            SudokuPuzzle p2 = (SudokuPuzzle) obj;
            for (int i = 0; i < BOARD_LENGTH; i++) {
                for (int j = 0; j < BOARD_LENGTH; j++) {
                    if (board[i][j] != p2.board[i][j]) {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }

        return true;
    } // end of equals method

    /**
     * Check for valid move on board. Move is valid if the value is not in the row, col, or box.
     * @param move
     * @return true if valid, else false
     */
    public boolean isValidMove(SudokuMove move) {
        int row = move.getRow();
        int col = move.getCol();
        int val = move.getVal();

        // check for valid in row or column
        for (int k = 0; k < BOARD_LENGTH; k++) {
            if (board[row][k] == val) {
                return false;
            }
            if (board[k][col] == val) {
                return false;
            }
        }

        // check for valid in box
        for (int i = 0; i < BOARD_LENGTH; i++) {
            for (int j = 0; j < BOARD_LENGTH; j++) {
                if (i / 3 == row / 3 && j / 3 == col / 3) {
                    if (board[i][j] == val) {
                        return false;
                    }
                }
            }
        }
        return true;

    } // end isValidMove method

    /**
     * Change the value on the board specified by given move.
     * @param move
     */
    public void updateBoard(SudokuMove move) {
        int row = move.getRow();
        int col = move.getCol();
        int val = move.getVal();

        board[row][col] = val;

    } // end updateBoard method

    /**
     * Getter for Board length constant
     * @return # of columns OR # of rows (since they are equal in a square)
     */
    public int getBOARD_LENGTH() {
        return BOARD_LENGTH;
    }

    /**
     * Getter for board
     * @return board
     */
    public int[][] getBoard() {
        return board;
    }

    /**
     * toString method that creates custom board representation
     * @return String
     */
    @Override
    public String toString() {
        String results = "";
        for (int i = 0; i < BOARD_LENGTH; i++) {
            for (int j = 0; j < BOARD_LENGTH; j++) {
                if (board[i][j] == 0) {
                    results += "_ ";
                } else {
                    results += board[i][j] + " ";
                }

                if ((j + 1) % 3 == 0) {
                    results += "  ";
                }
            }
            results += "\n";
            if ((i + 1) % 3 == 0) {
                results += "\n";
            }
        }

        return results;
    } // end toString method

} // end of SudokuPuzzle class
