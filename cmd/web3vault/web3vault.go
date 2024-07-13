package main

import (
	"fmt"
	"log"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/web3vault/web3vault/pkg/ui"
	"github.com/web3vault/web3vault/pkg/utils"
)

func main() {

	// CONFIGURATION
	utils.InitConfiguration("./config.json")
	config, err := utils.LoadConfiguration("./config.json")
	utils.Check(err)
	fmt.Println(config)

	// Start the web server
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
	api.GET("/newDB", utils.EndpointNewDatabase)
	api.GET("/db", utils.EndpointGetDatabase)
	api.GET("/sync", utils.EndpointSyncDatabase)
	api.POST("/entry", utils.EndpointAddEntry)
	api.POST("/retrieveDB", utils.EndpointGetBackSyncedDatabase)
	api.PUT("/entry/:id", utils.EndpointEditEntry)
	api.DELETE("/entry/:id", utils.EndpointDeleteEntry)
	api.POST("/entry/:id/category", utils.EndpointAddCategory)
	api.DELETE("/entry/:id/category/:name", utils.EndpointDeleteCategory)
	api.POST("/updateMasterKey", utils.UpdateMasterKey)

	// React SPA Middleware
	// It must be last middleware declared
	router.Use(ui.NewHandler().ServeSPA)
	uiUrl := fmt.Sprintf("http://vault.localhost:%d/", config.Port)
	fmt.Println(uiUrl)
	log.Printf(utils.Green+"Vault UI available at %v"+utils.Reset, uiUrl)
	ui.OpenInBrowser(uiUrl)

	// Run with HTTP
	log.Printf(utils.Green+"API is listening on http://127.0.0.1:%d/api/v0/"+utils.Reset, config.Port)
	err = router.Run("127.0.0.1:" + strconv.FormatUint(uint64(config.Port), 10))
	utils.Check(err)
}
