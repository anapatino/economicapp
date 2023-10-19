
export class GradienteGeometrico {
    // 
    static calcularValorPresenteGradienteGeometrico(
        primeraCuota: number,
        interes: number,
        tasaCrecimiento: number,
        numeroPeriodos: number
    ): number {

        // Cuando G es diferente de i
        const factor1 = 1 - ((Math.pow(1 + tasaCrecimiento, numeroPeriodos)) / (Math.pow(1 + 0.0583, numeroPeriodos)));
        const factor2 = 0.0583 - tasaCrecimiento;
        console.log(`VALOR FACTOR 1: ${factor1.toFixed(2)}`);
        const valorPresente = primeraCuota * (factor1) / factor2;
        


        //   const denominador = 1 - tasaCrecimiento;
        //   const factorDescuento = Math.pow((1 + tasaCrecimiento) / (1 + tasaInteres), numeroPeriodos);
        //   const valorPresente = (primerPago / denominador) * (1 - factorDescuento);
        return valorPresente;

    }

    static calcularValorFuturoGradienteGeometrico(
        primeraCuota: number,
        interes: number,
        tasaCrecimiento: number,
        numeroPeriodos: number): number {
        if (tasaCrecimiento !== interes) {
            const factor1 = (Math.pow(1 + tasaCrecimiento, numeroPeriodos) );
            const resultado = (primeraCuota / (tasaCrecimiento - interes)) * (Math.pow(1 + tasaCrecimiento, numeroPeriodos) - Math.pow(1 + interes, numeroPeriodos));
            console.log(`El FUUUUUTURO: ${factor1.toFixed(2)}`);
            return resultado;
            
        } else {
            return primeraCuota / Math.pow(1 + interes, -numeroPeriodos + 1);
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