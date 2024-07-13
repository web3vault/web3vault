

export default function NodeDetails() {
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
    
    const SvgComponent = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill="none"
      >
        <path
          fill="#2b6cb0"
          fillRule="evenodd"
          d="M23.962 2.265c0-.781-.633-1.415-1.415-1.415h-3.096c-.782 0-1.415.634-1.415 1.415v3.066c0 .782.633 1.415 1.415 1.415h1.946c.781 0 1.415.634 1.415 1.415v19.573c0 .782.633 1.415 1.415 1.415h3.096c.781 0 1.415-.633 1.415-1.415V8.16c0-.781-.634-1.415-1.415-1.415h-1.946a1.415 1.415 0 0 1-1.415-1.415zm-11.892 0c0-.78-.633-1.414-1.415-1.414H7.56c-.782 0-1.415.633-1.415 1.415V5.33c0 .782-.634 1.415-1.415 1.415H2.576c-.781 0-1.415.634-1.415 1.415v19.574c0 .781.634 1.415 1.415 1.415h3.097c.781 0 1.415-.634 1.415-1.415V8.162c0-.781.633-1.415 1.415-1.415h2.152c.782 0 1.415-.633 1.415-1.415zm5.884 11.287c0-.782-.633-1.415-1.415-1.415h-3.096c-.781 0-1.415.633-1.415 1.415v8.624c0 .782.634 1.415 1.415 1.415h3.096c.782 0 1.415-.633 1.415-1.415z"
          clipRule="evenodd"
        />
      </svg>
    )
    
    return (
    <div>  
      <a href="https://base.blockscout.com/address/0xB85e9607a719a1d51963114aF94F49dAa1335aF1?tab=contract" target="blank" style={buttonStyle} aria-label="fff">
          <SvgComponent></SvgComponent>
          <span style={{paddingTop:7}}>Contract</span>
      </a>
    </div>
  );
}