export default function EntityList({ listItem, setListItem }) {
  function showEntityDetails(event) {
    event.preventDefault();
    // console.log("showEntityDetails", event);
    setListItem(event.target.id);
  }

  return (
    <div onClick={showEntityDetails} className="mt-4 mb-8" id={listItem?.id}>
      {listItem?.name}
    </div>
  );
}
