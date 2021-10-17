//react
import { useState } from "react";
//helpers
import {
  isNonNegativeInteger,
  isRowsAndColsLessThan,
  isValid2dArray,
} from "../../helpers/validateInput";
//styles
import "./main.css";

export default function Input({ createNewPlane }) {
  const [seats, setSeats] = useState("");
  const [passengers, setPassengers] = useState("");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const passenger = +passengers;
    const bracketsRegex = /(\[*\]*)/g;
    const seat = seats.split(/\s*]\s*,\s*\[\s*/).map((ele) => {
      const arr = ele.replace(bracketsRegex, "").split(",");
      return [+arr[0], +arr[1]];
    });
    if (!formIsValid(seat, passenger)) {
      return;
    }
    createNewPlane(seat, passenger);
    setModal(!modal);
  };

  const formIsValid = (seat, passenger) => {
    if (!isNonNegativeInteger(passenger)) {
      setError({ error: "Passengers must be at least 0." });
      return false;
    }
    if (
      !isValid2dArray(seat, isRowsAndColsLessThan, 5, 100) ||
      seat.length >= 5
    ) {
      setError({
        error: "Seats must be a valid array according to above rules.",
      });
      return false;
    }
    setError({ error: null });
    return true;
  };

  const modalHandler = () => {
    setModal(!modal);
    setError({ error: null });
  };

  return (
    <div className="input">
      <button onClick={modalHandler}>Create New Airplane</button>
      {modal && (
        <div className="modalShow">
          <form>
            <h2>Create New Airplane</h2>
            <h3>Note:</h3>
            <ul>
              <li>Row numbers and no of seat blocks must be below 5.</li>
              <li>Col numbers must be below 100.</li>
            </ul>
            <label>Seats [Row, Column]</label>
            <input
              type="text"
              placeholder="[3, 2], [4, 3], [2, 3], [3, 4]"
              required
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
            <label>No of passengers</label>
            <input
              type="number"
              placeholder="30"
              required
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
            <button onClick={handleSubmit}>Create</button>
            <button onClick={modalHandler} className="cancel">
              Cancel
            </button>
            {error
              ? error.error !== null && (
                  <div className="errorMsg">
                    <p>{error.error}</p>
                  </div>
                )
              : null}
          </form>
        </div>
      )}
    </div>
  );
}
