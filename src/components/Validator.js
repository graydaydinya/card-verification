import React, { Component } from "react";
import '../styles/Validator.css'



export default class Validator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardClass: "",
      validationOne: 0,
      validationTwo: 0,
      validationThree: 0,
      validationFour: 0,
      x: 0,
      result: "",
      clicked: 0,
      text: "",
    };
  }

  changeHandler(event) {
    this.setState({text: event.target.value});
    this.state.text.length === 4
      ? (this.setState({text: this.state.text + " "}))
      : this.state.text.length === 9
      ? (this.setState({text: this.state.text + " "}))
      :this.state.text.length === 14
      ? (this.setState({text: this.state.text + " "}))
      :this.state.text.length === 19
      ? (this.setState({x: 1}))
      : (this.setState({text: event.target.value}));

    if (this.state.text.length === 18 && this.state.x === 1) {
      this.setState({text:""});
      this.setState({x: 0});
      this.setState({ cardClass: "", validationFour: 0 });
    }
    event.target.value.replace(/\s+/g, "").match(/^(?:5[1-5][0-9]{14})$/)
      ? this.setState({ cardClass: "masterCard", validationFour: 1 })
      : event.target.value
          .replace(/\s+/g, "")
          .match(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/)
      ? this.setState({ cardClass: "visa", validationFour: 1 })
      :event.target.value.replace(/\s+/g, "").match(/^(?:3[47][0-9]{13})$/)
      ? this.setState({ cardClass: "americanExpress", validationFour: 1 })
      : this.setState({ cardClass: "", validationFour: 0 });
      this.setState({clicked: 0});
  }
  pushOne(event) {
    if (event.target.value.length === event.target.maxLength) {
      this.setState({ validationOne: 1 });
    }
    if (event.target.value.length < event.target.maxLength) {
      this.setState({ validationOne: 0 });
    }
  }
  pushTwo(event) {
    if (event.target.value.length === event.target.maxLength) {
      this.setState({ validationTwo: 1 });
    }
    if (event.target.value.length < event.target.maxLength) {
      this.setState({ validationTwo: 0 });
    }
  }
  pushThree(event) {
    if (event.target.value.length === event.target.maxLength) {
      this.setState({ validationThree: 1 });
    }
    if (event.target.value.length < event.target.maxLength) {
      this.setState({ validationThree: 0 });
    }
  }
clickHandler(){
    if(this.state.validationOne === 1 && this.state.validationTwo === 1 && this.state.validationThree === 1 && this.state.validationFour === 1){
    this.setState({result:"card verified "});
    }
    else{
        this.setState({result:"card not verified"});
    }
    if(this.state.clicked === 0){
    this.setState({clicked: 1});
    }
    else{
    this.setState({clicked: 0});
    this.setState({text: ""}); 
    }
}
  render() {
    return (
        <div>
      <div id="card">
        {this.state.clicked === 0 ?
          <input
        id="number"
          type="text"
          placeholder="0000 0000 0000 0000"
          onChange={this.changeHandler.bind(this)}
          maxLength="19"
          value={this.state.text}
        /> :
        <input
        id="number"
        class="clicked"
          type="text"
          placeholder="0000 0000 0000 0000"
          readonly
          value={this.state.result}
        /> 
        }
        <input
        id="data1"
          type="text"
          placeholder="00"
          maxLength="2"
          onChange={this.pushOne.bind(this)}
        />
        <input
        id="data2"
          type="text"
          placeholder="00"
          maxLength="2"
          onChange={this.pushTwo.bind(this)}
        />
        <input
        id="cvv"
          type="text"
          placeholder="000"
          maxLength="3"
          onChange={this.pushThree.bind(this)}
        />
        {   this.state.clicked === 0 ? <button onClick={this.clickHandler.bind(this)} >submit</button> :  <button onClick={this.clickHandler.bind(this)} >retry</button> }
        <h1 class="cardClass">{this.state.cardClass}</h1>
      
      </div>
  
      
      </div>
    );
  }
}
