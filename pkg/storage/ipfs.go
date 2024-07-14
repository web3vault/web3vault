package storage

import (
	"fmt"
	"os/exec"
)

// addFileToIPFS adds a file to IPFS using the `ipfs add` command and returns the CID.
func AddFileToIPFS(filePath string) (string, error) {
	cmd := exec.Command("ipfs", "add", "--quieter", filePath)
	cid, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("failed to add file to IPFS: %w", err)
	}
	return string(cid), nil
}
