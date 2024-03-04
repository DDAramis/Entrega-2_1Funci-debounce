export function hello(): string {
    return 'Hello, World'
}


 
// 1:

type BandaDeColores = 'Black' | 'Brown' | 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Violet' | 'Grey' | 'White';

//2:
const ColorAndNumber: {[buscar in BandaDeColores]: string } = {
  "Black": "0", 
  "Brown": "1", 
  "Red": "2",
  "Orange": "3",
  "Yellow": "4",
  "Green": "5",
  "Blue": "6",
  "Violet": "7",
  "Grey": "8",
  "White": "9",
};

//3:
export function ValorColor(map: string): string {
    return ColorAndNumber[map as BandaDeColores] || "Error: Color no válido";
 
};



export function CombinarColores(combinar:string[]): number {
    const [color1, color2] = combinar;
    const Combinacion = ValorColor(color1) + ValorColor(color2);
    return Number(Combinacion);
};



//4:
 function debounce(func:(colores: string[]) => number, wait: number): (colores:string[]) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;


//5:     
    return function(combinar: string[]) {
        const later = () => {
            timeoutId = null;
            func(combinar);
        }
//6:
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
    };
  
 }
 
 const CombinacionSinCrona = debounce(CombinarColores, 500);

// 7:
 CombinacionSinCrona(['Blue', 'Red']);

  