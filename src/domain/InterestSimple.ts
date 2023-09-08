export class InterestSimple {
  static calculateFutureValue(
    data: { capital: number; interestRate: number },
    time: number,
    isChecked: boolean
  ): number {
    const { capital, interestRate } = data;
    const decimalRate = interestRate / 100;
    let newFutureValue: number;

    if (isChecked) {
      newFutureValue = capital * (1 + decimalRate * time);
    } else {
      newFutureValue = capital * decimalRate * time;
    }
    return newFutureValue;
  }

  static calculateInterest(
    data: { interestEarned: number; interestRate: number },
    time: number
  ): number {
    const { interestEarned, interestRate } = data;
    let capital = (interestEarned / (interestRate * time)) * 100;
    return capital;
  }

  static calculateCapital(
    data: { interestEarned: number; interestRate: number },
    time: number
  ): number {
    const { interestEarned, interestRate } = data;
    let capital = (interestEarned / (interestRate * time)) * 100;
    return capital;
  }

  static calculateInterestRate(
    data: { capital: number; interestEarned: number },
    time: number
  ): number {
    const { capital, interestEarned } = data;
    let interestRate = (interestEarned / (capital * time)) * 100;
    return interestRate;
  }

  static calculateTime(
    data: { capital: number; interestEarned: number; interestRate: number },
    showTime: string
  ): { años: number; meses: number; días: number } {
    const { capital, interestEarned, interestRate } = data;
    let time = (interestEarned / (capital * interestRate)) * 100;
    time = time * 360;

    const años = Math.floor(time / 360);
    const díasRestantes = time % 360;
    const meses = Math.floor(díasRestantes / 30);
    const días = Math.round(díasRestantes % 30);

    return { años, meses, días };
  }
}
