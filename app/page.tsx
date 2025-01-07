'use client';

import { useState, useEffect } from 'react';
import { useGitHubSearch } from '../hooks/useGithubSearch';
import SearchBar from '@/components/SearchBar';
import RepositoryList from '@/components/RepositoryList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Star, TrendingUp } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Headers';

export default function Home() {
  const { searchTerm, setSearchTerm, repositories, suggestions, loading, error, loadMore, hasMore, totalCount } = useGitHubSearch();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [favoriteRepos, setFavoriteRepos] = useState<any[]>([]);

  // Handle client-side only effects (localStorage)
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedRepos = localStorage.getItem('favoriteRepos');

    if (storedFavorites) {
      const parsedFavorites = new Set(JSON.parse(storedFavorites));
      setFavorites(parsedFavorites);
    }

    if (storedRepos) {
      setFavoriteRepos(JSON.parse(storedRepos));
    }
  }, []);

  const toggleFavorite = (repo: any) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(repo.id)) {
        newFavorites.delete(repo.id);
        setFavoriteRepos(favoriteRepos.filter(r => r.id !== repo.id));
      } else {
        newFavorites.add(repo.id);
        setFavoriteRepos([...favoriteRepos, repo]);
      }
      localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
      localStorage.setItem('favoriteRepos', JSON.stringify(favoriteRepos));
      return newFavorites;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Discover GitHub's Hidden Gems</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Explore millions of repositories, find trending projects, and bookmark your favorites.
          </p>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            suggestions={suggestions}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 pl-5">Why use GitHubExplorer?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Github className="h-12 w-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Vast Repository</h3>
              <p className="text-gray-600 dark:text-gray-400">Access millions of GitHub repositories in one place.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Star className="h-12 w-12 mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Smart Bookmarking</h3>
              <p className="text-gray-600 dark:text-gray-400">Save your favorite projects for quick access later.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Trending Projects</h3>
              <p className="text-gray-600 dark:text-gray-400">Discover popular and trending repositories easily.</p>
            </div>
          </div>
        </section>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="search">Search Results</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarked Repos</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {repositories.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Found {totalCount.toLocaleString()} repositories
              </p>
            )}
            <RepositoryList
              repositories={repositories}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
            {hasMore && (
              <div className="mt-8 text-center">
                <Button onClick={loadMore} disabled={loading}>
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="bookmarks">
            <h2 className="text-2xl font-bold mb-4">Bookmarked Repositories</h2>
            <RepositoryList
              repositories={favoriteRepos}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

