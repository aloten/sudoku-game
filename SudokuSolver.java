import java.util.ArrayDeque;

/**
 * This class runs an algorithm that solves the sudoku puzzle. The solve method is
 * supported by multiple helper methods to keep solve() concise.
 *
 * @author Aidan Loten
 */
public class SudokuSolver {

    private SudokuPuzzle p;
    private ArrayDeque<SudokuMove> stack = new ArrayDeque<SudokuMove>();


    /**
     * Constructor
     * @param p SudokuPuzzle
     */
    public SudokuSolver(SudokuPuzzle p) {
        this.p = p;
    } // end of SudokuSolver Constructor method

    /**
     * Iterate through values 1-9 in specific location on board.
     * If one value is a valid move, return the move with the value.
     * Else if no moves are valid, return null.
     * @param row
     * @param col
     * @param digit is the value of the move just popped off the stack if backtracking, else 0
     * @return a valid SudokuMove or null
     */
    public SudokuMove getValidMove(int row, int col, int digit) {
        for (int val = digit + 1; val < p.getBOARD_LENGTH() + 1; val++) {
            SudokuMove move = new SudokuMove(row, col, val);
            if (p.isValidMove(move)) {
                return move;
            }
        }

        return null;
    } // end of getValidMove method

    /**
     * Update the board p and push move to stack
     * @param move
     */
    public void playMove(SudokuMove move) {
        p.updateBoard(move); // update board
        stack.push(move); // push move to stack
    } // end playMove method

    /**
     * Pop the last move off the stack and reset the value at the location of
     * the last move to 0.
     * @return value of popped move
     */
    public int backtrack() {
        SudokuMove lastMove = stack.pop();
        return lastMove.getVal();

    } // end of backtrack method

    /**
     * Update the board by resetting the location of the popped move to 0
     * @param move
     */
    public void reset(SudokuMove move) {
        SudokuMove reset = new SudokuMove(move.getRow(), move.getCol(), 0);
        p.updateBoard(reset);
    } // end of reset method


    /**
     * While puzzle does not equal solution, iterate through SudokuPuzzle p's board.
     * 1) If value on the board == 0, get a valid move
     * 2) If not backtracking, get a valid move starting from value 1 (pass a 0 for the method)
     * 3) Else when backtracking, get a valid move starting from value of last move.
     * 4) If move != null, play move, else backtrack: reset the last move by peeking the stack
     *    then iterate over the board from [0][0] until you get to a zero.
     */
    public void solve(SudokuPuzzle solution) {

        boolean backtrack = false;

        while (!p.equals(solution)) {
            for (int row = 0; row < p.getBOARD_LENGTH(); row++) {
                for (int col = 0; col < p.getBOARD_LENGTH(); col++) {
                    if (p.getBoard()[row][col] == 0) {
                        SudokuMove move;
                        if (backtrack == false) {
                            move = getValidMove(row, col, 0);
                        } else {
                            move = getValidMove(row, col, backtrack());
                            backtrack = false;
                        }

                        if (move != null) {
                            playMove(move);
                        } else {
                            backtrack = true;
                            SudokuMove lastMove = stack.peek();
                            reset(lastMove);
                            row = -1;
                            break;
                        }
                    }
                } // end inner loop

            } // end outer loop

        } // end of while loop

    } // end of solve method

    public SudokuPuzzle getP() {
        return p;
    }

    @Override
    public String toString() {
        return "SudokuSolver{" +
                "p=\n" + p +
                '}';
    } // end of toString method


} // end of SudokuSolver class
