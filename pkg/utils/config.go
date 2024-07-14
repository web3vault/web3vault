package utils

import (
	"encoding/json"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

// Config represents the configuration settings for the application.
type Config struct {
	Port                int    `json:"port"`
	Debug               bool   `json:"debug"`
	MasterKey           string `json:"masterKey"`
	IpfsGateway         string `json:"ipfsGateway"`
	ChainId             int64  `json:"chainId"`
	RPCAddress          string `json:"RPCAddress"`
	ContractAddress     string `json:"ContractAddress"`
	EncryptionAlgorithm string `json:"encryptionAlgorithm"`
}

// LoadConfiguration loads the configuration settings from the specified file.
func LoadConfiguration(file string) (Config, error) {

	err := InitConfiguration(file)
	Check(err)

	var config Config
	configFile, err := os.Open(file)
	if err != nil {
		config = Config{
			Port:                8081,
			Debug:               false,
			IpfsGateway:         "http://127.0.0.1:8080/",
			MasterKey:           "3ECB00DB9C0F56D72861E88A02D5D914629525EF03072B516A523FF92BB14F5D",
			ChainId:             8453, // We did the deployment from Remix, but it was planned initially to deploy it from the backend
			RPCAddress:          "http://127.0.0.1:8545",
			EncryptionAlgorithm: "AES256",
		}
		return config, err
	} else {
		defer configFile.Close()
		jsonParser := json.NewDecoder(configFile)
		jsonParser.Decode(&config)
		return config, nil
	}
}

// GetConfiguration returns the configuration settings for the application.
func GetConfiguration(c *gin.Context) {
	configContent, err := LoadConfiguration("./config.json")
	if err != nil {
		log.Fatal(err)
	}
	log.Println(configContent)
	c.IndentedJSON(200, configContent)
}

// InitConfiguration initializes the configuration file with default values if it doesn't exist.
// It takes a file path as a parameter and returns an error if any occurred during the initialization process.
func InitConfiguration(file string) error {
	if checkFileExists(file) {
		return nil
	} else {
		log.Println("Init configuration...")
		config := Config{
			Port:                8081,
			Debug:               false,
			IpfsGateway:         "http://127.0.0.1:8080/",
			MasterKey:           "3ECB00DB9C0F56D72861E88A02D5D914629525EF03072B516A523FF92BB14F5D",
			ChainId:             8453,
			RPCAddress:          "http://127.0.0.1:8545",
			EncryptionAlgorithm: "AES256",
		}
		content, err := json.MarshalIndent(config, "", "    ")
		if err != nil {
			return err
		}
		err = os.WriteFile(file, content, 0664)
		if err != nil {
			return err
		}
		return nil
	}
}

func SaveConfig(config Config) error {
	content, err := json.MarshalIndent(config, "", "    ")
	Check(err)
	err = os.WriteFile("./config.json", content, 0664)
	Check(err)
	return nil
}

func UpdateMasterKey(c *gin.Context) {
	config, err := LoadConfiguration("./config.json")
	Check(err)

	mk := c.PostForm("mk")
	config.MasterKey = mk

	SaveConfig(config)
	c.IndentedJSON(200, config)
}
