import { Star, GitFork, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface RepositoryListProps {
  repositories: Repository[];
  favorites: Set<number>;
  toggleFavorite: (repo: Repository) => void;
}

export default function RepositoryList({ repositories, favorites, toggleFavorite }: RepositoryListProps) {
  if (repositories.length === 0) {
    return <p className="text-center mt-8">No repositories found.</p>;
  }

  return (
    <ul className="mt-8 space-y-4">
      {repositories.map((repo) => (
        <li key={repo.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <img src={repo.owner?.avatar_url || '/placeholder.svg?height=40&width=40'} alt={`${repo.owner?.login || 'Owner'}'s avatar`} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{repo.full_name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">by {repo.owner?.login || 'Unknown'}</p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(repo)}
              className={`p-2 rounded-full ${
                favorites.has(repo.id) ? 'bg-yellow-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Star size={20} />
            </button>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{repo.description || 'No description available'}</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span>{repo.stargazers_count?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex items-center">
              <GitFork size={16} className="text-gray-500 mr-1" />
              <span>{repo.forks_count?.toLocaleString() || '0'}</span>
            </div>
            {repo.language && (
              <Badge variant="secondary">{repo.language}</Badge>
            )}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
              <ExternalLink size={16} className="mr-1" />
              View on GitHub
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

