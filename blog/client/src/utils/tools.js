import io from "socket.io-client";

const Tools = {
	connected : function() {
		const token = localStorage.getItem('token');
		if (token) {
			const socket = io("http://localhost:8080/")
			socket.on("connect",() => {
				socket.emit("identify",{
					token: token
				})
			})

			socket.on("new_comment",(user) => {
				// console.log("uss", user)
				return user
			})
		}
	}
}

export default Tools;