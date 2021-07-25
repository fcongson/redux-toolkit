import React, { useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  amountAdded,
  decremented,
  incremented,
  resetted,
} from "./features/counter/counter-slice";
import { useFetchBreedsQuery } from "./features/dogs/dogs-api-slice";
import logo from "./logo.svg";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  const handleClickIncremented = () => {
    dispatch(incremented());
  };
  const handleClickAmountAdded = (amount: number) => {
    dispatch(amountAdded(amount));
  };
  const handleClickDecremented = () => {
    dispatch(decremented());
  };
  const handleClickResetted = () => {
    dispatch(resetted());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClickIncremented}>
            increment
          </button>
          <button
            type="button"
            onClick={() => {
              handleClickAmountAdded(3);
            }}
          >
            add 3
          </button>
          <button type="button" onClick={handleClickDecremented}>
            decrement
          </button>
          <button type="button" onClick={handleClickResetted}>
            reset
          </button>
        </p>
        <h2>count is: {count}</h2>

        <div>
          <p>
            Dogs to fetch:
            <select
              value={numDogs}
              onChange={(e) => setNumDogs(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </p>
        </div>

        <div>
          <h2>
            Number of dogs fetched: {isFetching ? "fetching..." : data.length}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <img src={breed.image.url} alt={breed.name} height={250} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
