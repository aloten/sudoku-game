public class SudokuMove {

    private int row;
    private int col;
    private int val;

    /**
     * Constructor assigns each attribute of the move
     * @param row
     * @param col
     * @param val
     */
    public SudokuMove(int row, int col, int val) {
        this.row = row;
        this.col = col;
        this.val = val;
    } // end of SudokuMove constructor method

    public int getRow() {
        return row;
    }

    public int getCol() {
        return col;
    }

    public int getVal() {
        return val;
    }

    @Override
    public String toString() {
        return "SudokuMove{" +
                "row=" + row +
                ", col=" + col +
                ", val=" + val +
                '}';
    }
} // end of SudokuMove class
