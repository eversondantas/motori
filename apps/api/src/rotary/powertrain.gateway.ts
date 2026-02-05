import { VehicleStatus, EngineConfiguration } from '@motori/shared-types';
import { Controller, Get, Post, Body } from '@nestjs/common';

import { TorqueCalculator } from './torque.calculator';

interface TorqueRequest {
  torqueInput: number;
  rpmInput: number;
}

@Controller('powertrain')
export class PowertrainGateway {
  constructor(private torqueCalc: TorqueCalculator) {}

  @Get('status')
  retrieveSystemStatus(): VehicleStatus {
    const defaultConfig: EngineConfiguration = {
      cylinderLayout: 'v-shaped',
      cylinderQuantity: 8,
      displacementCubicCentimeters: 5000,
      aspirationType: 'turbocharged',
      fuelDelivery: 'direct-injection',
    };

    const samplePower = this.torqueCalc.calculatePowerFromTorque(450, 5500);

    return {
      engineConfiguration: defaultConfig,
      currentPower: samplePower,
      operationalMode: 'cruising',
      diagnosticCodes: [],
    };
  }

  @Post('calculate')
  computePowerMetrics(@Body() request: TorqueRequest) {
    const powerData = this.torqueCalc.calculatePowerFromTorque(
      request.torqueInput,
      request.rpmInput
    );

    const fuelRate = this.torqueCalc.estimateFuelConsumption(powerData, 3600);

    return {
      powerOutput: powerData,
      estimatedFuelPerHour: fuelRate,
      efficiency: (powerData.kilowattRating / fuelRate) * 100,
    };
  }

  @Get('health')
  checkHealth() {
    return {
      status: 'operational',
      turbineTemp: 85,
      oilPressure: 65,
      coolantTemp: 90,
    };
  }
}
