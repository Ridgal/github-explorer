export interface Repository {
  id: string;
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  owner: {
    login: string;
  };
}

export interface UserRepositoriesResponse {
  user: {
    repositories: {
      nodes: Repository[];
    };
  } | null;
}

export interface CommitHistory {
  edges: {
    node: {
      committedDate: string;
    };
  }[];
}

export interface CommitActivity {
  target: {
    history: CommitHistory;
  };
}

export interface Issue {
  id: string;
  title: string;
  number: number;
  state: "OPEN" | "CLOSED";
  author: {
    login: string;
  };
}

export interface RepositoryDetails {
  repository: {
    name: string;
    description: string | null;
    commitActivity: CommitActivity;
    issues: {
      nodes: Issue[];
    };
  };
}
