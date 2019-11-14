import { AUTH,UN_AUTH} from './types';

export function getUserConnected(obj,historyPush){
  return function(dispatch) {
    fetch('/login_check',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(obj)
        }
      ).then((resp) => {
        return resp.json();
      }).then((res) => {        
        dispatch({
            type: AUTH,
            res: res,
          });
        if (res.code === 200) {
          localStorage.setItem('token', res.token);
          historyPush('/');
        } else {
          historyPush('/login');
        }
      });
      
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UN_AUTH };
}