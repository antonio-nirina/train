package process

import (
	"fmt"
	"log"
	"net/http"

	"github.com/antonio-nirina/formation/blog/server2/auth"
	"github.com/antonio-nirina/formation/blog/server2/model"
	"github.com/jinzhu/gorm"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Process struct {
	DB *gorm.DB
	Router *mux.Router
}

func (process *Process) Initialize(dbUser string, dbPassword string, dbHost string, dbName string) { //*sql.DB
	var err error
	_uri := fmt.Sprintf("%s:%s@(%s)/%s?charset=utf8&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbName)
	process.DB, err = gorm.Open("mysql", _uri)

	if err != nil {
		fmt.Printf("Cannot connect to database Mysql")
		log.Fatal("This is the error:", err)
	} else {
		fmt.Println("We are connected to the database Mysql")
	}

	process.DB.AutoMigrate(&model.Post{}, &model.User{}, &model.Comment{})
	// Route
	process.Router = mux.NewRouter()
	process.Router.HandleFunc("/", process.Home).Methods("GET")
	process.Router.HandleFunc("/register", process.CreateUser).Methods("POST")
	process.Router.HandleFunc("/login", process.Signin).Methods("POST")

	process.Router.HandleFunc("/api/create/post", auth.HelperTokenMiddleware(process.CreatePost)).Methods("POST")
	process.Router.HandleFunc("/api/posts", auth.HelperTokenMiddleware(process.AllPost)).Methods("GET")
	process.Router.HandleFunc("/api/post/{id}", auth.HelperTokenMiddleware(process.FetchPost)).Methods("GET")

	process.Router.HandleFunc("/api/create/comment", auth.HelperTokenMiddleware(process.CreateComment)).Methods("POST")
	process.Router.HandleFunc("/api/comment/{id}", auth.HelperTokenMiddleware(process.UpdateComment)).Methods("GET")
	process.Router.HandleFunc("/api/profile/{id}", auth.HelperTokenMiddleware(process.FetchProfile)).Methods("GET")
	process.Router.HandleFunc("/api/like", auth.HelperTokenMiddleware(process.LikeHandler)).Methods("POST")
	fmt.Println("Run in 8080")
	log.Fatal(http.ListenAndServe(":8080", process.Router))
}
