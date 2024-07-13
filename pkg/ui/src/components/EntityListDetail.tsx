export default function showEntityDetails({ entry }) {
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
          {entry.categories.map((category) => (
            <li>category</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
