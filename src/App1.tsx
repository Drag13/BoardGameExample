import "./App.css";
import { useReducer } from "react";

type CarState = {
  carName: string;
  speed: number;
  crashed: boolean;
};

type Action = { type: "speedUp" | "slowDown" };
const MAX_SPEED = 30;
const SPEED_INCREMENT = 10;

function slowDownCar({ carName, speed }: CarState) {
  const nextSpeed = speed - SPEED_INCREMENT;

  return nextSpeed <= 0
    ? { carName, speed: 0, crashed: false }
    : { carName, speed: nextSpeed, crashed: false };
}

function speedUpCar(state: CarState) {
  const { carName, speed } = state;
  const nextSpeed = speed + SPEED_INCREMENT;

  if (speed > MAX_SPEED) return { carName, crashed: true, speed: 0 };
  return { carName, crashed: false, speed: nextSpeed };
}

function reducer(state: CarState, action: Action): CarState {
  switch (action.type) {
    case "slowDown":
      return slowDownCar(state);
    case "speedUp":
      return speedUpCar(state);
  }
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, {
    carName: "lanos",
    crashed: false,
    speed: 0,
  });

  const { carName, crashed, speed } = data;

  const speedUp = () => dispatch({ type: "speedUp" });
  const slowDown = () => dispatch({ type: "slowDown" });

  return (
    <main className="App">
      <h1>
        {carName} {crashed ? "BROKEN" : speed}
      </h1>
      <button type="button" onClick={speedUp}>
        SpeedUp
      </button>
      <button onClick={slowDown}>Slowdown</button>
    </main>
  );
};

export default App;
