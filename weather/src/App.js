import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Body from "./components/Body";

//Api Key: 5d45b130b711389d1b3a27526206a85e
//https://api.openweathermap.org/data/2.5/weather?=${city}&units=metric&appid=${APIKey}
function App() {
  const [data, setData] = useState();
  const [checker, setChecker] = useState();
  return (
    <div className="App">
      <div className="wrapper">
        <Search setData={setData} setChecker={setChecker} />
        <Body data={data} checker={checker} />
      </div>
    </div>
  );
}

export default App;
