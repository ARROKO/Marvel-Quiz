import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from '../Firebase/firebase';

export default function Signup() {

  const data = {
    pseudo : '',
    email : '',
    password : '',
    confirmPassword : ''
  }

  const [loginData, setLoginData] = useState(data);
  const [message, setMessage] = useState('');
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {pseudo, email, password, confirmPassword} = loginData;

  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const userCreantial = await createUserWithEmailAndPassword(auth, email, password)
        const uid = userCreantial.user.uid;

        //add user to firestore
        const data = {pseudo, email};
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, data)        
        setLoading(false);
        setLoginData({...data});

        navigate("/login");
      } catch (error) {
        setMessage(error.message);
        setLoading(false);
        console.log('the error is: ', error);
        setLoginData({...data});
      }
    } else {
      setMessage("Passwords don't match. Please try again.");
    }
  };

  const handleChange = (e) =>{
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(()=>{
    if(pseudo !== '' && email !== '' && password !== '' && confirmPassword !== '' && validateEmail(email)){
      setEmpty(false);
    }else{
      setEmpty(true);
    }
  },[email, password, pseudo, confirmPassword])


  
  const btn = loading ? <div className="loader" style={{width: '20px', height: '20px'}}></div> : <button disabled={empty}>Inscription</button> 


  return (
    <div className='signUpLoginBox'>
        <div className="slContainer">
            <div className="formBoxLeftSignup"></div>
            <div className="formBoxRight">
              <div className="formContent">
                <form onSubmit={signupWithUsernameAndPassword}>
                  {
                    message !== '' ? <span>{message}</span> : ''
                  }
                  <h2>Inscription</h2>
                  <div className="inputBox">
                    <input type="text" id="pseudo" value={pseudo} onChange={handleChange } required />
                    <label htmlFor="pseudo">Pseudo</label>
                  </div>
                  <div className="inputBox">
                    <input type="email" id="email" value={email} onChange={handleChange } required />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="inputBox">
                    <input type="password" id="password" value={password} onChange={handleChange } required />
                    <label htmlFor="password">Mot de passe</label>
                  </div>
                  <div className="inputBox">
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleChange } required />
                    <label htmlFor="confirmPassword">Mot de passe</label>
                  </div>
                  {btn}
                </form>
                <div className="linkContainer">
                  <Link className="simpleLink" to='/login'>Déjà inscrit? connecter vous</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
