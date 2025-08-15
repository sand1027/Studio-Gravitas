export default function Press() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold">Press</h1>
      <ul className="space-y-4 text-base sm:text-lg">
        <li>
          Article in Domus Magazine -{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Link
          </a>
        </li>
        <li>
          Feature in Architectural Digest -{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Link
          </a>
        </li>
      </ul>
    </div>
  );
}
