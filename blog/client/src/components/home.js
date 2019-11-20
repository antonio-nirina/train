import React, { useState,useEffect } from 'react';
// import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
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

class Home extends React.Component {
	constructor() {
    	super();
    	this.state = {
	    	loading: false,
	    	user: null,
	    	open: false,
    	}
    	this.onSend = this.onSend.bind(this)
    	this.closeModal = this.closeModal(this)
    }

    componentDidMount() {
    	fetch("/api/posts",{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            "Authorization":localStorage.getItem('token')
          },
        }).then(results => {return results.json()})
        .then(object => {
        	if (object) {
        		this.setState({loading: false,user: object.data})	
        	}
          	
        })

    }

    onSend = (event) => {
  		this.setState({ open: true });
  	}

  	closeModal = () => {
  		this.setState({ open: false });
  	}

  	contentH = (item) => {
  		console.log(item)
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

  	render() {
  		const { loading, user,open } = this.state;
  		return (
  			<div style={style}>
  				<Header />
	  			<Popup
		          	open={this.open}
		          	closeOnDocumentClick
		          	onClose={this.closeModal}
		        >
		        <div className="">
		        	<TextArea placeholder="exprimer vous" rows={4} />
		        	<button className="btn btn-success" style={{"height": "38px","position": "relative","top": "3px","borderRadius":"50px"}}>
							Publier
					</button>
		        </div>
		        </Popup>
		    	<div className="post" style={{"width":"50%","margin":"0 auto"}}>
		    		<TextArea placeholder="exprimer vous" onKeyDown={this.onSend} rows={4} />
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
			          		<div className="" style={{"position": "relative","left": "82px","top": "-11px"}}>{item.authorName}</div>
			              <List.Item.Meta
			                avatar={
			                  <Avatar src={require('../assets/image/user.png')} />
			                }
			                title={<a href="https://ant.design">{item.title}</a>}
			                description={() => this.contentH(item)}
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
  		)
  	}

}

  /*const onSend = (event) => {
  	console.log(event.target.value)
  }*/

export default Home;