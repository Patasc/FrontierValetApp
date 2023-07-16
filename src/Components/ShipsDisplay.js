import React, {Component} from "react";

export default class ShipsDisplay extends Component{
    constructor(props) {
        super(props);

        let shipList = localStorage.getItem("shipList") || [];

        // I can't just call this.updateShipList, darn optimisations !
        if (typeof(shipList) === 'string'){
            shipList = JSON.parse(shipList);
        }

        this.state = {
            ships: shipList,
            threats: {},
        }

        window.addEventListener("storage", () => {
            this.updateShipList();
        })
    }

    updateShipList(){
        let shipList = localStorage.getItem("shipList") || [];

        if (typeof(shipList) === 'string'){
            shipList = JSON.parse(shipList);
        }

        this.setState({ships: shipList});
    }

    getFormattedTime(timeObject){
        timeObject = new Date(timeObject);

        let hour = timeObject.getHours();
        let minutes = timeObject.getMinutes();

        if (minutes < 10){
            minutes = "0" + minutes;
        }

        return hour + ":" + minutes;
    }

    onThreatChange(id, threatLevel){
        let shipList = this.state.ships;

        for (let i in shipList){
            if (shipList[i].id === id){
                shipList[i].threat = threatLevel;

                localStorage.setItem("shipList", JSON.stringify(shipList));
                window.dispatchEvent(new Event("storage"));

                return;
            }
        }
    }

    onDockStatusChange(id, dockStatus){
        let shipList = this.state.ships;

        for (let i in shipList){
            if (shipList[i].id === id){
                if (dockStatus === "docked") {
                    shipList[i].shipDockTime = new Date();
                }

                shipList[i].docked = (dockStatus === "docked");

                localStorage.setItem("shipList", JSON.stringify(shipList));
                window.dispatchEvent(new Event("storage"));

                return;
            }
        }
    }

    onShipRemoval(id){
        let shipList = this.state.ships;
        let newList = [];

        for (let i in shipList){
            if (shipList[i].id !== id){
                newList.push(shipList[i]);
            }
        }

        localStorage.setItem("shipList", JSON.stringify(newList));
        window.dispatchEvent(new Event("storage"));
    }

    onFineRemoval(id){
        let shipList = this.state.ships;

        for (let i in shipList){
            if (shipList[i].id === id){
                shipList[i].unpaidFines = 0;

                localStorage.setItem("shipList", JSON.stringify(shipList));
                window.dispatchEvent(new Event("storage"));

                return;
            }
        }
    }

    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th>Ship Name</th>
                        <th>Ship Callsign</th>
                        <th>Ship Captain</th>
                        <th>Posed Threat</th>
                        <th>Last Docked</th>
                        <th>Unpaid Fines</th>

                        <th>Dock Status</th>
                        <th>Edit threat level</th>
                        <th>Remove Fines</th>
                        <th>Remove ship</th>
                    </tr>

                    {
                        this.state.ships.map((ship) => {
                            return (
                                <tr>
                                    <td>{ship.shipName}</td>
                                    <td>{ship.shipCallsign}</td>
                                    <td>{ship.shipCaptain}</td>
                                    <td>{ship.threat}</td>
                                    <td>{this.getFormattedTime(ship.shipDockTime)}</td>
                                    <td>{ship.unpaidFines}</td>

                                    <td>
                                        <div>
                                            <button className="halfWidth" onClick={event => this.onDockStatusChange(ship.id, "docked")}>Dock</button>
                                        </div>

                                        <div>
                                            <button className="halfWidth" onClick={event => this.onDockStatusChange(ship.id, "undocked")}>Undock</button>
                                        </div>
                                    </td>

                                    <td>
                                        <div style={{overflow: "hidden"}}>
                                            <div className={"halfWidth"} style={{float: "left"}}><label>Green</label></div>
                                            <div className={"halfWidth"} style={{float: "left"}}><input name="threat" type='radio' onInput={event => this.onThreatChange(ship.id, "Green")}/></div>
                                        </div>

                                        <div style={{overflow: "hidden"}}>
                                            <div className={"halfWidth"} style={{float: "left"}}><label>Blue</label></div>
                                            <div className={"halfWidth"} style={{float: "left"}}><input name="threat" type='radio' onInput={event => this.onThreatChange(ship.id, "Blue")}/></div>
                                        </div>

                                        <div style={{overflow: "hidden"}}>
                                            <div className={"halfWidth"} style={{float: "left"}}><label>Red</label></div>
                                            <div className={"halfWidth"} style={{float: "left"}}><input name="threat" type='radio' onInput={event => this.onThreatChange(ship.id, "Red")}/></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button className="halfWidth" onClick={event => this.onFineRemoval(ship.id)}>Remove Outstanding Fines</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button className="halfWidth" onClick={event => this.onShipRemoval(ship.id)}>Remove Ship</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
        )
    }
}