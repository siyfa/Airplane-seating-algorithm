//components
import { useState, useEffect } from "react";
//styles
import "./main.css";

export default function Seat({ data }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="seatDisplay">
      {loading ? (
        <div className="loading">
          <p>Fetching data....</p>
        </div>
      ) : (
        <div className="display">
          {data.seats.map((row, rowI) => {
            return (
              <div key={"row" + rowI} className="seat">
                {row.map((seat, seatI) => {
                  if (Number.isInteger(seat)) {
                    return (
                      <div
                        key={"seat" + seatI}
                        className="ui blue circular label"
                      >
                        {seat}
                      </div>
                    );
                  }
                  if (seat === "seat") {
                    return (
                      <div
                        key={"seat" + seatI}
                        className="ui brown circular label"
                      ></div>
                    );
                  }
                  return (
                    <div
                      key={"seat" + seatI}
                      className="ui white circular label"
                    ></div>
                  );
                })}
              </div>
            );
          })}
          <h4 className="block">
            Remaining Passengers: {data.remainingPassengers}
          </h4>
        </div>
      )}
    </div>
  );
}
