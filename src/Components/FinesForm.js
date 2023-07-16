import React, {Component} from "react";

export default class FinesForm extends Component{
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.onBaseFineChange = this.onBaseFineChange.bind(this);
        this.onMinimumFineChange = this.onMinimumFineChange.bind(this);
        this.onFineIncrementChange = this.onFineIncrementChange.bind(this);
        this.onFineIntervalChange = this.onFineIntervalChange.bind(this);

        this.state = {
            baseFine: 0,
            minimumFine: 0,
            fineIncrement: 0,
            fineInterval: 0
        }
    }

    onBaseFineChange(e){
        this.setState({baseFine: e.target.value});
    }

    onMinimumFineChange(e){
        this.setState({minimumFine: e.target.value});
    }

    onFineIncrementChange(e){
        this.setState({fineIncrement: e.target.value});
    }

    onFineIntervalChange(e){
        this.setState({fineInterval: e.target.value});
    }

    onFormSubmit(e){
        e.preventDefault();

        localStorage.setItem("fine", JSON.stringify(this.state));
    }

    render(){
        return(
            <div className={"form-container"}>
                <form onSubmit={this.onFormSubmit} style={{width: "80%", display: "inline-block"}}>
                    <div style={{overflow: "hidden"}}>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Base Fine</label>
                            <input required type="number" className="form-control" value={this.state.baseFine} onChange={this.onBaseFineChange}/>
                        </div>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Minimum Fine</label>
                            <input required type="number" className="form-control" value={this.state.minimumFine} onChange={this.onMinimumFineChange}/>
                        </div>
                    </div>
                    <div style={{overflow: "hidden"}}>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Fine Increment</label>
                            <input required type="number"  className="form-control" value={this.state.fineIncrement} onChange={this.onFineIncrementChange}/>
                        </div>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Fine interval</label>
                            <input required type="number" className="form-control" value={this.state.fineInterval} onChange={this.onFineIntervalChange}/>
                        </div>
                    </div>

                    <br/>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onSubmit={this.onFormSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
