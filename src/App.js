//styles
import "./App.css";
//components
import Input from "./components/Input";
import Seat from "./components/Seat";
//hekpers
import AirplaneSeating from "./helpers/seating";
//react
import { useState, useEffect } from "react";
//dummyData
import { inputPassengers, inputSeats } from "./dummyData";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    createNewPlane(inputSeats, inputPassengers);
  }, []);

  const createNewPlane = (inputSeats, inputPassengers) => {
    const airplane = new AirplaneSeating(inputSeats, inputPassengers);
    const seatingData = airplane.autoAssignedSeats;
    setData(seatingData);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Airplane Seating Algorithm Test</h1>
        <Input createNewPlane={createNewPlane} />
        <Seat data={data} />
      </div>
    </div>
  );
}

export default App;
