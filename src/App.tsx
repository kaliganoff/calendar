import { useEffect, useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import CardsList from "./components/CardsList/CardsList";
import Header from "./components/Header/Header";

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
    return (
      <>
        <Header />
        <CardsList />
      </>
    );
  }

  return <StartScreen />;
}

export default App;
