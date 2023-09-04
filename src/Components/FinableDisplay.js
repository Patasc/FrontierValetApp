import React, {Component} from "react";

export default class FinableDisplay extends Component{

    constructor(props) {
        super(props);

        window.dispatchEvent(new Event('playAudio'));

        let shipList = localStorage.getItem("shipList") || [];
        let fineRate = JSON.parse(localStorage.getItem("fine")) || {baseFine: 0, minimumFine: 0, fineIncrement: 0, fineInterval: 0, maxDockTime: 10,};

        // I can't just call this.updateShipList, darn optimisations !
        if (typeof(shipList) === 'string'){
            shipList = JSON.parse(shipList);
        }

        this.state = {
            shipList: shipList,
            fine: fineRate
        }

        window.addEventListener("storage", () => {
            this.updateShipList();
            this.updateFineAmount();
        })
    }

    updateShipList(){
        let shipList = localStorage.getItem("shipList") || [];

        if (typeof(shipList) === 'string'){
            shipList = JSON.parse(shipList);
        }

        this.setState({shipList: shipList});
    }

    updateFineAmount(){
        let fineRate = JSON.parse(localStorage.getItem("fine")) || {baseFine: 0, minimumFine: 0, fineIncrement: 0, fineInterval: 0, maxDockTime: 10,};
        this.setState({fine: fineRate});
    }

    getShipDockTimer(ship){
        let secondsDocked = (new Date()) - new Date(ship.shipDockTime);

        return Math.floor(secondsDocked / 1000);
    }

    getDockedShipsOrderedByStayTime(){
        let temp = this.state.shipList;
        temp = temp.sort((a, b) => (this.getShipDockTimer(a) > this.getShipDockTimer(b) ? 1 : -1)).slice(0, 7);
        temp = temp.filter((ship) => ship.docked);
        return temp.reverse();
    }

    getFineAmount(ship){
        if (this.getShipDockTimer(ship) === -1) return 0;

        let minutesDocked = Math.floor(this.getShipDockTimer(ship) / 60);
        let fine = this.state.fine["baseFine"];
        minutesDocked -= this.state.fine.maxDockTime;

        if (minutesDocked < 0){
            return 0;
        }

        let incrementalAmount = 0;

        if (this.state.fine.fineInterval > 0) {
            incrementalAmount = Math.floor(minutesDocked / this.state.fine.fineInterval) * this.state.fine.fineIncrement;
        }

        return Math.max(this.state.fine.minimumFine, fine + incrementalAmount);
    }

    maybePadNumber(number){
        if (number < 10){
            return "0" + number;
        }

        return number;
    }

    onShipUndock(id){
        let shipList = this.state.shipList;

        for (let i in shipList){
            if (shipList[i].id === id){
                console.log("Fine applied");

                shipList[i].unpaidFines += this.getFineAmount(shipList[i]);
                shipList[i].docked = false;
                shipList[i].lastLevel = 0;

                localStorage.setItem("shipList", JSON.stringify(shipList));
                window.dispatchEvent(new Event("storage"));

                return;
            }
        }
    }


    // If only it were that easy
    applyStyle(ship){
        let dangerLevel = ship.threat;
        let secondsStayed = this.getShipDockTimer(ship);
        let classes = "";

        if (dangerLevel === "Red"){
            classes += "red"
        }
        else if (dangerLevel === "Blue"){
            classes += "blue"
        }

        if (secondsStayed > (this.state.fine.maxDockTime * 60)){
            classes += " toFine";

            if (ship.lastLevel !== 2){
                ship.lastLevel = 2;
                window.dispatchEvent(new Event("playAudio"));

                // Don't fire off event to avoid possible edge case weirdness ? Plus is an 'internal' value to this component
                localStorage.setItem("shipList", JSON.stringify(this.state.shipList));
            }
        }

        else if (secondsStayed > (this.state.fine.maxDockTime * 60) / 2){
            classes += " toFineSoon";

            if (ship.lastLevel === 0){
                ship.lastLevel = 1;
            }
        }

        return classes;
    }



    componentDidMount() {
        this.interval = setInterval(() => this.setState({time: Date.now()}), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return(
            <div className={"form-container"}>
                <table>
                    <tr>
                        <th>Time docked</th>
                        <th>Ship Name</th>
                        <th>Ship Callsign</th>
                        <th>Ship Captain</th>
                        <th>Fine amount</th>
                        <th>Undock</th>
                    </tr>
                    {
                        this.getDockedShipsOrderedByStayTime().map((ship) => {
                            return (
                                <tr className={this.applyStyle(ship)}>
                                    <td>{Math.floor(this.getShipDockTimer(ship) / 60)}:{this.maybePadNumber(this.getShipDockTimer(ship) % 60)}</td>
                                    <td>{ship.shipName}</td>
                                    <td>{ship.shipCallsign}</td>
                                    <td>{ship.shipCaptain}</td>
                                    <td>{this.getFineAmount(ship)}</td>
                                    <td>
                                        <div>
                                            <button style={{width: "80%"}} className="halfWidth" onClick={event => this.onShipUndock(ship.id)}>Undock</button>
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
