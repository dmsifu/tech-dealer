import { useState } from 'react'

function Timer() {
  const date = new Date()
  

  return (
    <div>
        <h1>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</h1>
    </div>
  )
}

export default Timer