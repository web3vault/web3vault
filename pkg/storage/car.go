package storage

// func main() {
// 	// path/to/my.car
// 	data, _ := os.ReadFile("./db.car")

// 	// generate the CID for the CAR
// 	mh, _ := multihash.Sum(data, multihash.SHA2_256, -1)
// 	link := cidlink.Link{Cid: cid.NewCidV1(0x0202, mh)}

// 	rcpt, _ := client.StoreAdd(
// 		issuer,
// 		space,
// 		&storeadd.Caveat{Link: link, Size: len(data)},
// 		client.WithProofs(proofs),
// 	)

// 	// "upload" means it needs to be uploaded, "done" means it is already done!
// 	if rcpt.Out().Ok().Status == "upload" {
// 		hr, _ := http.NewRequest("PUT", *rcpt.Out().Ok().Url, bytes.NewReader(data))

// 		hdr := map[string][]string{}
// 		for k, v := range rcpt.Out().Ok().Headers.Values {
// 			hdr[k] = []string{v}
// 		}

// 		hr.Header = hdr
// 		hr.ContentLength = len(data)
// 		httpClient := http.Client{}
// 		res, _ := httpClient.Do(hr)
// 		res.Body.Close()
// 	}

// 	fmt.Println(link.String())
// }
