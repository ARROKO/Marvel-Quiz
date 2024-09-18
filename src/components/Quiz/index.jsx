import { useEffect, useRef, useState } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import toast,{Toaster} from "react-hot-toast";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

export default function Quiz({ currentUser }) {
  const MAXQUESTIONS = 10;
  const [levelNames, setLevelNames] = useState([
    "debutant",
    "confirme",
    "expert",
  ]);
  const [quizLevel, setQuizLevel] = useState(0);
  const [storeQuestion, setStoreQuestion] = useState([]);
  const [question, setQuestion] = useState(null);
  const [option, setOption] = useState([]);
  const [idQuestion, setIdQuestion] = useState(0);
  const [btnDisabled, setDisabled] = useState(true);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [percent, setPercent] = useState(0);

  const storeDataRef = useRef();

  useEffect(() => {
    loadQuestions(levelNames[quizLevel]);
  }, []);

  // setStoreQuestion([0])

  useEffect(() => {
    if (storeQuestion.length > 0 && idQuestion < storeQuestion.length) {
      const currentQuestion = storeQuestion[idQuestion]?.question;
      const currentOption = storeQuestion[idQuestion]?.options;
      setQuestion(currentQuestion);
      setOption(currentOption);
      setUserAnswer(null);
    }
  }, [storeQuestion, idQuestion]);

  useEffect(() => {
    const gradepercent = getPercentage(MAXQUESTIONS, score);
    gameOver(gradepercent);
  }, [over])

  const loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];

    if (fetchedArrayQuiz.length >= MAXQUESTIONS) {
      storeDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      setStoreQuestion(newArray);
    } else {
      console.log("Pas assez de question");
    }
  };

  const submitAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    setDisabled(false);
  };

  const loadLevelQuestion = param =>{
    setQuizLevel(param);
    setStoreQuestion([]);
    setQuestion(null);
    setOption([]);
    setIdQuestion(0);
    setDisabled(true);
    setUserAnswer(null);
    setScore(0);
    setOver(false);
    setPercent(0);
    loadQuestions(levelNames[param]);
  }
  const gameOver = percent =>{
    if(percent >= 50){
      setQuizLevel(quizLevel => quizLevel + 1);
      setPercent(percent);
    }else{
      setPercent(percent);
    }
  }
  const nextQuestion = () => {
    
    if (idQuestion === MAXQUESTIONS - 1) {
      //End
      setOver(true);
      
    } else {
      setIdQuestion((prevSate) => prevSate + 1);
    }

    const goodAnswer = storeDataRef.current[idQuestion].answer;
    setDisabled(true);
    if (userAnswer === goodAnswer) {
      setScore((score) => score + 1);
      toast("Bravo +1", {
        duration: 2000,
        position: "top-left",

        // Styling
        style: {},
        className: "",
        gutter: 1,
        // Custom Icon
        icon: "😏",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } else {
      toast("Raté 0", {
        duration: 2000,
        position: "top-center",

        // Styling
        style: {},
        className: "",
        gutter: 1,
        // Custom Icon
        icon: "😂",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "red",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  const getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  return (
    <>
      {over ? (
        <QuizOver 
          ref={storeDataRef} 
          levelnames={levelNames} 
          score={score}
          maxQuestions = {MAXQUESTIONS}
          quizLevel={quizLevel}
          percent = {percent}
          loadLevelQuestion={loadLevelQuestion}
        />
      ) : (
        <>
        <Toaster />
          <Levels 
            currentUser={currentUser} 
            quizLevel={quizLevel} 
            levelNames={levelNames}
          />
          <ProgressBar idQuestion={idQuestion}/>
          <h2>{question}</h2>
          {option.map((option, index) => (
            <p
              key={index}
              className={`answerOptions ${
                userAnswer === option ? "selected" : null
              }`}
              onClick={() => submitAnswer(option)}
            >
            <FaChevronRight />  {option}
            </p>
          ))}

          <button
            disabled={btnDisabled}
            className="btnSubmit"
            onClick={nextQuestion}
          >
            {idQuestion !== MAXQUESTIONS - 1 ? "Suivant" : "Terminer"}
          </button>
        </>
      )}
    </>
  );
}
