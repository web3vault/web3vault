import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/ui/Navbar";
import EntityList from "./components/EntityList";
import EntityListDetail from "./components/EntityListDetail";
import axios from "axios";

interface Entry {
  name: string;
  login: string;
  password: string;
  website: string;
  note: string;
  categories: Array<string>;
}

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
    console.log("createVaultEntry");
    axios.get("http://vault.localhost:8081/api/v0/newDB").catch((error) => {
      console.error("There was an error!", error);
    });
  }

  // new vault entry
  function newVaultEntry() {
    console.log("createVaultEntry");

    const count = data?.entries ? data?.entries?.length : "";
    const entry: Entry = {
      name: "test " + count,
      login: "test",
      password: "test",
      website: "test",
      note: "test",
      categories: ["test"],
    };
    axios
      .post("http://vault.localhost:8081/api/v0/entry", entry)
      .then((response) => console.log(response))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function syncVault() {
    console.log("syncVault");
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-8">
        {data && data.entries
          ? data.entries.map((item) => (
              <EntityList
                listItem={item}
                setListItem={setListItem}
                key={item.id}
              />
            ))
          : ""}

        <Button className="mr-8" onClick={createVault}>
          Create a new Vault
        </Button>
        <Button className="mr-8" onClick={newVaultEntry}>
          Create a new Entry
        </Button>
        <Button className="mr-8" variant="secondary" onClick={syncVault}>
          Sync your Vault
        </Button>

        {listItem && data && data.entries
          ? data.entries.map((item) =>
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
