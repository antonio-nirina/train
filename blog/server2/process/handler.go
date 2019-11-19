package process

import (
	"encoding/json"
	"html"
	"strings"
	"time"
	//"errors"
	// "fmt"
	"net/http"

	//"github.com/gorilla/mux"
	"github.com/antonio-nirina/formation/blog/server2/auth"
	"github.com/antonio-nirina/formation/blog/server2/model"
	"github.com/antonio-nirina/formation/blog/server2/response"
	"golang.org/x/crypto/bcrypt"
)

type Acc struct {
	Service string `json:"service"`
}
type PostDto struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type UserDto struct {
	LastName      string `json:"lastName"`
	FirstName      string `json:"firstName"`
	Email     string `json:"email"`
	Telephone string `json:"telephone"`
	Password  string `json:"password"`
	Avatar string `json:"avatar"`
}

type CheckPwd struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Resp struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Token   string `json:"token"`
}

var res = Resp{}

func (process *Process) Home(w http.ResponseWriter, r *http.Request) {
	var hh Acc
	hh.Service = "Api servicepostal"
	response.SuccessJSon(w, http.StatusOK, hh)
}

func (process *Process) CreatePost(w http.ResponseWriter, r *http.Request) {
	user := model.User{}
	postDto := PostDto{}
	post := model.Post{}
	err := json.NewDecoder(r.Body).Decode(&postDto)

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

	user.ID = connected.ID
	user.LastName = connected.LastName
	user.FirstName = connected.FirstName
	user.Email = connected.Email
	user.Phone = connected.Phone
	user.Avatar = connected.Avatar
	user.Password = connected.Password
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	post.Title = html.EscapeString(strings.TrimSpace(postDto.Title))
	post.Content = html.EscapeString(strings.TrimSpace(postDto.Content))
	post.Author = user
	post.AuthorID = connected.ID
	post.Like = 0
	post.CreatedAt = time.Now()
	post.UpdatedAt = time.Now()
	post.Save(process.DB)
	response.SuccessJSon(w, http.StatusOK, post)
}

func (process *Process) CreateUser(w http.ResponseWriter, r *http.Request) {
	// res := Resp{}
	usertDto := UserDto{}
	user := model.User{}
	err := json.NewDecoder(r.Body).Decode(&usertDto)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	hashPwd := user.CreateHash(usertDto.Password)
	user.LastName = usertDto.LastName
	user.FirstName = usertDto.FirstName
	user.Email = html.EscapeString(strings.TrimSpace(usertDto.Email))
	user.Phone = html.EscapeString(strings.TrimSpace(usertDto.Telephone))
	user.Password = hashPwd
	user.Avatar = usertDto.Avatar
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	errValid := user.Validate(process.DB,usertDto.Email)

	if errValid != "" {
		response.ErrorJson(w, http.StatusBadRequest, errValid)
		return
	}
	user.Save(process.DB)

	response.SuccessJSon(w, http.StatusOK, ARespCreated(201, "user created"))
}

func (process *Process) Signin(w http.ResponseWriter, r *http.Request) {
	check := CheckPwd{}
	user := model.User{}
	// res := Resp{}
	err := json.NewDecoder(r.Body).Decode(&check)

	if err != nil {
		response.ErrorJson(w, http.StatusBadRequest, "error interne")
		return
	}

	if check.Email == "" || check.Password == "" {
		response.ErrorJson(w, http.StatusBadRequest, "Email and Password not blank")
		return
	}

	err = process.DB.Debug().Model(model.User{}).Where("email = ?", check.Email).Take(&user).Error
	if err != nil {
		response.ErrorJson(w, http.StatusBadRequest, "error interne")
		return
	}

	err = user.VerifyPassword(check.Password, user.Password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		response.ErrorJson(w, http.StatusBadRequest, "error interne")
		return
	}

	token, err := auth.CreateToken(check.Email,user.ID)
	if err != nil {
		response.ErrorJson(w, http.StatusBadRequest, "error interne")
		return
	}

	// fmt.Println(token)
	response.SuccessJSon(w, http.StatusOK, res.aResponse(200, "success", token))
}

func (res *Resp) aResponse(code int, msg string, data string) *Resp {
	res.Code = code
	res.Message = msg
	res.Token = data

	return res
}

func ARespCreated(code int, msg string) *Resp {
	res := &Resp{}
	res.Code = code
	res.Message = msg

	return res
}
