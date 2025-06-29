"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { REPO_DETAILS_QUERY } from "@/queries/repoDetails";
import githubClient from "@/lib/githubClient";
import CommitActivityChart from "@/components/CommitActivityChart";
import IssuesList from "@/components/IssuesList";
import { RepositoryDetails } from "@/types/github";

export default function RepoPage({
  params,
}: {
  params: Promise<{ owner: string; name: string }>;
}) {
  const { owner, name } = use(params);

  const { data, isLoading, error } = useQuery<RepositoryDetails>({
    queryKey: ["repo", owner, name],
    queryFn: () => githubClient.request(REPO_DETAILS_QUERY, { owner, name }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{data?.repository.name}</h1>
      <p>{data?.repository.description}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Commit Activity</h2>
        <CommitActivityChart data={data?.repository.commitActivity} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Issues</h2>
        <IssuesList issues={data?.repository.issues.nodes} />
      </div>
    </div>
  );
}
