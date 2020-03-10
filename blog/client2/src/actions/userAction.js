import {REGISTER,POSTLIST,POST_CREATE,ADD_LIKE,FETCH_PROFILE} from './types';
// import axios from 'axios';

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

export function listPost(){
  return function(dispatch) {
    fetch("/api/posts",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        "Authorization":localStorage.getItem('token')
      },
    }).then((resp) => {
        return resp.json();
    }).then((res) => {
    console.log(res)
      let list = [];
      res.map(e => {
        
      })     
      dispatch({
        type: POSTLIST,
        res: res,
      });   
    });
       
    }
}

export function createPost(obj){
  return function(dispatch) {
    fetch("/api/create/post",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "Authorization":localStorage.getItem('token')
      },
      body:JSON.stringify(obj)
    }).then((resp) => {
        return resp.json();
    }).then((res) => {       
      dispatch({
        type: POST_CREATE,
        res: res,
      });   
    });
       
    }
}

export function likeHandler(obj){
  return function(dispatch) {
    fetch("/api/like",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "Authorization":localStorage.getItem('token')
      },
      body:JSON.stringify(obj)
    }).then((resp) => {
        return resp.json();
    }).then((res) => {       
      dispatch({
        type: ADD_LIKE,
        res: res,
      });   
    });
       
    }
}

export function profileHandler(){
  return function(dispatch) {
    fetch("/api/profile",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        "Authorization":localStorage.getItem('token')
      }
    }).then((resp) => {
        return resp.json();
    }).then((res) => {       
      dispatch({
        type: FETCH_PROFILE,
        res: res,
      });   
    });
       
    }
}

export function updateAvatar(obj) {
  return function(dispatch) {
    fetch("/update/avatar",{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj)
    }).then((resp) => {
        return resp.json();
    }).then((res) => {       
      dispatch({
        type: FETCH_PROFILE,
        res: res,
      });   
    });
       
    }
}