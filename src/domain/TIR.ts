export class TIR {
  static calcularTir(
    flujoEfectivo: number,
    data: {
      primerFlujo: number;
      segundoFlujo: number;
      tercerFlujo: number;
      cuartoFlujo: number;
      quintoFlujo: number;
      sextoFlujo: number;
    }
  ): number {
    const {
      primerFlujo,
      segundoFlujo,
      tercerFlujo,
      cuartoFlujo,
      quintoFlujo,
      sextoFlujo,
    } = data;
    const sumatoria =
      segundoFlujo + tercerFlujo + cuartoFlujo + quintoFlujo + sextoFlujo;
    const discriminante =
      primerFlujo * primerFlujo - 4 * flujoEfectivo * sumatoria;

    if (discriminante > 0) {
      const x1 =
        (-primerFlujo + Math.sqrt(discriminante)) / (2 * flujoEfectivo);
      const x2 =
        (-primerFlujo - Math.sqrt(discriminante)) / (2 * flujoEfectivo);
      if (x1 > 0) {
        return x1;
      }
      if (x2 > 0) {
        return x2;
      }
    }
    return 0;
  }

  static calcularInteresRetorno(
    data: {
      primerFlujo: number;
      segundoFlujo: number;
      tercerFlujo: number;
      cuartoFlujo: number;
      quintoFlujo: number;
      sextoFlujo: number;
    },
    flujosDeEfectivo: number,
    tir: number
  ): number {
    const {
      primerFlujo,
      segundoFlujo,
      tercerFlujo,
      cuartoFlujo,
      quintoFlujo,
      sextoFlujo,
    } = data;

    const p1 = Math.pow(1 + tir, 1);
    const p2 = Math.pow(1 + tir, 2);
    const p3 = Math.pow(1 + tir, 3);
    const p4 = Math.pow(1 + tir, 4);
    const p5 = Math.pow(1 + tir, 5);
    const p6 = Math.pow(1 + tir, 6);
    let res = flujosDeEfectivo + primerFlujo / p1 + segundoFlujo / p2;
    if (primerFlujo && segundoFlujo && tercerFlujo) {
      console.log("entre en la funcion 3");

      res =
        flujosDeEfectivo +
        primerFlujo / p1 +
        segundoFlujo / p2 +
        tercerFlujo / p3;
    }
    if (primerFlujo && segundoFlujo && tercerFlujo && cuartoFlujo) {
      console.log("entre en la funcion 4");

      res =
        flujosDeEfectivo +
        primerFlujo / p1 +
        segundoFlujo / p2 +
        tercerFlujo / p3 +
        cuartoFlujo / p4;
    }
    if (
      primerFlujo &&
      segundoFlujo &&
      tercerFlujo &&
      cuartoFlujo &&
      quintoFlujo
    ) {
      console.log("entre en la funcion 5");

      res =
        flujosDeEfectivo +
        primerFlujo / p1 +
        segundoFlujo / p2 +
        tercerFlujo / p3 +
        cuartoFlujo / p4 +
        quintoFlujo / p5;
    }

    if (
      primerFlujo &&
      segundoFlujo &&
      tercerFlujo &&
      cuartoFlujo &&
      quintoFlujo &&
      sextoFlujo
    ) {
      console.log("entre en la funcion 6");

      res =
        flujosDeEfectivo +
        primerFlujo / p1 +
        segundoFlujo / p2 +
        tercerFlujo / p3 +
        cuartoFlujo / p4 +
        quintoFlujo / p5 +
        sextoFlujo / p6;
    }
    return res;
  }
}
