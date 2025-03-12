import React, { useState } from "react";
import SensorGraph from "../../components/SensorGraph";
import "./Select.css";

const Select = () => {
  const [sensorIndex, setSensorIndex] = useState(0);
  const [isGraphActive, setIsGraphActive] = useState(true); // Controls graph visibility

  const handleSensorIndexChange = (e) => {
    setSensorIndex(Number(e.target.value)); 
  };

  return (
    <div className="select">
        <div className="back-button-container">
            <button onClick={() => window.history.back()} className="back-button">
                {
                    `Back`
                }
            </button>
        </div>
        <div className="select-container">
            <div className="select-data">
                <div className="project-data">
                    {new Date().toLocaleString()}
                </div>
                
                <div className="select-sensor">
                    <h3>Select Sensor</h3>
                    <select onChange={handleSensorIndexChange} name="sensors" id="sensor-select">
                        {[...Array(17).keys()].map((i) => (
                            <option key={i} value={i}>{`Sensor ${i + 1}`}</option>
                        ))}
                    </select>
                </div>

                <div className="active-deactive">
                    <button 
                        className={`active ${isGraphActive ? "active-selected" : ""}`} 
                        onClick={() => setIsGraphActive(true)}
                    >
                        Active
                    </button>
                    <button 
                        className={`deactive ${!isGraphActive ? "deactive-selected" : ""}`} 
                        onClick={() => setIsGraphActive(false)}
                    >
                        Deactive
                    </button>
                </div>
            </div>

            <div className="graph">
                {isGraphActive && sensorIndex >= 0 && sensorIndex < 18 && (
                    <SensorGraph sensorIndex={sensorIndex} sensorName={`Sensor ${sensorIndex + 1}`} />
                )}
                {
                    !isGraphActive && (
                        <div className="deactive-graph">
                            <h1>
                                Graph is Deactivated
                            </h1>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  );
};

export default Select;
