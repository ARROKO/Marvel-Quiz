import toast, { Toaster } from 'react-hot-toast';
import Stepper from 'react-stepper-horizontal'

const notify = () => toast('Here is your toast.');

const Test = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
      <div>
      <Stepper steps={ [{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'}, {title: 'Step Four'}] } activeStep={ 1 } />
    </div>
    </div>
  );
};

export default Test;
/*
 http://gateway.marvel.com/v1/public/characters?
 ts=1 & 
 apikey=e52c799ec00bb297afd21c9f322b2edc
 & 
 
 hash=
 
 */