import React, {Component} from "react";

export default class FinesForm extends Component{

    playAudio(){
        let audio = document.getElementById("audio");

        if (audio === null || audio.src === undefined){
            console.log("!!!");
            return;
        }

        audio.play();
    }
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.onBaseFineChange = this.onBaseFineChange.bind(this);
        this.onMinimumFineChange = this.onMinimumFineChange.bind(this);
        this.onFineIncrementChange = this.onFineIncrementChange.bind(this);
        this.onFineIntervalChange = this.onFineIntervalChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onAudioFileSelected = this.onAudioFileSelected.bind(this);

        window.addEventListener("playAudio", () => {
            this.playAudio();
        })

        this.state = {
            baseFine: 0,
            minimumFine: 0,
            fineIncrement: 0,
            fineInterval: 0,
            maxDockTime: 10,
        }
    }

    onAudioFileSelected(e){
        let aud = document.getElementById("audio");
        aud.src = URL.createObjectURL(e.target.files[0]);
        aud.load();
    }

    onBaseFineChange(e){
        this.setState({baseFine: parseInt(e.target.value)});
    }

    onMinimumFineChange(e){
        this.setState({minimumFine: parseInt(e.target.value)});
    }

    onFineIncrementChange(e){
        this.setState({fineIncrement: parseInt(e.target.value)});
    }

    onFineIntervalChange(e){
        this.setState({fineInterval: parseInt(e.target.value)});
    }

    onTimeChange(e){
        this.setState({maxDockTime: parseInt(e.target.value)});
    }

    onFormSubmit(e){
        e.preventDefault();

        localStorage.setItem("fine", JSON.stringify(this.state));

        window.dispatchEvent(new Event("storage"));
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

                    <div>
                        <label>Fine after</label>
                        <input required type="number" className="form-control" value={this.state.maxDockTime} onChange={this.onTimeChange}/>
                    </div>

                    <br/>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onSubmit={this.onFormSubmit}>Submit</button>
                    </div>

                    <br/>

                    <div>
                        <input id="audioSelector" type="file" accept={"audio/*"} onChange={this.onAudioFileSelected}/>
                    </div>

                    <br/>
                </form>
            </div>
        )
    }
}
