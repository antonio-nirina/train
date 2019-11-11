package model

import (
	"time"
	// "fmt"
	// "github.com/jinzhu/gorm"
)

type Post struct {
	ID        uint64    `gorm:"primary_key;auto_increment" json:"id"`
	Title     string    `gorm:"size:255;not null;unique" json:"title"`
	Content   string    `gorm:"size:255;not null;" json:"content"`
	AuthorID  int       `gorm:"not null" json:"author_id"`
	Author    User      `json:"author"`
	Like      int       `gorm: json:"like"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (Post *Post) TableName() string {
	return "post"
}

func (post *Post) Save(db *gorm.DB) {
	// fmt.Println()
	db.Create(&post)
}
