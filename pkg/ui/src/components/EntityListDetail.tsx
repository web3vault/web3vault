import axios from "axios";
import { Button } from "./ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function showEntityDetails({ entry }: { entry: any }) {
  function deleteEntityItem(event: React.MouseEvent<HTMLDivElement>) {
    console.log(event.target.id);
    axios
      .delete("http://vault.localhost:8081/api/v0/entry/" + event.target.id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <div className="mt-6" id={entry.id}>
      <div className="text-left">Name: {entry.name}</div>
      <div className="text-left">Login/Username: {entry.login}</div>
      <div className="text-left">Password: {entry.password}</div>
      <div className="text-left">Website: {entry.website}</div>
      <div className="text-left">Note: {entry.note}</div>
      <div className="text-left">
        {entry?.categories ? (
          <div>
            Categories:
            <ul className="list-disc">
              {entry.categories.map((category: string) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div>
          <Button
            className="mt-8"
            variant="outline"
            id={entry?.id}
            onClick={deleteEntityItem}
          >
            x
          </Button>
        </div>
      </div>
    </div>
  );
}
