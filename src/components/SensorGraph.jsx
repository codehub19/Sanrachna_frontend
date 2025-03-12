import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { io } from "socket.io-client";
import "./SensorGraph.css";

Chart.register(...registerables);

const SensorGraph = ({ sensorIndex, sensorName }) => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const newSocket = io("https://sanrachna-backend.vercel.app/");

    newSocket.on("sensorUpdate", (newData) => {
      const sensorValue = newData[`sensor_${sensorIndex + 1}`];

      if (sensorValue !== undefined) {
        setSensorData((prev) => [...prev.slice(-2046), sensorValue]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [sensorIndex]);

  const chartData = {
    labels: sensorData.map((_, i) => `T${i + 1}`),
    datasets: [
      {
        label: sensorName,
        data: sensorData.length ? sensorData : [0], 
        borderColor: "skyblue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="sensor-graph">
      <h3 style={{color:"red"}}>{sensorName}</h3>
      <Line data={chartData} />
    </div>
  );
};

export default SensorGraph;
