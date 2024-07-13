package utils

import (
	"encoding/json"
	"errors"
	"os"
	"strconv"

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
	idx, err := db.GetEntryIndexById(entryId)
	Check(err)
	db.Entries[idx].Categories = append(db.Entries[idx].Categories, label)
	db.Save()
	return db
}

func EndpointAddCategory(c *gin.Context) {
	db := LoadDatabase()
	entryId, _ := strconv.Atoi(c.Param("id"))
	label := c.PostForm("label")
	db = db.AddCategory(entryId, label)
	c.IndentedJSON(200, db)
}

func EndpointDeleteCategory(c *gin.Context) {
	db := LoadDatabase()
	entryId, _ := strconv.Atoi(c.Param("id"))
	label := c.Param("name")
	idx, err := db.GetEntryIndexById(entryId)
	Check(err)
	for i, v := range db.Entries[idx].Categories {
		if v == label {
			db.Entries[idx].Categories = append(db.Entries[idx].Categories[:i], db.Entries[idx].Categories[i+1:]...)
			db.Save()
			c.IndentedJSON(200, db)
			return
		}
	}
	c.IndentedJSON(404, "Category not found")
}

func (db Database) GetEntryIndexById(id int) (int, error) {
	for i, v := range db.Entries {
		if v.ID == id {
			return i, nil
		}
	}
	return -1, errors.New("Entry not found")
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

func EndpointAddEntry(c *gin.Context) {
	db := LoadDatabase()
	var entry Entry
	c.BindJSON(&entry)
	db = db.AddEntry(entry.Name, entry.Login, entry.Password, entry.Website, entry.Note)
	c.IndentedJSON(200, db)
}

func EndpointDeleteEntry(c *gin.Context) {
	db := LoadDatabase()
	id, _ := strconv.Atoi(c.Param("id"))
	idx, err := db.GetEntryIndexById(id)
	if err != nil {
		c.IndentedJSON(404, err.Error())
		return
	}
	db.Entries = append(db.Entries[:idx], db.Entries[idx+1:]...)
	db.Save()
	c.IndentedJSON(200, db)
}

func EndpointEditEntry(c *gin.Context) {
	db := LoadDatabase()
	id, _ := strconv.Atoi(c.Param("id"))
	idx, err := db.GetEntryIndexById(id)
	if err != nil {
		c.IndentedJSON(404, err.Error())
		return
	}
	var entry Entry
	c.BindJSON(&entry)
	entry.ID = id
	db.Entries[idx] = entry
	db.Save()
	c.IndentedJSON(200, db)
}

func NewDatabase(name string) Database {
	var e []Entry
	return Database{
		DbName:  name,
		Entries: e,
	}
}

func EndpointNewDatabase(c *gin.Context) {
	db := NewDatabase("myDB")

	// db = db.AddEntry("GitHub", "foo", "octocat", "https://github.com/login", "My GH account")
	// db = db.AddEntry("Twitter", "foo", "bird", "https://x.com/login", "My X account")
	// db = db.AddCategory(1, "Social")
	// db = db.AddCategory(1, "Development")
	// db = db.AddCategory(2, "Social")
	db.Save()

	c.IndentedJSON(200, db)
}

func EndpointGetDatabase(c *gin.Context) {
	db := LoadDatabase()
	c.IndentedJSON(200, db)
}

func (db Database) Save() {
	config, err := LoadConfiguration("./config.json")
	Check(err)
	b, err := json.Marshal(db)
	Check(err)
	// fmt.Println(string(b))
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
		// fmt.Println(dec)
		var db Database
		err = json.Unmarshal([]byte(dec), &db)
		Check(err)
		return db
	} else {
		return NewDatabase("myDB")
	}
}
