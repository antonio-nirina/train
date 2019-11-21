import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Input } from 'antd';

import 'antd/dist/antd.css';
import { List, Avatar, Skeleton } from 'antd';
import Header from './header';
import Footer from './footer';
import {listPost,createPost} from "../actions/userAction"

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

	constructor(props) {
    	super(props);
    	this.state = {
	    	loading: false,
	    	open: false,
	    	post:''
    	}
    	this.onSend = this.onSend.bind(this)
    	this.closeModal = this.closeModal(this)
    	this.handleChange = this.handleChange.bind(this)
    	this.sendPost = this.sendPost.bind(this)
    	this.sendLike = this.sendLike.bind(this)
    }

    componentDidMount() {
    	this.props.listPost()
    }

    onSend = (event) => {
  		this.setState({ open: true });
  	}

  	closeModal = () => {
  		this.setState({ open: false });
  	}

  	handleChange(event){
  		this.setState({post:event.target.value})
  	}

  	sendPost(){
  		// console.log("send", this.state.post)
  		const obj = {
  			"title":"",
  			"content":this.state.post
  		}
  		this.props.createPost(obj)
  		setTimeout(() => {
			this.setState({open: false })
		}, 2000)
  	}

  	sendLike(){
  		console.log("like", "id")
  	}

  	contentH = (item) => {
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
  		// const { loading,open } = this.state;
  		return (
  			<div style={style}>
  				{/*eslint-disable */}
  				<Header />
	  			<Popup
		          	open={this.state.open}
		          	closeOnDocumentClick
		          	onClose={this.closeModal}
		        >
		        <div className="">
		        	<TextArea placeholder="exprimer vous" rows={4} onChange={this.handleChange} />
		        	<button className="btn btn-success" onClick={this.sendPost}>
							Publier
					</button>
		        </div>
		        </Popup>
		    	<div className="post" style={{"width":"50%","margin":"0 auto"}}>
		    		<button className="btn btn-success" onClick={this.onSend}>
						Creér un post
					</button>
		    	</div>
		       		<List
				        className="demo-loadmore-list"
				        style={list}
				        loading={this.state.loading }
				        itemLayout="horizontal"
				        dataSource={this.props.init}
				        renderItem={item => (
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
				                description={this.contentH(item)}
				              />
			              		<span style={item.like > 0 ? likes :like } onClick={this.sendLike}><i className="fa fa-thumbs-up"></i></span>
				            </Skeleton>
				          </List.Item>
				        )}
			      	/>
	        <Footer />
  			</div>
  		)
  	}

}

function mapStateToProps(state, ownProps) {
	let posts = state.user.listPost;

	let _st = '';
	let list = '';

	if (posts) {
		_st = posts.code !== 200 ? posts.message : '';
		list = posts.data
	}

	return {
		params: ownProps,
		init:list 
	}
}

  /*const onSend = (event) => {
  	console.log(event.target.value)
  }*/
export default connect(mapStateToProps,{listPost,createPost})(Home);