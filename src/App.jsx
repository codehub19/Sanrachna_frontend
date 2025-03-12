import React, { useState, useEffect } from "react";
import SensorGraph from "./components/SensorGraph";
import './App.css'
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Select from "./pages/Select/Select";

const App = () => {

  // useEffect(() => {
  //   fetch("/path/to/sensor_data.json")
  //     .then((res) => res.json())
  //     .then((data) => setSensorData(data))
  //     .catch((error) => console.error("Error fetching sensor data:", error));
  // }, []);

  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        {/* <SensorGraph sensorData={sensorData} sensorIndex={2} sensorName="Sensor 3" /> */}
      </Routes>
      
    </div>
  );
};

export default App;
