import { AUTH,UN_AUTH} from './types';

export function getUserConnected(obj,historyPush){
  return function(dispatch) {
    fetch('/login',
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
        if (res.code_status === 200) {
          localStorage.setItem('token', res.data);
          historyPush('/');
        } else {
          historyPush('/signin');
        }
      });
      
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
   window.location.reload(true)
  return { type: UN_AUTH };
}
