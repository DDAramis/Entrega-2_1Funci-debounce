import { debounce, CombinarColores, ValorColor, hello } from '../src/colores';

jest.useFakeTimers();

describe('debounce function', () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn().mockImplementation(CombinarColores);
    debouncedFunc = debounce(func, 500);
  });

  test('executes just once within the delay period', () => {
    for (let i = 0; i < 5; i++) {
      debouncedFunc(['Red', 'Green']);
    }

    jest.advanceTimersByTime(499);
    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(['Red', 'Green']);
  });

  test('passes the correct parameters to the debounced function', () => {
    debouncedFunc(['Blue', 'Yellow']);
    jest.runAllTimers();
    expect(func).toHaveBeenCalledWith(['Blue', 'Yellow']);
  });

  test('executes only the last call when called multiple times in quick succession', () => {
    debouncedFunc(['Black', 'White']);
    jest.advanceTimersByTime(200); 
    debouncedFunc(['Green', 'Red']); 
    jest.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(['Green', 'Red']);
  });
});

describe('Función hello', () => {
    test('says hello world', () => {
        expect(hello()).toEqual('Hello, World');
    });
});

describe('Función ValorColor', () => {
    test('devolviendo el valor de un color', () => {
        expect(ValorColor('Red')).toEqual('2');
        expect(ValorColor('Blue')).toEqual('6');
    });

    test('"Error: Color no válido" en caso de que no haya colores', () => {
        expect(ValorColor('Magenta')).toEqual("Error: Color no válido");
    });
});

describe('Función CombinarColores', () => {
    test('combina valores de colores', () => {
        expect(CombinarColores(['Red', 'Blue'])).toEqual(26);
        expect(CombinarColores(['Green', 'Violet'])).toEqual(57);
    });

    test('colores no validos devuelven NaN', () => {
        expect(CombinarColores(['Red', 'Magenta'])).toBeNaN();
    });
});
