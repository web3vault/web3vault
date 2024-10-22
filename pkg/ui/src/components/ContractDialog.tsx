import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

const SvgComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none">
    <path
      fill="#2b6cb0"
      fillRule="evenodd"
      d="M23.962 2.265c0-.781-.633-1.415-1.415-1.415h-3.096c-.782 0-1.415.634-1.415 1.415v3.066c0 .782.633 1.415 1.415 1.415h1.946c.781 0 1.415.634 1.415 1.415v19.573c0 .782.633 1.415 1.415 1.415h3.096c.781 0 1.415-.633 1.415-1.415V8.16c0-.781-.634-1.415-1.415-1.415h-1.946a1.415 1.415 0 0 1-1.415-1.415zm-11.892 0c0-.78-.633-1.414-1.415-1.414H7.56c-.782 0-1.415.633-1.415 1.415V5.33c0 .782-.634 1.415-1.415 1.415H2.576c-.781 0-1.415.634-1.415 1.415v19.574c0 .781.634 1.415 1.415 1.415h3.097c.781 0 1.415-.634 1.415-1.415V8.162c0-.781.633-1.415 1.415-1.415h2.152c.782 0 1.415-.633 1.415-1.415zm5.884 11.287c0-.782-.633-1.415-1.415-1.415h-3.096c-.781 0-1.415.633-1.415 1.415v8.624c0 .782.634 1.415 1.415 1.415h3.096c.782 0 1.415-.633 1.415-1.415z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ContractDialog() {
  //   const [contractData, setContractData] = useState<number>(0);
  const contractAddress = "0xB85e9607a719a1d51963114aF94F49dAa1335aF1";
  const [transactionsCount, setTransactionsCount] = useState<number>(0);
  const [partiallyVerified, setPartiallyVerified] = useState<boolean>(null);
  const [smartContractName, setSmarrContractName] = useState<string>("");

  const ExternalIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={15}
      height={15}
      fill="black"
    >
      <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112v320c0 44.2 35.8 80 80 80h320c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v112c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h112c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
    </svg>
  );

  const buttonStyle = {
    minHeight: "50px",
    borderRadius: "12px",
    display: "flex",
    padding: "7px 12px 7px 8px",
    marginRight: "1em",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "none",
    gap: "8px",
    fontFamily:
      "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    "&:hover": {
      backgroundColor: "#eee",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      // Partner: Blockscout
      const query = `
          {
            address(hash: "${contractAddress}") {
              smartContract {
                name
                contractSourceCode
                partiallyVerified
              }
              transactionsCount
            }
          }
        `;

      const response = await fetch(
        "https://base.blockscout.com/api/v1/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 853bbe52-d09a-4356-b7ca-daf211e348b3",
          },
          body: JSON.stringify({ query }),
        }
      );

      const responseData = await response.json();
      console.log("responseData", responseData.data.address);

      setTransactionsCount(responseData.data.address.transactionsCount);
      setPartiallyVerified(
        responseData.data.address.smartContract.partiallyVerified
      );
      setSmarrContractName(responseData.data.address.smartContract.name);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex mr-4">
          <SvgComponent></SvgComponent>
          <span className="mt-1 ml-2">Contract</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contract Informations</DialogTitle>
          <DialogDescription>
            Get here more information about the Contract, which is used to
            retrieve the database, while synchronizating:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <a
              href={
                "https://base.blockscout.com/address/" +
                contractAddress +
                "?tab=contract"
              }
              target="blank"
              style={buttonStyle}
              aria-label="fff"
            >
              <SvgComponent></SvgComponent>
              <span style={{ paddingTop: 7 }}>
                Contract: {smartContractName}
              </span>
              <span style={{ paddingTop: 10 }}>
                <ExternalIcon />
              </span>
            </a>
            <span>{contractAddress}</span>
          </div>

          <div>
            How many times a sync has happend: <b>{transactionsCount}</b>
          </div>

          <div>
            Is this Contract partiallyVerified?{" "}
            <b>{partiallyVerified ? "Yes" : "No"}</b>
          </div>

          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Ok</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
