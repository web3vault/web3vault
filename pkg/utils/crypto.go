package utils

// Crypto is an interface that defines methods for encryption and decryption.
type Crypto interface {
	Encrypt(string) string
	Decrypt(string) string
}

// XOR is a struct that represents the XOR encryption algorithm.
type XOR struct {
	K string // The encryption key for XOR algorithm.
}

// AES256 is a struct that represents the AES-256 encryption algorithm.
type AES256 struct {
	K string // The encryption key for AES-256 algorithm.
}

// Shasha20 is a struct that represents the Shasha-20 encryption algorithm.
type Shasha20 struct {
	K string // The encryption key for Shasha-20 algorithm.
}

// TODO: Implement the Encrypt and Decrypt method for the AES algorithm.

// Encrypt encrypts the given string using the XOR algorithm.
func (x XOR) Encrypt(s string) string {
	var o string
	for i := 0; i < len(s); i++ {
		o += string(s[i] ^ x.K[i%len(x.K)])
	}
	return o
}

func (x XOR) Decrypt(s string) string {
	return x.Encrypt(s)
}
