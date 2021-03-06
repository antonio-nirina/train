package process

import (
	"encoding/json"
	"strings"
	"time"
	//"errors"
	"fmt"
	"html"
	"net/http"
	"strconv"

	"github.com/antonio-nirina/formation/blog/server2/auth"
	log "github.com/antonio-nirina/formation/blog/server2/flog"
	"github.com/antonio-nirina/formation/blog/server2/model"
	"github.com/antonio-nirina/formation/blog/server2/response"
	"github.com/gorilla/mux"
)

type arResp struct {
	Code    int           `json:"code"`
	Message string        `json:"message"`
	Data    []interface{} `json:"data"`
}

type objResp struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type ObjectDto struct {
	IsPost bool  `json:"isPost"`
	Id     int64 `json:"id"`
}

type CommentDto struct {
	Id      int64  `json:"id"`
	Content string `json:"content"`
}

type OutPost struct {
	ID        interface{} `json:"id"`
	Title     string      `json:"title"`
	Content   string      `json:"content"`
	FirstName string      `json:"firstName"`
	LastName  string      `json:"lastName"`
	Like      int         `json:"like"`
}

type OutUser struct {
	ID        interface{} `json:"id"`
	LastName  string      `json:"lastName"`
	FirstName string      `json:"firstName"`
	Email     string      `json:"email"`
	Phone     string      `json:"phone"`
	Avatar    string      `json:"avatar"`
}

var arrResp = arResp{}
var post = model.Post{}
var comDto = CommentDto{}
var out = OutPost{}
var object = objResp{}
var user = model.User{}

// var resp = Resp{}
func (process *Process) AllPost(w http.ResponseWriter, r *http.Request) {
	var array []interface{} // map[string]interface{}
	posts, err := post.FindAllPosts(process.DB)

	if err != nil {
		log.ErrorOp("get_all_post", err)
		response.ErrorJson(w, http.StatusInternalServerError, "error interne")
		return
	}
	// Set json in array
	for _, val := range *posts {
		out.ID = val.ID
		out.Title = val.Title
		out.Content = val.Content
		out.Like = val.Like
		out.LastName = val.Author.LastName
		out.FirstName = val.Author.FirstName
		array = append(array, out)
	}

	response.SuccessJSon(w, http.StatusOK, arrResp.arrResponse(200, "sucess", array))
}

func (process *Process) FetchPost(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)
	_id, err := strconv.ParseInt(id["id"], 10, 64)

	if err != nil {
		log.ErrorOp("get_id_post", err)
		response.ErrorJson(w, http.StatusBadRequest, "error_interne")
		return
	}

	_post, err := post.FindPostId(process.DB, _id)

	if err != nil {
		log.ErrorOp("get_one_post", err)
		response.ErrorJson(w, http.StatusInternalServerError, "error interne")
		return
	}

	out.ID = _post.ID
	out.Title = _post.Title
	out.Content = _post.Content
	out.Like = _post.Like
	out.FirstName = _post.Author.FirstName
	out.LastName = _post.Author.LastName
	response.SuccessJSon(w, http.StatusOK, object.objectResponse(200, "sucess", out))
}

func (process *Process) CreateComment(w http.ResponseWriter, r *http.Request) {
	comment := model.Comment{}
	err := json.NewDecoder(r.Body).Decode(&comDto)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	email, err := auth.GetUserCurrent(r)

	if err != nil {
		response.ErrorJson(w, http.StatusBadRequest, "user not found")
		return
	}

	connected, err := user.UserConneted(process.DB, email)

	if err != nil {
		response.ErrorJson(w, http.StatusBadRequest, "user not found")
		return
	}

	_post, err := post.FindPostId(process.DB, comDto.Id)

	if err != nil {
		log.ErrorOp("get_one_post", err)
		response.ErrorJson(w, http.StatusInternalServerError, "error interne")
		return
	}

	user.ID = connected.ID
	user.LastName = connected.LastName
	user.FirstName = connected.FirstName
	user.Email = connected.Email
	user.Phone = connected.Phone
	user.Avatar = connected.Avatar
	user.Password = connected.Password
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	post.ID = _post.ID
	post.Title = _post.Title
	post.Content = _post.Content
	post.Like = _post.Like
	post.AuthorID = _post.AuthorID
	post.Author = _post.Author
	post.CreatedAt = _post.CreatedAt
	post.UpdatedAt = _post.UpdatedAt

	comment.Content = html.EscapeString(strings.TrimSpace(comDto.Content))
	comment.Author = user
	comment.AuthorID = connected.ID
	comment.Post = post
	comment.PostID = post.ID
	comment.Like = 0
	comment.CreatedAt = time.Now()
	comment.UpdatedAt = time.Now()
	comment.Save(process.DB)
	response.SuccessJSon(w, http.StatusOK, ARespCreated(201, "comments has been created"))
}

func (process *Process) UpdateComment(w http.ResponseWriter, r *http.Request) {
	com := model.Comment{}
	id := mux.Vars(r)
	_id, err := strconv.ParseInt(id["id"], 10, 64)

	if err != nil {
		log.ErrorOp("get_id_comment", err)
		response.ErrorJson(w, http.StatusBadRequest, "error_interne")
		return
	}
	err = json.NewDecoder(r.Body).Decode(&comDto)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	// email, err := auth.GetUserCurrent(r)
	comVal, err := com.FindById(process.DB, _id)
	fmt.Println(comVal)

	// response.SuccessJSon(w, http.StatusOK, ARespCreated(201, "comments has been created"))
}

func (process *Process) FetchProfile(w http.ResponseWriter, r *http.Request) {
	outUser := OutUser{}
	id := mux.Vars(r)
	_id, err := strconv.Atoi(id["id"])

	if err != nil {
		log.ErrorOp("get_id_post", err)
		response.ErrorJson(w, http.StatusBadRequest, "error interne")
		return
	}

	_user, err := user.FindUserId(process.DB, _id)

	if err != nil {
		log.ErrorOp("get_one_profil", err)
		response.ErrorJson(w, http.StatusInternalServerError, "user not found")
		return
	}
	outUser.ID = _user.ID
	outUser.FirstName = _user.FirstName
	outUser.LastName = _user.LastName
	outUser.Email = _user.Email
	outUser.Phone = _user.Phone
	outUser.Avatar = _user.Avatar

	fmt.Println(_user)

	response.SuccessJSon(w, http.StatusOK, object.objectResponse(200, "sucess", outUser))

}

func (process *Process) LikeHandler(w http.ResponseWriter, r *http.Request) {
	objDto := ObjectDto{}
	post := model.Post{}
	com := model.Comment{}
	err := json.NewDecoder(r.Body).Decode(&objDto)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	if objDto.IsPost {
		_post, err := post.FindPostId(process.DB, objDto.Id)

		if err != nil {
			log.ErrorOp("get_id_post", err)
			response.ErrorJson(w, http.StatusBadRequest, "error interne")
			return
		}
		x := fmt.Sprintln("post", _post)
		fmt.Println(x)
		// post.Save(process.DB)
	} else {
		_com, err := com.FindById(process.DB, objDto.Id)
		if err != nil {
			log.ErrorOp("get_id_post", err)
			response.ErrorJson(w, http.StatusBadRequest, "error interne")
			return
		}
		x := fmt.Sprintln("coms", _com)
		// com.Save(process.DB)
		fmt.Println(x)
	}

	response.SuccessJSon(w, http.StatusOK, ARespCreated(200, "like incremented"))
}

func (res *arResp) arrResponse(code int, msg string, obj []interface{}) *arResp {
	res.Code = code
	res.Message = msg
	res.Data = obj

	return res
}

func (res *objResp) objectResponse(code int, msg string, obj interface{}) *objResp {
	res.Code = code
	res.Message = msg
	res.Data = obj

	return res
}
