
export class GradienteGeometrico {
    // 
    static calcularValorPresenteGradienteGeometrico(
        primeraCuota: number,
        interes: number,
        tasaCrecimiento: number,
        numeroPeriodos: number,
        
    ): number {

        if (tasaCrecimiento != interes) {
            const factor1 = 1 - ((Math.pow(1 + tasaCrecimiento, numeroPeriodos)) / (Math.pow(1 + 0.0583, numeroPeriodos)));
            const factor2 = 0.0583 - tasaCrecimiento;
            console.log(`VALOR FACTOR 1: ${factor1.toFixed(2)}`);
            const valorPresente = primeraCuota * (factor1) / factor2;
            return valorPresente;

        } else {
            return (numeroPeriodos * primeraCuota) / (1 + interes);
        }
    }

    static calcularValorFuturoGradienteGeometrico(
        primeraCuota: number,
        interes: number,
        tasaCrecimiento: number,
        numeroPeriodos: number): number {
        if (tasaCrecimiento !== interes) {
            const factor1 = (Math.pow(1 + tasaCrecimiento, numeroPeriodos));
            const resultado = (primeraCuota / (tasaCrecimiento - interes)) * (Math.pow(1 + tasaCrecimiento, numeroPeriodos) - Math.pow(1 + interes, numeroPeriodos));
            console.log(`El FUUUUUTURO: ${factor1.toFixed(2)}`);
            return resultado;

        } else {
            return primeraCuota / Math.pow(1 + interes, -numeroPeriodos + 1);
        }
    }

    static calcularValorPresenteGradienteGeometricoInfinito(
        primeraCuota: number,
        interes: number,
        tasaCrecimiento: number,
        
    ): number {
        console.log(`El FUUUUUTURO: ${interes.toFixed(3)}`);
    console.log(`El FUUUUUTURO: ${tasaCrecimiento.toFixed(2)}`);
        const resultado = primeraCuota/(interes - tasaCrecimiento);
        console.log(`El FUUUUUTURO: ${resultado.toFixed(2)}`);
        return resultado;
    }
}