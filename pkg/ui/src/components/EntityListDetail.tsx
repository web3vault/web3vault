export default function showEntityDetails({ entry }) {
  return (
    <div className="mt-6">
      {entry.name} - {entry.login} - {entry.password}!
    </div>
  );
}
