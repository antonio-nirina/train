import React, { useState,useEffect } from 'react';
// import {Link} from 'react-router-dom';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { List, Avatar, Skeleton } from 'antd';
import Header from './header';
import Footer from './footer';

const { TextArea } = Input;
const style ={
  textAlign: 'center',
  height: 32,
  lineHeight: '32px',
}

const like = {
	"fontSize":"20px",
	'color':'gray'
}
const likes = {
	"fontSize":"20px",
	'color':'#1890ff'
}
const list = {
	"width":"50%",
	"margin":"0 auto"
}

const Home = (props) => {
const [userRequest, setUserRequest] = useState({
    loading: false,
    user: null,
    isVisible: false
  });

  useEffect(() => {
    setUserRequest({ loading: true });
    // fetch('https://randomuser.me/api/?results=10')
    fetch("/api/posts",{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            "Authorization":localStorage.getItem('token')
          },
        })

      .then(results => results.json())
      .then(object => {
        setUserRequest({
          loading: false,
          user: object.data,
        });
      });
  }, []);



	const { loading, user,isVisible } = userRequest;
  	return (
	    <div style={style}>
	    	<Header />
	    	<div className="post" style={{"width":"50%","margin":"0 auto"}}>
	    		<TextArea placeholder="exprimer vous" onKeyDown={onSend} rows={4} />
	    		{isVisible ? 
	    		(
	    			<button className="btn btn-success" style={{"height": "38px","position": "relative","top": "3px","borderRadius":"50px"}}>
						Publier
					</button>
	    		) : (null)}
	    		
	    	</div>
	      <List
	      	style={list}
	        className="demo-loadmore-list"
	        loading={loading}
	        itemLayout="horizontal"
	        dataSource={user ? user:""}
	        renderItem={ item => (
	          <List.Item
	            actions={[
	            	<a style={{'color':'#1890ff'}} key="list-loadmore-more">
	            	like
	            	<p>{item.like}</p>
	            	</a>,
	            	<a style={{'color':'#1890ff'}} key="list-loadmore-edit">
	            	edit
	            	<p>&nbsp;</p>
	            	</a>,
	            	 <a style={{'color':'#1890ff'}} key="list-loadmore-more">
	            	 comment
	            	 <p>&nbsp;</p>
	            	 </a>
	           	]}
	          >
	          <Skeleton avatar title={false} loading={item.loading} active>
	              <List.Item.Meta
	                avatar={
	                  <Avatar src={require('../assets/image/user.png')} />
	                }
	                title={<a href="https://ant.design">{item.authorName}</a>}
	                description={contentH(item)}
	              />
	              {item.like > 0 ? (<span style={likes}><i className="fa fa-thumbs-up"></i></span>)
	              	: (<span style={like}><i className="fa fa-thumbs-up"></i></span>)
	              }
	            </Skeleton>
	          </List.Item>
	        )}
	        />
	        <Footer />
	    </div>
  );
}

const contentH = (item) => {
	let newList;
	if((item.content).length > 50 ) {
		let _arr = item.content.split(" ")
		for (var i =_arr.length - 1; i >= 0; i--) {
			_arr[i] = ""
			const list = (_arr.filter(e => e).join(" "))

			if (list.length <= 50) {
				break;
			}
			newList = list +" ...."
		}
	} else {
		newList = item.content;
	}

	return newList
}

  const onSend = (event) => {
  	console.log(event.target.value)
  }

export default Home;