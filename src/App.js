import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import ShipCreationForm from "./Components/ShipCreationForm";
import FinableDisplay from "./Components/FinableDisplay";
import FinesForm from "./Components/FinesForm";

function App() {
  return (
    <div className="App" style={{overflow: "hidden"}}>
        <div className={"halfWidth"} style={{float: "left"}}>
            <ShipCreationForm />
            <FinesForm />
        </div>
        <div className={"halfWidth"} style={{float: "left"}}>
            <FinableDisplay />
        </div>
    </div>
  );
}

export default App;
