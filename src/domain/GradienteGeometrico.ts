
export class GradienteAritmetico {
    static calcularValorPresenteGradienteGeometrico(A: number, G: number, i: number, n: number): number {
        if (G !== i) {
            return (A / (G - i)) + ((Math.pow(1 + G, n) / Math.pow(1 + i, n)) - 1);
        } else {
            return (n * A) / (1 + i);
        }
    }

    static calcularValorFuturoGradienteGeometrico(A: number, G: number, i: number, n: number): number {
        if (G !== i) {
            return (A / (G - i)) + (Math.pow(1 + G, n) - Math.pow(1 + i, n));
        } else {
            return A / Math.pow(1 + i, -n + 1);
        }
    }

    static calcularValorPresenteGradienteGeometricoInfinito(A: number, G: number, i: number): number {
        if (G < i) {
            return A / (i - G);
        } else {
            throw new Error("La fórmula no es válida, G debe ser menor que i.");
        }
    }

    /*

    const A = 250000; // Valor del flujo de efectivo en el primer período
    const G = 0.04; // Gradiente geométrico
    const i = 0.12;  // Tasa de interés 
    const n = 11;    // Número de períodos en meses

    const resultado = calcularValorPresenteGradienteGeometrico(A, G, i, n);
    console.log(`El valor presente es: ${resultado.toFixed(2)}`);
    */
}