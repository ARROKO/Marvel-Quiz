import React, { useEffect, useState } from 'react'

const ProgressBar = ({idQuestion}) => {
  const progressPercent = idQuestion * 10;
  return (
    <>
        <div className='percentage'>
        <div className="progressPercent">Question {idQuestion}/10</div>
        <div className="progressPercent">Progression: {progressPercent}%</div>
    </div>
    <div className="progressBar">
        <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
    </div>
    </>
  )
}

export default ProgressBar