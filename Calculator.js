import React,{Component} from 'react';
import './Calculator.css';

class Calculator extends Component{
  constructor(props){
      super(props);
      this.state={
      displayValue:'0',
      operator:null,
      waitingForOperand:false,
      storedValue:null,
     };
  }

  handleDigitClick=(digit)=>{
    const{ displayValue,waitingForOperand}=this.state;
    if(waitingForOperand){
      this.setState({
        displayValue:String(digit),
        waitingForOperand:false,
      });
    }else{
      this.setState({
        displayValue:displayValue==='0'?String(digit):displayValue+digit,
      });
    }
  };
  handleOperatorClick=(nextOperator)=>{
    const {displayValue,operator,storedValue}=this.state;
    const inputValue=parseFloat(displayValue);
    if(operator&&!isNaN(storedValue)){
      const result=this.Calculate(storedValue,inputValue,operator);
      this.setState({
        displayValue:String(result),
        operator:nextOperator,
        waitingForOperand:true,
        storedValue:result,
      });
    }else{
      this.setState({
        operator:nextOperator,
        waitingForOperand:true,
        storedValue:inputValue,
      });
    }
  };
  handleEqualClick=()=>{
    const {displayValue,operator,storedValue}=this.state;
    const inputValue=parseFloat(displayValue);
    if(operator&&!isNaN(storedValue)){
      const result=this.Calculate(storedValue,inputValue,operator);
      this.setState({
        displayValue:String(result),
        operator:null,
        waitingForOperand:true,
        storedValue:result,
      });
    }
  };
  handleClearClick=()=>{
    this.setState({
      displayValue:'0',
      operator:null,
      waitingForOperand:false,
      storedValue:null,
    });
  };
  Calculate=(value1,value2,operator)=>{
    switch(operator){
      case '+':
        return value1+value2;
        case '-':
          return value1-value2;
          case '*':
            return value1*value2;
          case '/':
            return value1/value2;
          default:
            return value2;  
    }
  };
  render(){
    const {displayValue}=this.state;
    return(
      <div className="calculator">
        <h1>Calculator</h1>
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <div className="row">
            <button onClick={()=>this.handleDigitClick(7)}>7</button>
            <button onClick={()=>this.handleDigitClick(8)}>8</button>
            <button onClick={()=>this.handleDigitClick(9)}>9</button>
            <button onClick={()=>this.handleOperatorClick('/')}>/</button>
          </div>
          <div className="row">
          <button onClick={()=>this.handleDigitClick(4)}>4</button>
          <button onClick={()=>this.handleDigitClick(5)}>5</button>
          <button onClick={()=>this.handleDigitClick(6)}>6</button>
          <button onClick={()=>this.handleOperatorClick('*')}>*</button>
        </div>
        <div className="row">
        <button onClick={()=>this.handleDigitClick(1)}>1</button>
        <button onClick={()=>this.handleDigitClick(2)}>2</button>
        <button onClick={()=>this.handleDigitClick(3)}>3</button>
        <button onClick={()=>this.handleOperatorClick('-')}>-</button>
        </div>
        <div className="row">
          <button onClick={()=> this.handleDigitClick(0)}>0</button>
          <button onClick={this.handleClearClick}>C</button>
          <button onClick={this.handleEqualClick}>=</button>
          <button onClick={()=> this.handleOperatorClick('+')}>+</button>
        </div>
      </div>
      </div>
    );
  }
}
export default Calculator;
