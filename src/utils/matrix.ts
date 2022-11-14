import { createArray } from "./array";

export type Matrix<T> = T[][];

export const createMatrix = <T>(
  size: number,
  val: T | ((index: number) => T)
): Matrix<T> => createArray(size, () => createArray(size, val));

export const setMatrixValue = <T>(
  matrix: Matrix<T>,
  newValue: T,
  line: number,
  column: number
) =>
  matrix.map((l, lineIndex) =>
    l.map((oldValue, columnIndex) =>
      lineIndex === line && column === columnIndex ? newValue : oldValue
    )
  );
