package process

import (
	//"encoding/json"
	// "strings"
	// "time"
	//"errors"
	"fmt"
	"net/http"

	//"github.com/gorilla/mux"
	log "github.com/antonio-nirina/formation/blog/server2/flog"
	 "github.com/antonio-nirina/formation/blog/server2/model"
	"github.com/antonio-nirina/formation/blog/server2/response"
)

type arResp struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data   map[string]interface{} `json:"data"`
}

var arrResp = arResp{}

func (process *Process) AllPost(w http.ResponseWriter, r *http.Request) {
	post := model.Post{}
	posts, err := post.FindAllPosts(process.DB)

	if err != nil {
		log.ErrorOp("get_all_post",err)
		response.ErrorJson(w, http.StatusInternalServerError, "error interne")
		return
	}
	fmt.Println(posts)
	// response.SuccessJSon(w, http.StatusOK, res.arrResponse(200, "success", token))
}

func (res *arResp) arrResponse(code int, msg string, obj map[string]interface{}) *arResp {
	res.Code = code
	res.Message = msg
	res.Data = obj

	return res
}
