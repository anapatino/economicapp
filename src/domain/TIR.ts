export class TIR {
  static calcularTIR(flujosDeEfectivo: number[], inversionInicial: number, iteraciones = 1000, tolerancia = 0.00001): number {
    let tasaBaja = 0;
    let tasaAlta = 1;
    let tir: number = 0; // Inicializado con un valor por defecto, ya que el tipo es number

    for (let i = 0; i < iteraciones; i++) {
      const tasaPromedio = (tasaBaja + tasaAlta) / 2;
      const vpn = -inversionInicial + flujosDeEfectivo.reduce((acumulador, flujo, j) => acumulador + flujo / Math.pow(1 + tasaPromedio, j + 1), 0);

      if (Math.abs(vpn) < tolerancia) {
        tir = tasaPromedio;
        break;
      }

      if (vpn > 0) {
        tasaBaja = tasaPromedio;
      } else {
        tasaAlta = tasaPromedio;
      }
    }

    if (isNaN(tir) || tir === Infinity || tir === -Infinity) {
      throw new Error('No se pudo calcular la TIR');
    }

    return tir;
  }

  static calcularInversionInicial(flujosDeEfectivo: number[], tir: number): number {
    return flujosDeEfectivo.reduce((acumulador, flujo, t) => acumulador + flujo / Math.pow(1 + tir, t), 0);
  }
}
