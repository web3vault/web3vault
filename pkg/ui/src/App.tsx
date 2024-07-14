import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/ui/Navbar";
import EntityList from "./components/EntityList";
import EntityListDetail from "./components/EntityListDetail";
import axios from "axios";
import EntityCreate from "./components/EntityCreate";
import Footer from "./components/Footer";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";
import Connecting from "./components/Connecting";
import SyncComponent from "./components/SyncComponent";

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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [listItem, setListItem] = useState(undefined);
  const account = useAccount();
  const { connectors, connect, status, error: cerror } = useConnect();
  const { disconnect } = useDisconnect();

  async function getEntity() {
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
  }

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      await getEntity();
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
    setShowCreateForm(true);
  }

  const styling = {
    background:
      "linear-gradient(90deg, rgba(100,76,143,0.6) 0%, rgba(52,41,81,0.6) 87%, rgba(6,38,43,0.6) 100%)",
    backShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const sidebarStyling = {
    background: "#eee",
  };

  const KeyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={15}
      height={15}
      fill="white"
    >
      <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zm40-256a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
    </svg>
  );

  const VaultIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={20}
      height={15}
      fill="white"
    >
      <path d="M64 0C28.7 0 0 28.7 0 64v352c0 35.3 28.7 64 64 64h16l16 32h64l16-32h224l16 32h64l16-32h16c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm160 320a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-240a160 160 0 1 1 0 320 160 160 0 1 1 0-320zm256 141.3V336c0 8.8-7.2 16-16 16s-16-7.2-16-16V221.3c-18.6-6.6-32-24.4-32-45.3 0-26.5 21.5-48 48-48s48 21.5 48 48c0 20.9-13.4 38.7-32 45.3z" />
    </svg>
  );

  return (
    <>
      <Navbar></Navbar>
      <div className="p-8" style={styling}>
        <Button className="mr-8" onClick={createVault}>
          <VaultIcon></VaultIcon>
          <span style={{ marginLeft: 10 }}> Init new Vault</span>
        </Button>
        <Button className="mr-8" onClick={newVaultEntry}>
          <KeyIcon></KeyIcon>
          <span style={{ marginLeft: 10 }}> Create a new Entry</span>
        </Button>
        <SyncComponent />
      </div>
      <div className="grid grid-flow-col gap-6 pt-6" style={sidebarStyling}>
        <div className="col-span-3">
          {data && data.entries && !showCreateForm
            ? data.entries.map((item) => (
                <EntityList
                  listItem={item}
                  setListItem={setListItem}
                  key={item.id}
                />
              ))
            : ""}
        </div>
        <div className="col-span-9 pt-6">
          {showCreateForm ? (
            <EntityCreate setShowCreateForm={setShowCreateForm} />
          ) : (
            <div>
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
          )}
        </div>
      </div>
      {/* <Connecting
        account={account}
        disconnect={disconnect}
        connectors={connectors}
        connect={connect}
        cerror={cerror}
        status={status}
      /> */}
      <Footer />
    </>
  );
}

export default App;
