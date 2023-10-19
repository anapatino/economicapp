export class TIR {
  static calculateTIR(
    cashFlows: number[],
    initialInvestment: number,
    iterations: number = 1000,
    tolerance: number = 0.00001
  ): number | undefined {
    let lowerRate = 0;
    let upperRate = 1;
    let irr: number | undefined = undefined;

    for (let i = 0; i < iterations; i++) {
      const averageRate = (lowerRate + upperRate) / 2;
      let npv = -initialInvestment;

      for (let j = 0; j < cashFlows.length; j++) {
        npv += cashFlows[j] / Math.pow(1 + averageRate, j + 1);
      }

      if (Math.abs(npv) < tolerance) {
        irr = averageRate;
        break;
      }

      if (npv > 0) {
        lowerRate = averageRate;
      } else {
        upperRate = averageRate;
      }
    }

    return irr;
  }

  static calculateInitialInvestment(cashFlows: number[], tir: number): number {
    let initialInvestment = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      initialInvestment += cashFlows[t] / Math.pow(1 + tir / 100, t);
    }
    console.log(initialInvestment);

    return initialInvestment;
  }
}
