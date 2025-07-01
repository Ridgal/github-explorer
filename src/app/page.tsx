"use client";

// import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import SearchForm from "@/components/SearchForm";
import RepoCard from "@/components/RepoCard";

import githubClient from "@/lib/githubClient";

import { SEARCH_REPOS_QUERY } from "@/queries/searchRepos";
import { Repository, UserRepositoriesResponse } from "@/types/github";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useLocalStorage<string>("lastUsername", "");
  const [storedRepos, setStoredRepos] = useLocalStorage<Repository[]>(
    "savedRepos",
    []
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<UserRepositoriesResponse>({
    queryKey: ["repos", username],
    queryFn: async ({ pageParam = null }) =>
      githubClient.request(SEARCH_REPOS_QUERY, {
        username,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.user?.repositories?.pageInfo;
      return pageInfo?.hasNextPage ? pageInfo.endCursor : undefined;
    },
    enabled: !!username,
  });

  useEffect(() => {
    if (!data?.pages) return;

    const allRepos = data.pages
      .flatMap((page) => page.user?.repositories?.nodes ?? [])
      .filter((r): r is Repository => !!r);

    const uniqueRepos = Array.from(
      new Map(allRepos.map((r) => [r.id, r])).values()
    );

    const isEqual =
      storedRepos.length === uniqueRepos.length &&
      storedRepos.every((r, i) => r.id === uniqueRepos[i].id);

    if (!isEqual) {
      setStoredRepos(uniqueRepos);
    }
  }, [data, setStoredRepos, storedRepos]);

  const handleSearch = (newUsername: string) => {
    setUsername(newUsername);
    setStoredRepos([]);
  };

  const allRepos = Array.from(
    new Map(
      (
        data?.pages.flatMap((page) => page.user?.repositories?.nodes ?? []) ??
        storedRepos
      ).map((r) => [r.id, r])
    ).values()
  );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Repository Explorer</h1>
      <SearchForm onSubmit={handleSearch} />

      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {(error as Error).message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {allRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
          </button>
        </div>
      )}
    </main>
  );
}
