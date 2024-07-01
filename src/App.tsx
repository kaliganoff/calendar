import React, { useEffect, useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";

function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return <StartScreen />;
}

export default App;
