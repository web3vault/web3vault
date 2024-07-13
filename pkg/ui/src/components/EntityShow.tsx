export default function EnityShow({ entry }) {
  return (
    <div>
      <h1>Show</h1>
      <div className="text-left mb-2">Name: {entry.name}</div>
      <div className="text-left mb-2">Login/Username: {entry.login}</div>
      <div className="text-left mb-2">Password: {entry.password}</div>
      <div className="text-left mb-2">Website: {entry.website}</div>
      <div className="text-left mb-2">Note: {entry.note}</div>
      <div className="text-left mb-2">
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
      </div>
    </div>
  );
}
