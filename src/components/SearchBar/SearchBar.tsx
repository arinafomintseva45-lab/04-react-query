import { useState } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleAction(formData: FormData) {
    const value = String(formData.get("query") || "").trim();

    if (!value) {
      toast.error("Search query cannot be empty");
      return;
    }

    onSubmit(value);
    setQuery("");
  }

  return (
    <form action={handleAction}>
      <input
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}