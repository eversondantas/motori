import { Module } from '@nestjs/common';

import { PowertrainGateway } from './powertrain.gateway';
import { TorqueCalculator } from './torque.calculator';

@Module({
  controllers: [PowertrainGateway],
  providers: [TorqueCalculator],
})
export class RotaryHub {}
