import { Button } from "@/components/ui/button";
import { log } from "console";
import { useReadContract, useWriteContract } from "wagmi";
import { bigint } from "zod";

export default function SyncComponent() {
  const { writeContract } = useWriteContract();

  const SyncIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={15}
      height={15}
      fill="black"
    >
      <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224h128c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-24.4 24.4-42 53.1-52.8 83.8-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v128c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1 24.4-24.4 42.1-53.1 52.9-83.7 5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2S177.7 288 168 288H40c-13.3 0-24 10.7-24 24z" />
    </svg>
  );

  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "addr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "pointer",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "NewVault",
      type: "event",
    },
    {
      inputs: [],
      name: "_count",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getVault",
      outputs: [
        { internalType: "string", name: "", type: "string" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_encryptedReference", type: "string" },
      ],
      name: "publishVault",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;

  const contractAddress = "0xB85e9607a719a1d51963114aF94F49dAa1335aF1";

  async function syncVault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "publishVault",
      args: ["hkjfdshgiuii234"],
    });
    console.log("syncVault");
  }

  return (
    <div>
      <Button className="mr-8 mt-6" variant="secondary" onClick={syncVault}>
        <SyncIcon></SyncIcon>
        <span style={{ marginLeft: 10 }}>Sync your Vault</span>
      </Button>
    </div>
  );
}
