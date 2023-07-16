import React, {Component} from "react";

export default class FinesForm extends Component{
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            baseFine: "",
            minimumFine: "",
            fineIncrement: "",
            fineInterval: ""
        }
    }

    onFormSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className={"form-container"}>
                <form onSubmit={this.onFormSubmit} style={{width: "80%", display: "inline-block"}}>
                    <div style={{overflow: "hidden"}}>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Base Fine</label>
                            <input required type="number" className="form-control" defaultValue={0}/>
                        </div>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Minimum Fine</label>
                            <input required type="number" className="form-control" defaultValue={0}/>
                        </div>
                    </div>
                    <div style={{overflow: "hidden"}}>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Fine Increment</label>
                            <input required type="number"  className="form-control" defaultValue={0}/>
                        </div>
                        <div className="form-group" style={{float: "left", width: "50%"}}>
                            <label>Fine interval</label>
                            <input required type="number" className="form-control" defaultValue={0}/>
                        </div>
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
