import { useRef, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../Firebase/context';
export default function Landing() {

    const [btn, setBtn] = useState(false);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const refWolverine = useRef(null);

    if(user !== null)
        navigate('/welcome')
    
    useEffect(() => {

        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg')
            setBtn(true);
        }, 3000);

        return () => { }
    }, []);


    const setLeftImg = ()=>{
        refWolverine.current.classList.add("leftImg");
    }

    const setRightImg = ()=>{
        refWolverine.current.classList.add("rightImg");
    }

    function clearImg() {
        if(refWolverine.current.classList.contains('leftImg')){
            refWolverine.current.classList.remove('leftImg');
        }else if(refWolverine.current.classList.contains('rightImg')){
            refWolverine.current.classList.remove('rightImg');
        }
            
    }

    const displayBtn = btn && (
        <>
            <div className="leftBox">
                <button onMouseOver={setLeftImg} onMouseOut={clearImg} className='btn-welcome'>
                    <NavLink to='/signup' className='link'>Inscription</NavLink>
                </button>
            </div>
            <div className="rightBox">
                <button onMouseOver={setRightImg} onMouseOut={clearImg} className='btn-welcome'>
                    <NavLink to='/login' className='link'>Connexion</NavLink>
                </button>
            </div>
        </>
    )


    return (
        <main ref={refWolverine} className='welcomePage'>
            {displayBtn}
        </main>
    )
}
