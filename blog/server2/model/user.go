package model

import (
	// "bytes"
	// "crypto/sha512"
	// "errors"
	"time"
	// "fmt"
	// "github.com/jinzhu/gorm"
	// "golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int       `gorm:"primary_key;auto_increment" json:"id"`
	Name      string    `gorm:"size:255;" json:"name"`
	Email     string    `gorm:"size:100;not null;unique" json:"email"`
	Phone     string    `gorm:"size:255;" json:"phone"`
	Password  string    `gorm:"size:100;not null;" json:"password"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
