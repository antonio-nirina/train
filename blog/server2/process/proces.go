package process

import (
	"fmt"
	"log"

	"github.com/antonio-nirina/formation/blog/server2/model"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Process struct {
	DB *gorm.DB
	// Router *mux.Router
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

	process.DB.AutoMigrate(&model.Post{}, &model.User{}, &model.Order{}, &model.Product{})
	// process.Router = mux.NewRouter()
}
