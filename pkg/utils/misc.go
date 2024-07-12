package utils

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func Ok(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})
}
