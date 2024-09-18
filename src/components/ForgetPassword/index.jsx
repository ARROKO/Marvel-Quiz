import { sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
//   const {passwordReset} = 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    if(email !== '' && validateEmail(email)){
        setBtn(true);
    }else{
        setBtn(false);
    }
  }, [email])
  
  
  const btnRes = btn ? <button>Valider</button> : <button disabled>Valider</button>

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await sendPasswordResetEmail(auth, email);
        
        setSuccess(`Veuillez consulter votre email ${email} pour changer le mot de passe`);

        setTimeout(()=>{
            navigate('/login');
        }, 5000)
    } catch (error) {
        setError(error.message);
        console.log('the error is: ', error);
        setEmail('');
    }
  };
  
  
  
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && <span style={{
                borderColor: 'green',
                color: 'white',
                background: 'green'
            }}>{success}</span>}


            {
                error && <span>{error}</span>
            }

            <form onSubmit={handleSubmit}>
              <h2>Mot de passe oublié</h2>
              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              {btnRes}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? connecter vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
