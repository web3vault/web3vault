/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EntityList({
  listItem,
  setListItem,
}: {
  listItem: any;
  setListItem: any;
}) {
  function showEntityDetails(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    console.log("showEntityDetails", event);
    setListItem((event.target as HTMLDivElement).id);
  }

  return (
    <div
      onClick={showEntityDetails}
      className="mt-6 mb-6 border-b-2"
      id={listItem?.id}
    >
      {listItem?.name}
    </div>
  );
}
