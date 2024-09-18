import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import axios from "axios";
import Modal from "../Moodal";

const QuizOver = React.forwardRef((props, ref) => {
  // Votre logique ici  
  const {
    levelnames,
    score,
    quizLevel,
    percent,
    maxQuestions,
    loadLevelQuestion,
  } = props;
  
  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setAsked(ref.current);

    if(localStorage.getItem('marvelStorageDate')){
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = date =>{
    var today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if(daysDifference >= 15){
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now());
    }
  }

  const API_PUBLIC_KEY = import.meta.env.VITE_API_MARVEL_KEY;

  const hash = 'ffc627f1ecfeb911ca7a0a27253fafc5';

  const averageGrade = maxQuestions / 2;
  if (score < averageGrade) {
    setTimeout(() => loadLevelQuestion(0), 5000);
  }
  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelnames.length ? (
            <>
              <p className="successMsg">
                <GiTrophyCup size="50px" /> Bravo, Passez au niveau suivant !
              </p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestion(quizLevel)}
              >
                Niveau suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">Bravo, vous etes un expert !</p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestion(0)}
              >
                Acceuil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">Note: {score}/10</div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez echoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">Note: {score}/10</div>
        </div>
      </>
    );

  const showModal = (id) => {
    setOpenModal(true);
    if(localStorage.getItem(id)){
      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);

    }else{ 
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}
        `
      )
      .then((response) => {
        setCharacterInfos(response.data);
        setLoading(false);

        localStorage.setItem(id, JSON.stringify(response.data));
        if(!localStorage.getItem('marvelStorageDate')){
          localStorage.setItem('marvelStorageDate', Date.now());
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const resultModal = !loading ? (
    <>
      <div className="modalHeader">
          <h2>{characterInfos.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
          <div className="comicImage">
            <img src={characterInfos.data.results[0].thumbnail.path+'.'+characterInfos.data.results[0].thumbnail.extension} alt={characterInfos.data.results[0].name} />

            {characterInfos.attributionText}
          </div>
          <div className="comicDetails">
            <h3>Description</h3>
            {
              characterInfos.data.results[0].description !== "" ? 
              <p>{characterInfos.data.results[0].description}</p> : 
              <p>Aucune donnée</p>
            }

            <h3>Plus d&apos;infos</h3>
            {
              characterInfos.data.results[0].urls &&
              characterInfos.data.results[0].urls.map((url,index) =>{
                return <a key={index} href={url.url} target="_blank" rel="noopener noreferrer">{url.type}</a>
              })
            }
          </div>
        </div>

        <div className="modalFooter">
          <button className="modalBtn" onClick={hideModal}>Fermer</button>
        </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
          <h2>Réponse de Marvel...</h2>
        </div>
        <div className="modalBody">
          <div className="loader"></div>
        </div>
    </>
  )

  return (
    <>
      {decision}
      <hr />
      <p>Les réponses aux questions posée:</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Reponse</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {score >= averageGrade ? (
              asked.map((question) => {
                return (
                  <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                      <button
                        className="btnInfo"
                        onClick={() => showModal(question.heroId)}
                      >
                        Infos
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">
                  <div className="loader"></div>
                  <p style={{ textAlign: "center", color: "red" }}>
                    Pas de réponse!
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal showModal={openModal} hideModal={hideModal}>
        {resultModal}
      </Modal>
    </>
  );
});

QuizOver.displayName = "QuizOver";

export default React.memo(QuizOver);
