export class GradienteAritmetico {

    static calcularValorPresente(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number
    ): number {

        const factor1 =
            (1-(Math.pow(1 + interes, -numeroPeriodos))) / interes;
        // console.log(`El Factor 1 es: ${factor1}`);
        const factor2 =
        ((1-(Math.pow(1 + interes, -numeroPeriodos))) / interes) - numeroPeriodos / Math.pow(1 + interes, numeroPeriodos);
        // console.log(`El Factor 2 es: ${factor2}`);

        const valorPresente = primeraCuota * (factor1) + (tasaCrecimiento / interes) * (factor2);

        return valorPresente;
    }

    static calcularValorFuturo(
        primeraCuota: number,
        interes: number,
        numeroPeriodos: number,
        tasaCrecimiento: number
    ): number {


        console.log(`El Primera cuota--*--: ${primeraCuota}`);
        console.log(`El numero de periodos----: ${numeroPeriodos}`);
        console.log(`interes----: ${interes}`);
        console.log(`tasa de crecimiento----: ${tasaCrecimiento}`);

        const factor1 =
            (Number(primeraCuota) * ((Math.pow(1 + interes, numeroPeriodos) - 1) / interes));
            
        const factor2 = ((tasaCrecimiento) / interes)*(((Math.pow(1 + interes, numeroPeriodos) - 1) / interes)-(numeroPeriodos/Math.pow(1 + interes, numeroPeriodos)));
        console.log(`El Factor 1 es: ${factor1}`);
        console.log(`El Factor 2 es: ${factor2}`);

        const valorFuturo = (factor1 + factor2) * (1 - interes);
        return valorFuturo;
    }

}
