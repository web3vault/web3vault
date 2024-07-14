import ContractDialog from "../ContractDialog";

export default function NodeDetails() {
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

  return (
    <div>
      <span style={buttonStyle}>
        <ContractDialog />
      </span>
    </div>
  );
}
