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
        className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <h3 className="text-lg font-semibold text-blue-400 mb-1 truncate">
          {repo.name}
        </h3>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {repo.description || "Описание отсутствует"}
        </p>

        <div className="flex items-center flex-wrap gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            ⭐ <span>{repo.stargazerCount}</span>
          </span>
          <span className="flex items-center gap-1">
            🍴 <span>{repo.forkCount}</span>
          </span>
          <span className="ml-auto">
            Обновлено: {new Date(repo.updatedAt).toISOString().split("T")[0]}
          </span>
        </div>
      </article>
    </Link>
  );
}
