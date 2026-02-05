import { VehicleStatus } from '@motori/shared-types';
import React, { useState, useEffect } from 'react';

export const MotoriCockpit: React.FC = () => {
  const [vehicleData, setVehicleData] = useState<VehicleStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchVehicleStatus();
  }, []);

  const fetchVehicleStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/powertrain/status');
      const data = await response.json();
      setVehicleData(data);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to fetch vehicle status:', error);
      setIsConnected(false);
    }
  };

  if (!vehicleData) {
    return (
      <div className="cockpit-container">
        <div className="loading-spinner">
          <h2>🏎️ Initializing Motori Cockpit...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="cockpit-container">
      <header className="cockpit-header">
        <h1>🏎️ Motori Performance Dashboard</h1>
        <div className={`connection-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '● Connected' : '○ Disconnected'}
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Engine Configuration</h3>
          <div className="metric-details">
            <p>
              <strong>Layout:</strong> {vehicleData.engineConfiguration.cylinderLayout}
            </p>
            <p>
              <strong>Cylinders:</strong> {vehicleData.engineConfiguration.cylinderQuantity}
            </p>
            <p>
              <strong>Displacement:</strong>{' '}
              {(vehicleData.engineConfiguration.displacementCubicCentimeters / 1000).toFixed(1)}L
            </p>
            <p>
              <strong>Aspiration:</strong> {vehicleData.engineConfiguration.aspirationType}
            </p>
          </div>
        </div>

        <div className="metric-card">
          <h3>Power Output</h3>
          <div className="metric-details">
            <p className="power-reading">
              {vehicleData.currentPower.horsepowerRating} <span className="unit">HP</span>
            </p>
            <p className="power-reading">
              {vehicleData.currentPower.kilowattRating} <span className="unit">kW</span>
            </p>
          </div>
        </div>

        <div className="metric-card">
          <h3>Operational Status</h3>
          <div className="metric-details">
            <p>
              <strong>Mode:</strong>{' '}
              <span className="status-badge">{vehicleData.operationalMode}</span>
            </p>
            <p>
              <strong>Diagnostics:</strong>{' '}
              {vehicleData.diagnosticCodes.length === 0 ? '✓ All Clear' : 'Issues Detected'}
            </p>
          </div>
        </div>

        <div className="metric-card torque-curve">
          <h3>Torque Profile</h3>
          <div className="curve-visualization">
            {vehicleData.currentPower.torqueProfile.map((point, index: number) => (
              <div
                key={index}
                className="curve-point"
                style={{
                  height: `${(point.newtonMeters / 600) * 100}%`,
                }}
                title={`${point.rpmReading} RPM: ${point.newtonMeters} Nm`}
              />
            ))}
          </div>
        </div>
      </div>

      <button className="refresh-button" onClick={fetchVehicleStatus}>
        🔄 Refresh Data
      </button>
    </div>
  );
};
