type ValueOrFunction<T> = T | ((i: number) => T);

export const createArray = <T>(size: number, value: ValueOrFunction<T>) => {
  const arr = new Array(size);
  return [...arr].map((i) => {
    if (value instanceof Function) {
      return value(i);
    }

    return value;
  });
};
