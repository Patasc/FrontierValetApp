import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import ShipCreationForm from "./Components/ShipCreationForm";
import FinableDisplay from "./Components/FinableDisplay";
import FinesForm from "./Components/FinesForm";
import ShipsDisplay from "./Components/ShipsDisplay";

function App() {
  return (
    <div className="App">
        <div  style={{overflow: "hidden", border: "1px solid black"}}>
            <div className={"halfWidth"} style={{float: "left", border: "1px solid black"}}>
                <ShipCreationForm />
                <FinesForm />
            </div>
            <div className={"halfWidth"} style={{float: "left", border: "1px solid black"}}>
                <FinableDisplay />
            </div>
        </div>
        <div style={{border: "1px solid black"}}>
            <ShipsDisplay />
        </div>
    </div>
  );
}

export default App;
