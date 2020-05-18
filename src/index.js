import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

function GuessTitle(props) {
  return(
    <h1>
      {props.title}
    </h1>
  )
}

function GuessGuide(props) {
  return(
   <p>
      {props.guide}
   </p>
  )
}

class GuessForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(event) {
    this.props.onNumberChange(event.target.value)
  }
  
  handleSubmit(event) {
    this.props.onNumberSubmit(this.props.count + 1)
    event.preventDefault()
  }
  
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter a guess:
          <input 
            type="text"
            onChange={this.handleChange} />
          <input type="submit" value="Guess Submit" />
        </label>
      </form>
    )
  }
}

class GuessNumber extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      count: 0
    }
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleNumberSubmit = this.handleNumberSubmit.bind(this)
  }
  
  handleNumberChange(number) {
    this.setState({number})
  }
  
  handleNumberSubmit(count) {
    this.setState({count})
  }

  render() {
    const title = "Number Guessing Game"
    const guide = "We have selected a random number between 1 and 100. see if you can guess it in 10 turns or less, we'll tell you if your guess was too high or too low."
    const number = this.state.number
    const count = this.state.count
    const randomNumber = this.props.randomNumber
    return(
      <>
      <GuessTitle title={title} />
      <GuessGuide guide={guide} />
      <GuessForm
        number={number}
        count={count}
        onNumberChange={this.handleNumberChange}
        onNumberSubmit={this.handleNumberSubmit}
        />
        <GuessResult
          count={count}
          randomNumber={randomNumber}
          number={number}
        />
      </>
    )
  }
}

function GuessResult(props) {
  let result
  if (props.number > props.randomNumber ) {
    result = <h3> Your Guess was greater than it!</h3>
  } else if (props.number < props.randomNumber) {
    result = <h3>Your Guess Number was less than it!</h3>
  } else {
    result = <h3>Congratulation, Your Guess is Right!</h3>
  }
  
  return(
    <fieldset>
      <legend>
        <h2>Your Guess Number Result: </h2>
      </legend>
      <h4>Your Guess number of Turns: {props.count}</h4>
      <p>{result}</p>
    </fieldset>
  )
}

let randomNumber = Math.floor(Math.random() * 100) + 1

ReactDOM.render(
  <React.StrictMode>
    <GuessNumber randomNumber={randomNumber} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
