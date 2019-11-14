import React, { useState,useEffect } from 'react';
// import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Skeleton } from 'antd';
import Header from './header';
import Footer from './footer';

const style ={
  textAlign: 'center',
  height: 32,
  lineHeight: '32px',
}

const like = {
	"fontSize":"20px",
	'color':'gray'
}
const list = {
	"width":"50%",
	"margin":"0 auto"
}

const Home = () => {
const [userRequest, setUserRequest] = useState({
    loading: false,
    user: null,
  });

  useEffect(() => {
    setUserRequest({ loading: true });
    fetch('https://randomuser.me/api/?results=10')
      .then(results => results.json())
      .then(data => {
        setUserRequest({
          loading: false,
          user: data.results,
        });
      });
  }, []);

const { loading, user } = userRequest;
  return (
	    <div style={style}>
	    	<Header />
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
	            	<p>0</p>
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
	                  <Avatar src={item.picture.thumbnail} />
	                }
	                title={<a href="https://ant.design">{item.name.last}</a>}
	                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
	              />
	              <span style={like}><i className="fa fa-thumbs-up"></i></span>
	            </Skeleton>
	          </List.Item>
	        )}
	        />
	        <Footer />
	    </div>
  );
}

export default Home;