"use client";

import { useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/SearchForm";
import RepoCard from "@/components/RepoCard";
import githubClient from "@/lib/githubClient";
import { SEARCH_REPOS_QUERY } from "@/queries/searchRepos";
import { useEffect, useState } from "react";
import { UserRepositoriesResponse } from "@/types/github";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [username, setUsername] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storedRepos, setStoredRepos] = useLocalStorage<any[]>(
    "savedRepos",
    []
  );

  const { data, isLoading, error } = useQuery<UserRepositoriesResponse>({
    queryKey: ["repos", username],
    queryFn: () => githubClient.request(SEARCH_REPOS_QUERY, { username }),
    enabled: !!username,
  });

  useEffect(() => {
    if (data?.user?.repositories?.nodes) {
      setStoredRepos(
        data.user.repositories.nodes.map((repo) => ({
          ...repo,
          formattedUpdatedAt: repo.updatedAt
            ? repo.updatedAt.split("T")[0]
            : "неизвестно",
        }))
      );
    }
  }, [data, setStoredRepos]);

  const handleSearch = (username: string, reset = false) => {
    setUsername(username);
    if (reset) {
      setStoredRepos([]);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Repository Explorer</h1>
      <SearchForm onSubmit={handleSearch} />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {storedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </main>
  );
}
