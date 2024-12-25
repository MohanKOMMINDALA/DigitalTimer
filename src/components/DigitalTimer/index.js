// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerLimitValue: 25,
      timeElapsedSeconds: 0,
      timerRunning: false,
    }
  }

  onTimerLimitDecrement = () => {
    const {timerLimitValue} = this.state
    if (timerLimitValue > 1) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue - 1,
      }))
    }
  }

  onTimerLimitIncrement = () => {
    this.setState(prevState => ({
      timerLimitValue: prevState.timerLimitValue + 1,
    }))
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  setTimeInterval = () => {
    const {timerLimitValue, timeElapsedSeconds} = this.state

    const isTimerCompleted = timeElapsedSeconds === timerLimitValue * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({timerRunning: false, timeElapsedSeconds: 0})
    } else {
      this.setState(prevState => ({
        timeElapsedSeconds: prevState.timeElapsedSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {timerRunning} = this.state

    if (timerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.setTimeInterval, 1000)
    }

    this.setState(prevState => ({timerRunning: !prevState.timerRunning}))
  }

  resetTimer = () => {
    this.clearTimeInterval()
    this.setState({
      timerLimitValue: 25,
      timeElapsedSeconds: 0,
      timerRunning: false,
    })
  }

  render() {
    const {timerRunning, timerLimitValue, timeElapsedSeconds} = this.state

    const totalRemainingSeconds = timerLimitValue * 60 - timeElapsedSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    const imgEl = timerRunning ? (
      <img
        className="icon-img"
        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
        alt="pause icon"
      />
    ) : (
      <img
        className="icon-img"
        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
        alt="play icon"
      />
    )

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="sub-timer-container">
            <h1 className="time-description">{`${stringifiedMinutes}:${stringifiedSeconds}`}</h1>
            <p className="description">{timerRunning ? 'Running' : 'Paused'}</p>
          </div>
        </div>
        <div className="buttons-container">
          <div className="start-pause-reset-container">
            <div className="button-container">
              <button
                className="button icon-description"
                type="button"
                onClick={this.onStartOrPauseTimer}
              >
                {imgEl} {timerRunning ? 'Pause' : 'Start'}
              </button>
            </div>
            <div className="button-container">
              <button
                className="button icon-description"
                type="button"
                onClick={this.resetTimer}
              >
                <img
                  className="icon-img"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
          </div>
          <div className="increment-decrement-container">
            <p className="set-timer-description">Set Timer Limit</p>
            <div className="set-timer-container">
              <button
                className="button icon-description"
                type="button"
                disabled={timeElapsedSeconds > 0}
                onClick={this.onTimerLimitDecrement}
              >
                -
              </button>
              <span className="display-container icon-description">
                <p> {timerLimitValue}</p>
              </span>
              <button
                className="button icon-description"
                type="button"
                disabled={timeElapsedSeconds > 0}
                onClick={this.onTimerLimitIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
