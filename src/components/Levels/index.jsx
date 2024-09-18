import React,{ useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';

function Levels({currentUser, quizLevel, levelNames}) {
  // const levels = ["Débutant", "Confirmé", "Expert"];
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    const quizStep = levelNames.map(level => ({title: level}));
    setLevels(quizStep);
  },[levelNames])
  return (
    <div  className="levelsContainer">
      
      <Stepper 
        steps={ levels } 
        activeStep={ quizLevel } 
        activeColor={'#d31017'}
        activeTitleColor={'#d31017'}
        completeTitleColor={'#d31017'}
        defaultTitleColor={'#E0E0E0'}
        completeColor={'#d31017'}
        completeBarColor={'#d31017'}
      />
    
    </div>
  )
}
export default React.memo(Levels);