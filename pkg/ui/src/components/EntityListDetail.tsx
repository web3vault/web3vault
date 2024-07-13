import axios from "axios";
import { Button } from "./ui/button";
import EntityShow from "./EntityShow";
import EntityEdit from "./EntityEdit";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EntityListDetail({ entry }: { entry: any }) {
  const [showEditForm, setShowEditForm] = useState(false);

  function deleteEntityItem(event: React.MouseEvent<HTMLDivElement>) {
    console.log(event.target.id);
    axios
      .delete("http://vault.localhost:8081/api/v0/entry/" + event.target.id)
      .then((response) => console.log(response))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function editEntityItem(event: React.MouseEvent<HTMLDivElement>) {
    console.log(event.target.id);
    setShowEditForm(true);
  }

  return (
    <div className="bg-white p-6 mr-6" id={entry.id}>
      {showEditForm ? (
        <EntityEdit
          entry={entry}
          setShowEditForm={setShowEditForm}
        ></EntityEdit>
      ) : (
        <div>
          <div className="flex justify-center">
            <EntityShow entry={entry} />
          </div>
          <div>
            <Button
              className="mt-8"
              variant="outline"
              id={entry?.id}
              onClick={editEntityItem}
            >
              Edit
            </Button>
            <Button
              className="mt-8 ml-4"
              variant="outline"
              id={entry?.id}
              onClick={deleteEntityItem}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
