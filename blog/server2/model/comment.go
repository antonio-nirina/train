package model

import (
	"time"
	// "fmt"
	"github.com/jinzhu/gorm"
)

type Comment struct {
	ID        uint64    `gorm:"primary_key;auto_increment" json:"id"`
	Content   string    `gorm:"size:255;not null;" json:"content"`
	AuthorID  int       `gorm:"not null" json:"author_id"`
	Author    User      `json:"author"`
	PostID 	 uint64 `gorm:"column:post_id"`
	Post   	Post 
	Like      int       `gorm: json:"like"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (comment *Comment) TableName() string {
	return "comment"
}

func (comment *Comment) Save(db *gorm.DB) {
	// fmt.Println()
	db.Create(&comment)
}

func (p *Comment) FindById(db *gorm.DB,id int64) (*Comment, error) {
	var err error
	com := Comment{}
	err = db.Debug().Model(&Comment{}).First(&com,id).Error

	if err != nil {
		return &Comment{}, err
	}

	return &com, nil
}