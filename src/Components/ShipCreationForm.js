import React, {Component} from "react";

export default class ShipCreationForm extends Component{
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.onChangeShipName = this.onChangeShipName.bind(this);
        this.onChangeShipCallsign = this.onChangeShipCallsign.bind(this);
        this.onChangeShipCaptain = this.onChangeShipCaptain.bind(this);
        this.onChangeShipDocktime = this.onChangeShipDocktime.bind(this);

        this.state = {
            shipName: "",
            shipCallsign: "",
            shipCaptain: "",
            shipDockTime: '',
        }
    }

    onChangeShipName(e){
        this.setState({shipName: e.target.value})
    }

    onChangeShipCallsign(e){
        this.setState({shipCallsign: e.target.value})
    }

    onChangeShipCaptain(e){
        this.setState({shipCaptain: e.target.value})
    }

    onChangeShipDocktime(e){
        this.setState({shipDockTime: e.target.value})
    }

    onFormSubmit(e){
        let shipList = localStorage.getItem("shipList") || [];

        if (typeof(shipList) === 'string'){
            shipList = JSON.parse(shipList);
        }

        shipList.push(this.state);

        localStorage.setItem("shipList", JSON.stringify(shipList));

        e.preventDefault();

        this.setState({
            shipName: "",
            shipCallsign: "",
            shipCaptain: "",
            shipDockTime: "",
            threat: "green",
        })
    }

    render(){
        return(
            <div className={"form-container"}>
                <form onSubmit={this.onFormSubmit} style={{width: "80%", display: "inline-block"}}>
                    <div style={{overflow: "hidden"}}>
                        <div className="form-group" style={{float: "left", width: "33%"}}>
                            <label>Ship Name</label>
                            <input required type="text" className="form-control" value={this.state.shipName} onChange={this.onChangeShipName}/>
                        </div>
                        <div className="form-group" style={{float: "left", width: "33%"}}>
                            <label>Ship Callsign</label>
                            <input required type="text" className="form-control" value={this.state.shipCallsign} onChange={this.onChangeShipCallsign}/>
                        </div>
                        <div className="form-group" style={{float: "left", width: "33%"}}>
                            <label>Ship Captains Name</label>
                            <input type="text"  className="form-control" value={this.state.shipCaptain} onChange={this.onChangeShipCaptain}/>
                        </div>
                    </div>

                    <br/>

                    <div className="form-group">
                        <label >Ship dock time</label>
                        <input type="time" value={this.state.shipDockTime} onChange={this.onChangeShipDocktime}/>
                    </div>

                    <br/>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
