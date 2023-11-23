export class GradienteAritmetico {

    static calcularValorPresente(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number,
        newData:number
    ): number {

        const factor1 =
            (1 - (Math.pow(1 + interes, -numeroPeriodos))) / interes;
        const factor2 =
            ((1 - (Math.pow(1 + interes, -numeroPeriodos))) / interes) - numeroPeriodos / Math.pow(1 + interes, numeroPeriodos);
        const valorPresente = primeraCuota * (factor1) + (tasaCrecimiento / interes) * (factor2);

        console.log(`El Factor 1 es: ${newData}`);
        console.log(`El Factor 2 es: ${factor2}`);

        return valorPresente;
    }
    
    static calcularValorPresenteAnticipado(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number
    ): number {

        const factor1 =
            (1 - (Math.pow(1 + interes, -numeroPeriodos))) / interes;
        const factor2 =
            ((1 - (Math.pow(1 + interes, -numeroPeriodos))) / interes) - numeroPeriodos / Math.pow(1 + interes, numeroPeriodos);
        const valorPresente = (primeraCuota * (factor1) + (tasaCrecimiento / interes) * (factor2))*(1+interes);
         console.log(`El Factor 1 es: ${factor1}`);
        console.log(`El Factor 2 es: ${factor2}`);
        return valorPresente;
    }

    static calcularValorFuturo(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number,
        newData:number
    ): number {
        // console.log(`El Primera cuota--*--: ${primeraCuota}`);
        // console.log(`El numero de periodos----: ${numeroPeriodos}`);
        // console.log(`interes----: ${interes}`);
        // console.log(`tasa de crecimiento----: ${tasaCrecimiento}`);
        interes = interes/newData
        const factor1 =
            (Number(primeraCuota) * ((Math.pow(1 + interes, numeroPeriodos) - 1) / interes));

        const factor2 =  ((Math.pow(1 + interes, numeroPeriodos) - 1) / interes)-numeroPeriodos;
        console.log(`El Factor 1 es: ${factor1}`);
        console.log(`El Factor 1 es: ${factor2}`);
        console.log(`El Factor 2 es: ${(tasaCrecimiento/interes)*factor2}`);

        const valorFuturo = (factor1 + (tasaCrecimiento/interes)*factor2);
        return valorFuturo;
    }

    static calcularValorFuturoAnticipado(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number
    ): number {
        const factor1 =
            (Number(primeraCuota) * ((Math.pow(1 + interes, numeroPeriodos) - 1) / interes));

        const factor2 =  (tasaCrecimiento/interes)*(((Math.pow(1 + interes, numeroPeriodos) - 1) / interes)-numeroPeriodos);
        console.log(`El Factor 1 es: ${factor1}`);
        console.log(`El Factor 2 es: ${factor2}`);
        
        const valorFuturo = (factor1 + factor2)*(1+interes);
        return valorFuturo;
    }
    static calcularCuotaPeriodicaUniforme(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number,
        newData:number
    ): number {

        interes = interes/newData
        const factor3 = tasaCrecimiento/interes;
        const factor1 =  ((Math.pow(1 + interes, numeroPeriodos) - 1) / interes);
        const factor2 =((Math.pow(1 + interes, numeroPeriodos) - 1) / interes)-numeroPeriodos;

        
        console.log(`El Factor 1 es: ${factor1}`);
        console.log(`El Factor 2 es: ${factor2}`);
        
        const valorFuturo = (primeraCuota - (factor3 * factor2))/factor1;
        return valorFuturo;
    }


    static calcularValorPresenteInfinito(
        primeraCuota: number,
        interes: number,
        tasaCrecimiento: number,
        // numeroPeriodos: number,
    ): number {
        const factor1 = (primeraCuota/interes);
        const factor2 =  tasaCrecimiento/(Math.pow(interes, 2));
        console.log(`INFINITO: ${factor2}`);
        const valorFuturo = (factor1 + factor2);
        return valorFuturo;
    }

}
