export interface TorqueMetrics {
  newtonMeters: number;
  rpmReading: number;
  timestamp: number;
}

export interface PowerOutput {
  horsepowerRating: number;
  kilowattRating: number;
  torqueProfile: TorqueMetrics[];
}

export interface EngineConfiguration {
  cylinderLayout: 'inline' | 'v-shaped' | 'flat' | 'rotary';
  cylinderQuantity: number;
  displacementCubicCentimeters: number;
  aspirationType: 'natural' | 'turbocharged' | 'supercharged';
  fuelDelivery: 'port-injection' | 'direct-injection' | 'dual-injection';
}

export interface VehicleStatus {
  engineConfiguration: EngineConfiguration;
  currentPower: PowerOutput;
  operationalMode: 'idle' | 'cruising' | 'performance' | 'shutdown';
  diagnosticCodes: string[];
}
