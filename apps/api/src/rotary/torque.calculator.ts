import { TorqueMetrics, PowerOutput } from '@motori/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TorqueCalculator {
  private readonly horsepowerConstant = 5252;

  calculatePowerFromTorque(torqueNm: number, rpm: number): PowerOutput {
    const torqueLbFt = torqueNm * 0.73756;

    const horsepower = (torqueLbFt * rpm) / this.horsepowerConstant;
    const kilowatts = horsepower * 0.7457;

    const torqueProfile: TorqueMetrics[] = this.generateTorqueCurve(torqueNm, rpm);

    return {
      horsepowerRating: Math.round(horsepower * 10) / 10,
      kilowattRating: Math.round(kilowatts * 10) / 10,
      torqueProfile,
    };
  }

  private generateTorqueCurve(peakTorque: number, peakRpm: number): TorqueMetrics[] {
    const curve: TorqueMetrics[] = [];
    const rpmStep = 500;

    for (let currentRpm = 1000; currentRpm <= 7500; currentRpm += rpmStep) {
      const torqueAtRpm = this.interpolateTorque(currentRpm, peakTorque, peakRpm);

      curve.push({
        newtonMeters: Math.round(torqueAtRpm * 10) / 10,
        rpmReading: currentRpm,
        timestamp: Date.now(),
      });
    }

    return curve;
  }

  private interpolateTorque(rpm: number, peakTorque: number, peakRpm: number): number {
    if (rpm <= 1000) return peakTorque * 0.5;
    if (rpm >= 7000) return peakTorque * 0.7;

    const rpmRatio = rpm / peakRpm;
    const bellCurve = Math.exp(-Math.pow(rpmRatio - 1, 2) / 0.5);

    return peakTorque * (0.5 + 0.5 * bellCurve);
  }

  estimateFuelConsumption(power: PowerOutput, duration: number): number {
    const avgPower = power.kilowattRating;
    const specificConsumption = 0.25;

    return avgPower * specificConsumption * (duration / 3600);
  }
}
