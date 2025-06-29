import Link from "next/link";
import { Repository } from "@/types/github";

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <Link href={`/repo/${repo.owner.login}/${repo.name}`}>
      <article
        tabIndex={0}
        aria-label={`Репозиторий ${repo.name}. ${repo.stargazerCount} звезд. Последнее обновление ${repo.updatedAt}`}
        className="border p-4 rounded shadow hover:shadow-md transition-shadow cursor-pointer"
      >
        <h3 className="text-xl font-bold">{repo.name}</h3>
        <p className="text-gray-600">{repo.description || "No description"}</p>
        <div className="flex gap-4 mt-2 text-sm">
          <span>⭐ {repo.stargazerCount}</span>
          <span>🍴 {repo.forkCount}</span>
          <span>
            Last updated: {new Date(repo.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </article>
    </Link>
  );
}
