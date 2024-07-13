import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/ui/Navbar";
import EntityList from "./components/EntityList";
import EntityListDetail from "./components/EntityListDetail";

function App() {
  const [data, setData] = useState<{ entries: any[] }>({ entries: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [listItem, setListItem] = useState(undefined);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      try {
        // Start fetching data
        // get the data from the api
        const response = await fetch("http://vault.localhost:8081/api/v0/db");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Response: ", data.entries);

        // set state with the result
        setData(data);
      } catch (error: any) {
        setError(error); // Set error state
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // newDB
  function createVault() {
    console.log("createVault");
    //     // POST request using axios with error handling
    //     const article = { title: 'React POST Request Example' };
    //     axios.post('https://reqres.in/invalid-url', article)
    //         .then(response => this.setState({ articleId: response.data.id }))
    //         .catch(error => {
    //             this.setState({ errorMessage: error.message });
    //             console.error('There was an error!', error);
    //         });
  }

  function syncVault() {
    console.log("syncVault");
  }

  function importVault() {
    console.log("importVault");
  }

  console.log(data);

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-8">
        {data?.entries
          ? data?.entries.map((item) => (
              <EntityList
                listItem={item}
                setListItem={setListItem}
                key={item.id}
              />
            ))
          : ""}

        {/* {console.log("ListItem: ", listItem.id)} */}

        <Button className="mr-8" onClick={createVault}>
          Create a new Vault
        </Button>
        <Button className="mr-8" variant="secondary" onClick={syncVault}>
          Sync your Vault
        </Button>
        <Button className="mr-8" variant="secondary" onClick={importVault}>
          Import Vault
        </Button>

        {/* {console.log("adsdas: ", listItem)} */}
        {/* {console.log("adsdas 32: ", data.entries)} */}
        {listItem
          ? data?.entries.map((item) =>
              item.id == listItem ? (
                <EntityListDetail key={item.id} entry={item} />
              ) : (
                ""
              )
            )
          : ""}
      </div>
    </>
  );
}

export default App;
