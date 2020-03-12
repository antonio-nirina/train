import io from "socket.io-client";



const Tools = {
	onSendSocket : function() {
		const token = localStorage.getItem('token');
		if (token) {
			const socket = io("http://localhost:8080/")
			socket.on("connect",() => {
				socket.emit("identify",{
					token: token
				})
			})
			
		}
	},
	 checkToken:function() {
	// const token = localStorage.getItem('token');
		const socket = io("http://localhost:8080/")
		socket.on("new_post",function({posts}) {
			if (posts) {
				console.log('dataxx111x', posts)
			}
		})
	},
	onLikeSocket : function(){
		const token = localStorage.getItem('token');
		if (token) {
			const socket = io("http://localhost:8080/")
			socket.on("add_like",(data) => {
        		console.log("data_like", data)
      		}) 

		}
	},
	onCreatePost : function(data){
		const token = localStorage.getItem('token');
		const socket = io("http://localhost:8080/")
		if (token) {
      		socket.on("connect",() => {
				socket.emit("create_post",{
					token: token,
					data:data
				})
			}) 

		}
	}
}

export default Tools;