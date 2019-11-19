package model

import (
	"bytes"
	"errors"
	"time"
	"crypto/sha512"
	// "fmt"

	log "github.com/antonio-nirina/formation/blog/server2/flog"
	"github.com/badoux/checkmail"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int       `gorm:"primary_key;auto_increment" json:"id"`
	LastName      string    `gorm:"size:255;" json:"lastname"`
	FirstName 	string    `gorm:"size:255;" json:"firstName"`
	Email     string    `gorm:"size:100;not null;unique" json:"email"`
	Phone     string    `gorm:"size:255;" json:"phone"`
	Password  string    `gorm:"size:100;not null;" json:"password"`
	Avatar    string    `gorm:"size:255;" json:"avatar"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (u *User) Validate(db *gorm.DB,email string) string {
	var err error
	if u.Email == "" || u.Password == "" {
		return "Email and Password not blank"
	}

	if err := checkmail.ValidateFormat(u.Email); err != nil {
		return "Invalid Email"
	}

	err = db.Debug().Model(User{}).Where("email = ?", email).Take(&u).Error
	if err != nil {
		log.ErrorOp("error_get_user_validate",err)
		return "error_interne"
	}
	if !gorm.IsRecordNotFoundError(err) {
		return "email has used"
	}

	return ""
}

func (user *User) Save(db *gorm.DB){
	// fmt.Println()
	db.Create(&user)
} 

// CreateHash Will create hash password
// It should never panic if plainText is given properly
func (u *User) CreateHash(plainText string) (hashText string) {
	preparedPlainText := preparePasswordInput(plainText)
	passwordHashInBytes, err := bcrypt.GenerateFromPassword([]byte(preparedPlainText), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	hashText = string(passwordHashInBytes)
	return
}

// VerifyPassword compares hash to plain text, if same it will no return error
// If not same, it will return error
func (u *User) VerifyPassword(plainText string, hashText string) (err error) {
	preparedPlainText := preparePasswordInput(plainText)
	plainTextInBytes := []byte(preparedPlainText)
	hashTextInBytes := []byte(hashText)
	err = bcrypt.CompareHashAndPassword(hashTextInBytes, plainTextInBytes)
	return
}

// Bcrypt truncates strings which are longer than 72 characters.
// This prepares the plainText input, so that more than that can be used.
func preparePasswordInput(plainText string) (preparedPasswordInput string) {
	// Creates a SHA512 hash, trimmed to 64 characters, so that it fits in bcrypt
	hashedInput := sha512.Sum512_256([]byte(plainText))
	// Bcrypt terminates at NULL bytes, so we need to trim these away
	trimmedHash := bytes.Trim(hashedInput[:], "\x00")
	preparedPasswordInput = string(trimmedHash)
	return
}

func (u *User) FindUserByEmail(db *gorm.DB, email string) (*User, error) {
	var err error
	err = db.Debug().Model(User{}).Where("email = ?", email).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	if gorm.IsRecordNotFoundError(err) {
		return &User{}, errors.New("User Not Found")
	}
	return u, err
}

func (u *User) DeleteAUser(db *gorm.DB, uid uint32) (int64, error) {

	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Delete(&User{})

	if db.Error != nil {
		return 0, db.Error
	}
	return db.RowsAffected, nil
}

func (u *User) UserConneted(db *gorm.DB, email string)(*User, error) {
	var err error
	err = db.Debug().Model(User{}).Where("email = ?", email).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	if gorm.IsRecordNotFoundError(err) {
		return &User{}, errors.New("User Not Found")
	}
	return u, err
}

func (u *User) FindUserId(db *gorm.DB, id int)(*User, error) {
	var err error
	err = db.Debug().Model(User{}).Where("id = ?", id).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	if gorm.IsRecordNotFoundError(err) {
		return &User{}, errors.New("User Not Found")
	}
	return u, err
}
