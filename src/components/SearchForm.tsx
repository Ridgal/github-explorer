"use client";

import { useState } from "react";

export default function SearchForm({
  onSubmit,
}: {
  onSubmit: (username: string, reset?: boolean) => void;
}) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username);
  };

  const handleClear = () => {
    localStorage.removeItem("savedRepos");
    onSubmit("", true);
    setUsername("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 sm:items-center"
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Введите GitHub username"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow cursor-pointer"
        >
          🔍 Поиск
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow cursor-pointer"
        >
          🗑️ Очистить
        </button>
      </div>
    </form>
  );
}
