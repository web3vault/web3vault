/* eslint-disable @typescript-eslint/no-explicit-any */
export default function showEntityDetails({ entry }: { entry: any }) {
  return (
    <div className="mt-6" id={entry.id}>
      <div>Name: {entry.name}</div>
      <div>Login/Username: {entry.login}</div>
      <div>Password: {entry.password}</div>
      <div>Website: {entry.website}</div>
      <div>Note: {entry.note}</div>
      <div>
        Categories:{" "}
        <ul className="list-disc">
          {entry?.categories?.map((category: string) => (
            <li>{category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
