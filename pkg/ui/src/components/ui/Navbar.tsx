import Blockscout from "./Blockscout";
import { usePrivy } from "@privy-io/react-auth";


export default function Navbar() {

    const styling = {
        background: "linear-gradient(90deg, rgba(100,76,143,1) 0%, rgba(52,41,81,1) 13%, rgba(6,38,43,1) 100%)",
        backShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderTop: "2px solid #55DDFF",
    }

    const buttonStyle = {
        minHeight: "50px",
        borderRadius: "12px",
        display: "flex",
        padding: "7px 12px 7px 8px",
        marginRight: "1em",
        backgroundColor:"#fff",
        color: "#000",
        boxShadow: "none",
        gap: "8px",
        fontFamily: "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        '&:hover': {
          backgroundColor:"#eee"
        }
      };

    const { ready, authenticated, user, login, logout } = usePrivy();
    // Wait until the Privy client is ready before taking any actions
    if (!ready) {
      return null;
    }

    const PrivyLogo = () => (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={29}
        height={29}
      >
        <path
            fill="#ff8271"
            d="M14.914.65C9.393.65 4 4.255 4 9.166c0 1.319.757 2.594 2.734 2.738-1.649 1.633-2.42 3.59-2.42 5.455 0 3.411 3.146 4.94 6.221 4.95 7.196 0 15.154-4.424 15.113-11.825C25.618 5.148 20.716.607 14.914.65zm.422 7.076c1.153 0 2.09 1.124 2.09 2.51 0 1.386-.937 2.51-2.09 2.51-1.154 0-2.088-1.124-2.088-2.51 0-1.386.934-2.51 2.088-2.51zm5.988 0c1.154 0 2.088 1.124 2.088 2.51 0 1.386-.934 2.51-2.088 2.51s-2.088-1.124-2.088-2.51c0-1.386.935-2.51 2.088-2.51zm-6.603 16.957a9.674 1.967 0 0 0-9.674 1.969 9.674 1.967 0 0 0 9.674 1.967 9.674 1.967 0 0 0 9.673-1.967 9.674 1.967 0 0 0-9.673-1.969z"
            />
      </svg>
    )

    const truncateAddress = (address: string|undefined) => {
        if (!address) {
          return '';
        }
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      };

    return (
        <nav  style={styling} className="bg-primary border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" className="flex items-center">
                <img src="./web3vault_baseline.svg" alt="logo" height="5px"/>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li>
                    <Blockscout></Blockscout>
                </li>
                <li>
                {ready && authenticated ? (
          <div>
            <button onClick={logout} style={buttonStyle}>
                <span style={{color:"#333", fontFamily: "monospace", paddingRight: 3, paddingTop:7}}>                
                    ({truncateAddress(user?.wallet?.address)})  
                </span>
                <span style={{paddingTop:7}}>Log out</span>
            </button>
          </div>
        ) : (
          <button onClick={login} style={buttonStyle}>
            <PrivyLogo></PrivyLogo>
            <span style={{paddingTop:7}}>Connect</span>
        </button>
        )}
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}
