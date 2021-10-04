import java.io.File;
import java.util.Scanner;

/**
 *  Handle all I/O
 *  Prompt the user for file name
 *  read the file in
 *  create a SudokuPuzzle object
 *  hand off to the SudokuSolver to actually solve the puzzle
 *  check the solution for correctness
 *
 * @author Aidan Loten
 */
public class SudokuTest {

    public static void main(String[] args) {
        SudokuPuzzle sudoku = new SudokuPuzzle("s5");
        SudokuPuzzle solution = new SudokuPuzzle("s5-solution");

        SudokuSolver solver = new SudokuSolver(sudoku);
        System.out.println(solver); // print out unsolved board
        solver.solve(solution);
        if (solution.equals(solver.getP())) {
            System.out.println(solver); // print out solved board
            System.out.println("Solution is correct!");
        } else {
            System.out.println("I made a mistake (almost certainly), or the solution is incorrect");
        }

    } // end of main method

} // end of SudokuTest class
