package main

import (
	"log"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/web3vault/web3vault/pkg/ui"
	"github.com/web3vault/web3vault/pkg/utils"
)

func main() {
	// Start the web server
	log.Println("Hello Ethereum")

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	router.SetTrustedProxies(nil)
	router.Use(cors.Default())

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	router.Use(gin.Recovery())

	// API Router
	api := router.Group("/api/v0")
	api.GET("/", utils.Ok)
	api.GET("/ping", utils.Ping)

	// React SPA Middleware
	// It must be last middleware declared
	router.Use(ui.NewHandler().ServeSPA)
	log.Printf("VPN UI available at http://vault.localhost:%d/\n", 8081)

	// Run with HTTP
	log.Println("API is listening on http://0.0.0.0:8081/api/v0/")
	err := router.Run("0.0.0.0:" + strconv.FormatUint(8081, 10))
	utils.Check(err)
}
