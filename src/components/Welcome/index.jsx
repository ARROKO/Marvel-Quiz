import { AuthContext } from '../Firebase/context'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import db from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';


export default function Welcome() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    if(user === null)
      navigate('/')

    if(user !== null){
      
      const fetchUserData = async () => {
        // setLoading(true);
        try {
          // Référence du document
          const docRef = doc(db, "users", user.uid); // Remplacez "users" par le nom de votre collection
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Si le document existe, mettez à jour l'état avec les données
            setCurrentUser(docSnap.data());
          } else {
            console.log("Aucun document trouvé pour cet UID.");
            console.log("Aucun document trouvé");
          }
        } catch (err) {
          console.error("Erreur lors de la récupération des données:", err);
          console.log("Erreur lors de la récupération des données");
        } finally {
          // setLoading(false);
        }
      };
      
      fetchUserData();
    }


  }, [user]);


  return user === null ?
    (
      <>
        <div className="loader">
        </div>
      </>
    ) : (
      <div className='quiz-bg'>
      <div className="container">
        <Logout />
        <Quiz currentUser={currentUser} />
      </div>
    </div>
    )
}
