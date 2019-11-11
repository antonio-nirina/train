package main

import (
	//"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	// "github.com/jinzhu/gorm"
	"github.com/antonio-nirina/formation/blog/server2/handler"
	"github.com/antonio-nirina/formation/blog/server2/process"
	"github.com/joho/godotenv"
)

func main() {
	a := process.Process{}
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbName := os.Getenv("DATABASE")
	dbPwd := os.Getenv("DB_PWD")
	dbUser := os.Getenv("DB_USER")
	host := os.Getenv("DB_HOST")
	a.Initialize(dbUser, dbPwd, host, dbName)
	fmt.Println("Run in 8080")
	myRouter := mux.NewRouter()
	myRouter.HandleFunc("/", a.Home).Methods("GET")
	myRouter.HandleFunc("/register", a.CreateUser).Methods("POST")
	myRouter.HandleFunc("/login", a.Signin).Methods("POST")
	myRouter.HandleFunc("/api/create/post", process.HelperTokenMiddleware(a.CreatePost)).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}
