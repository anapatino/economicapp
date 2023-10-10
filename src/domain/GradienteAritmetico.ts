export class GradienteAritmetico {
    static calcularValorPresente(A: number, G: number, i: number, n: number): number {

        const parte1 = A * ((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)));
        const parte2 =
            (G / i) *
            ((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n)) - n / Math.pow(1 + i, n));

        const valorPresente = parte1 + parte2;
        const valorPresente2 = parte1 - parte2;
        return valorPresente;
    }

    static calcularValorFuturo(A: number, G: number, i: number, n: number): number {

        const parte1 = A * ((Math.pow(1 + i, n) - 1) / i);
        const parte2 = (G / i) * ((Math.pow(1 + i, n) - 1) / i - n);

        const valorFuturo = parte1 + parte2;
        const valorFuturo2 = parte1 - parte2;
        return valorFuturo;
    }

    static calcularValorPresenteInfinito(A: number, G: number, i: number): number {
        const valorPresente = (A / i) + (G / (i * i));
        return valorPresente;
    }
/*
const A = 150000; // Pago constante
const G = 10000;  // Pago de gradiente aritmético
const i = 0.03; // Tasa de interés (5%)
const n = 24;    // Número de períodos Meses

const resultado = calcularValorPresente(A, G, i, n);
console.log(`El valor presente es: ${resultado.toFixed(2)}`);*/

}
