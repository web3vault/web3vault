package utils

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

type Entry struct {
	ID         int      `json:"id"`
	Name       string   `json:"name"`
	Login      string   `json:"login"`
	Password   string   `json:"password"`
	Website    string   `json:"website"`
	Note       string   `json:"note"`
	Categories []string `json:"categories"`
}

type Database struct {
	DbName  string  `json:"dbName"`
	Entries []Entry `json:"entries"`
}

func (db Database) generateID() int {
	var id int
	for _, c := range db.Entries {
		if c.ID > id {
			id = c.ID
		}
	}
	return id + 1
}

func (db Database) AddCategory(entryId int, label string) Database {
	idx := db.GetEntryIndexById(entryId)
	db.Entries[idx].Categories = append(db.Entries[idx].Categories, label)
	db.Save()
	return db
}

func (db Database) GetEntryIndexById(id int) int {
	for i, v := range db.Entries {
		if v.ID == id {
			return i
		}
	}
	return -1
}

func (db Database) AddEntry(n string, l string, p string, w string, c string) Database {
	e := Entry{
		ID:       db.generateID(),
		Name:     n,
		Login:    l,
		Password: p,
		Website:  w,
		Note:     c,
	}
	db.Entries = append(db.Entries, e)
	db.Save()
	return db
}

// func (c Category) GetEntryIndex(e Entry) int {
// 	for i, v := range c.Entries {
// 		if v.Name == e.Name {
// 			return i
// 		}
// 	}
// 	return -1
// }

func NewDatabase(name string) Database {
	var e []Entry
	return Database{
		DbName:  name,
		Entries: e,
	}
}

func EndpointNewDatabase(c *gin.Context) {
	db := NewDatabase("myDB")

	db = db.AddEntry("GitHub", "foo", "octocat", "https://github.com/login", "My GH account")
	db = db.AddEntry("Twitter", "foo", "bird", "https://x.com/login", "My X account")
	db = db.AddCategory(1, "Social")
	db = db.AddCategory(1, "Development")
	db = db.AddCategory(2, "Social")
	db.Save()

	c.IndentedJSON(200, db)
}

func (db Database) Save() {
	config, err := LoadConfiguration("./config.json")
	Check(err)
	b, err := json.Marshal(db)
	Check(err)
	fmt.Println(string(b))
	var crypt Crypto = AES256{K: config.MasterKey}
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
		var crypt Crypto = AES256{K: config.MasterKey}
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
