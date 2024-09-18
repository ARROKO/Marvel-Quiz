import {Link , useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';


export default function Logout() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [btn, setBtn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(()=>{
    if(password.length >= 6 && validateEmail(email)){
      setBtn(true);
    }else{
      setBtn(false)
    }
  },[email, password])

  const loginWithUsernameAndPassword = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/welcome');
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  }

  const btnRes = !loading ? <button disabled={!btn}>Connexion</button> : <div className="loader" style={{width: '20px', height: '20px'}}></div>
  return (
    <div className='signUpLoginBox'>
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={loginWithUsernameAndPassword}>
            { message !== '' &&
                        <span>
                            { message }    
                        </span>
                  }
              <h2>Connexion</h2>
              <div className="inputBox">
                <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btnRes}
            </form>
            <div className="linkContainer" style={{
              display:'flex',
              justifyContent: 'space-between'
            }}>
              <Link className="simpleLink" to='/signup'>Pas encore de compte? inscrivez-vous</Link>
              
              <Link className="simpleLink" to='/forgetpassword'>Mot de passe oublié? Récupére le ici</Link>
                  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
