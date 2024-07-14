export default function EnityShow({ entry }) {
  return (
    <div>
      <h1>Show</h1>
      <div className="text-left mb-2">
        Name: <b>{entry.name}</b>
      </div>
      <div className="text-left mb-2">Login/Username: {entry.login}</div>
      <div className="text-left mb-2">Password: *****</div>
      <div className="text-left mb-2">
        Website: <a href="{entry.website}">{entry.website}</a>
      </div>
      {entry.note ? (
        <div className="text-left mb-2">Note: {entry.note}</div>
      ) : (
        ""
      )}
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
  );
}
