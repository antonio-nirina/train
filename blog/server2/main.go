package main

import (
	//"errors"
	"log"
	"os"

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
	
}
