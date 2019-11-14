package main

import (
	//"errors"
	"os"

	"github.com/antonio-nirina/formation/blog/server2/process"
	log "github.com/antonio-nirina/formation/blog/server2/flog"
	"github.com/joho/godotenv"
)

func main() {
	a := process.Process{}
	err := godotenv.Load()

	if err != nil {
		log.FatalOp("Error loading .env file",err)
		// log.Fatal("Error loading .env file")
	}

	dbName := os.Getenv("DATABASE")
	dbPwd := os.Getenv("DB_PWD")
	dbUser := os.Getenv("DB_USER")
	host := os.Getenv("DB_HOST")
	a.Initialize(dbUser, dbPwd, host, dbName)
	
}


