import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const res = await fetch("http://vault.localhost:8081/api/v0/");
      const data = await res.json();
      console.log("Response: ", data.message);

      // set state with the result
      setData(data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Web3vault - EthGlobal 2024</h1>
    </>
  );
}

export default App;
