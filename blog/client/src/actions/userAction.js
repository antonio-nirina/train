import {REGISTER} from './types';

export function register(data,historyPush){
  return function(dispatch) {
    fetch('/register',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        }
      ).then((resp) => {
        return resp.json();
      }).then((res) => { 
        if (res.code === 200) {
          historyPush('/login');
        } else {
          dispatch({
            type: REGISTER,
            res: res,
          });
          historyPush('/signup');
        }
      });
       
    }
}
