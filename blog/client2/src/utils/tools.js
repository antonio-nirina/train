import io from "socket.io-client";

const checkToken = () => {
	const token = localStorage.getItem('token');
	if (token) {
		const socket = io("http://localhost:8080/")

		return socket
	}

	return
}

const Tools = {
	onSendSocket : function(event) {
		const token = localStorage.getItem('token');
		if (token) {
			const socket = io("http://localhost:8080/")
			socket.on("connect",() => {
				socket.emit("identify",{
					token: token
				})
			})

			if (event.type === "like") {
					socket.emit("send_like",{
						event: event
					})
			} 
			
		}
	},
	onLikeSocket : function(){
		const token = localStorage.getItem('token');
		if (token) {
			const socket = io("http://localhost:8080/")
			socket.on("add_like",(data) => {
        		console.log("data_like", data)
      		}) 

		}
	}
}

export default Tools;