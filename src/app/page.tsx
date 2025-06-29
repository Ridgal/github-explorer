"use client";

import { useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/SearchForm";
import RepoCard from "@/components/RepoCard";
import githubClient from "@/lib/githubClient";
import { SEARCH_REPOS_QUERY } from "@/queries/searchRepos";
import { useState } from "react";
import { UserRepositoriesResponse } from "@/types/github";

export default function Home() {
  const [username, setUsername] = useState("");

  const { data, isLoading, error } = useQuery<UserRepositoriesResponse>({
    queryKey: ["repos", username],
    queryFn: () => githubClient.request(SEARCH_REPOS_QUERY, { username }),
    enabled: !!username,
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Repository Explorer</h1>
      <SearchForm onSubmit={setUsername} />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {data?.user?.repositories?.nodes?.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </main>
  );
}
