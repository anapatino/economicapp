export class InterestCompound {
  static calculateFutureValue(
    data: { capital: number; interestRate: number },
    time: number
  ): number {
    const { capital, interestRate } = data;
    const decimalRate = interestRate / 100;
    const factor = Math.pow(1 + decimalRate, time);
    return capital * factor;
  }

  static calculateInterestEarned(
    data: { capital: number; interestRate: number },
    time: number
  ): number {
    return this.calculateFutureValue(data, time) - data.capital;
  }

  static calculateTotalCapital(
    data: { capital: number; interestRate: number },
    time: number
  ): number {
    return this.calculateFutureValue(data, time);
  }

  static calculateInitialInvestment(
    data: { futureValue: number; interestRate: number },
    time: number
  ): number {
    const { futureValue, interestRate } = data;
    const factor = Math.pow(1 + interestRate / 100, time);
    return futureValue / factor;
  }

  static calculateInterestRate(
    data: { capital: number; futureValue: number },
    time: number
  ): number {
    const { capital, futureValue } = data;
    return (Math.pow(futureValue / capital, 1 / time) - 1) * 100;
  }

  static calculateTime(
    data: { capital: number; futureValue: number; interestRate: number },
    showTime: string
  ): number {
    const { capital, futureValue, interestRate } = data;
    let time = 0;

    if (interestRate !== 0) {
      time = Math.log(futureValue / capital) / Math.log(1 + interestRate / 100);
    }

    switch (showTime) {
      case "years":
        return Math.floor(time);
      case "months":
        return Math.floor(time * 12);
      case "days":
        return Math.floor(time * 365);
      default:
        return 0;
    }
  }
}
