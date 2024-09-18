import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../Firebase/context'
// import ReactToolTip from 'react-tooltip'

export default function Logout() {
  const [checked, setChecked] = useState(false);
  const {logout} = useContext(AuthContext);
  const handleChange = () =>{
    setChecked(!checked);
    logout();
  }
  return (
    <div className="logoutContainer">
      <label htmlFor="check" className="switch">
        <input
          id="check"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round" data-tooltip-id='Déconnexion'></span>

      </label>
      {/* <ReactToolTip place='left' effect='solid' /> */}
    </div>
  );
}
