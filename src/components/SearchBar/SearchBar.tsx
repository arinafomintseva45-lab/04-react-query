import type { FormEvent } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;

    if (!query.trim()) {
      toast.error("Search cannot be empty");
      return;
    }

    onSubmit(query);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" type="text" placeholder="Search movies..." />
      <button type="submit">Search</button>
    </form>
  );
}