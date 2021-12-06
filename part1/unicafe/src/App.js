import React, { useState } from 'react'

const GiveFeedback = ({feedback}) =>{
  console.log(feedback)
  const {text,good,bad,neutral} = feedback
  return(
    <div>
      <h1>{text}</h1>
      <button onClick = {()=>good.onClick()}>{good.text}</button>
      <button onClick = {()=>bad.onClick()}>{bad.text}</button>
      <button onClick = {()=>neutral.onClick()}>{neutral.text}</button>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>   
    </tr>
  )
}

const Statistics = ({feedback})=>{
  const {good,bad,neutral} = feedback
  const total = good.val+bad.val+neutral.val
  const avg = Number(((good.val-bad.val)/total).toPrecision(2))
  const positive = Number((good.val/total*100).toPrecision(2))
  if(total === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No Feedback Given</p>
      </div>
    )
  }else{
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text ={good.text} value = {good.val}/>
            <StatisticsLine text ={neutral.text} value = {neutral.val}/>
            <StatisticsLine text ={bad.text} value = {bad.val}/>
            <StatisticsLine text ='all' value = {total}/>
            <StatisticsLine text ='average' value = {avg}/>
            <StatisticsLine text ='positve' value = {`${positive} %`}/>
          </tbody>
        </table>
      </div>
    )

  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = ()=> setGood(good+1)
  const increaseBad = ()=> setBad(bad+1)
  const increaseNeutral = ()=> setNeutral(neutral+1)

  const feedback = {
    text: 'give feedback',
    good: {
      text: 'good',
      val:good,
      onClick: increaseGood,
    },
    bad:{
      text: 'bad',
      val: bad,
      onClick: increaseBad,
    },
    neutral:{
      text: 'neutral',
      val: neutral,
      onClick: increaseNeutral,
    },
  }
  return (
    <div>
      <GiveFeedback feedback = {feedback}/>
      <Statistics feedback = {feedback}/>
    </div>
  )
}

export default App
