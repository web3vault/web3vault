package utils

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

type Entry struct {
	Name     string `json:"_name"`
	Login    string `json:"login"`
	Password string `json:"password"`
	Website  string `json:"website"`
	Note     string `json:"note"`
}

type Category struct {
	ID      int     `json:"id"`
	Label   string  `json:"_label"`
	Entries []Entry `json:"entries"`
}

type Database struct {
	DbName     string     `json:"_dbName"`
	Categories []Category `json:"categories"`
}

func (db Database) generateID() int {
	var id int
	for _, c := range db.Categories {
		if c.ID > id {
			id = c.ID
		}
	}
	return id + 1
}

func (db Database) AddCategory(label string) (Database, Category) {
	c := Category{
		ID:    db.generateID(),
		Label: label,
	}
	db.Categories = append(db.Categories, c)
	return db, c
}

func (db Database) GetCategoryIndex(c Category) int {
	for i, v := range db.Categories {
		if v.ID == c.ID {
			return i
		}
	}
	return -1
}

func (cat Category) AddEntry(n string, l string, p string, w string, c string) Category {
	e := Entry{
		Name:     n,
		Login:    l,
		Password: p,
		Website:  w,
		Note:     c,
	}
	cat.Entries = append(cat.Entries, e)
	return cat
}

func (c Category) GetEntryIndex(e Entry) int {
	for i, v := range c.Entries {
		if v.Name == e.Name {
			return i
		}
	}
	return -1
}

func NewDatabase(name string) Database {
	var c []Category
	return Database{
		DbName:     name,
		Categories: c,
	}
}

func EndpointNewDatabase(c *gin.Context) {
	db := NewDatabase("myDB")

	db, social := db.AddCategory("Social")

	idx := db.GetCategoryIndex(social)

	db.Categories[idx] = db.Categories[idx].AddEntry("GitHub", "foo", "cat", "https://github.com/login", "My GH account")
	db.Categories[idx] = db.Categories[idx].AddEntry("Twitter", "foo", "bird", "https://x.com/login", "My X account")

	db.Save()
	c.IndentedJSON(200, db)
}

func (db Database) Save() {
	config, err := LoadConfiguration("./config.json")
	Check(err)
	b, err := json.Marshal(db)
	Check(err)
	fmt.Println(string(b))
	var crypt Crypto = XOR{K: config.MasterKey}
	enc := crypt.Encrypt(string(b))

	err = os.WriteFile("./db.enc", []byte(enc), 0664)
	Check(err)
	err = os.WriteFile("./db.json", b, 0664)
	Check(err)
}

func LoadDatabase() Database {
	if checkFileExists("./db.enc") {
		config, err := LoadConfiguration("./config.json")
		Check(err)
		b, err := os.ReadFile("./db.enc")
		Check(err)
		var crypt Crypto = XOR{K: config.MasterKey}
		dec := crypt.Decrypt(string(b))
		fmt.Println(dec)
		var db Database
		err = json.Unmarshal([]byte(dec), &db)
		Check(err)
		return db
	} else {
		return NewDatabase("myDB")
	}
}
