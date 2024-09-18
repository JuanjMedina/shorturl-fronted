'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { IShortURLUSer, userUrlsService } from '../services/shorturl';
import ClientDashboard from './ClientDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [urls, setUrls] = useState<IShortURLUSer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      const fetchedUrls = await userUrlsService();
      if (fetchedUrls) {
        setUrls(fetchedUrls);
      }
      setLoading(false);
    }
    fetchUrls();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account');
  };

  const handleUpdateUser = () => {
    console.log('Update user');
  };

  const addUrl = (newUrl: IShortURLUSer) => {
    setUrls(prevUrls => [...prevUrls, newUrl]);
  };

  const updateUrl = (updatedUrl: IShortURLUSer) => {
    setUrls(prevUrls =>
      prevUrls.map(url => (url._id === updatedUrl._id ? updatedUrl : url)),
    );
  };

  const deleteUrl = (deletedUrlId: string) => {
    // setUrls(prevUrls => prevUrls.filter(url => url._id !== deletedUrlId));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-800 border-gray-700"
            >
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-gray-200 focus:text-white focus:bg-gray-700 hover:text-white hover:bg-gray-700 cursor-pointer"
              >
                Salir
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteAccount}
                className="text-gray-200 focus:text-white focus:bg-gray-700 hover:text-white hover:bg-gray-700 cursor-pointer"
              >
                Eliminar cuenta
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleUpdateUser}
                className="text-gray-200 focus:text-white focus:bg-gray-700 hover:text-white hover:bg-gray-700 cursor-pointer"
              >
                Actualizar usuario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="mb-8 text-white">
          <Card className="bg-gray-800">
            <CardContent className="flex justify-between items-center p-6">
              <CardTitle className="text-white text-lg">
                Total de URLs
              </CardTitle>
              {loading ? (
                <Skeleton className="h-10 w-20 bg-gray-700" />
              ) : (
                <p className="text-4xl font-bold text-white/80">
                  {urls.length}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 bg-gray-700" />
            <Skeleton className="h-32 bg-gray-700" />
            <Skeleton className="h-32 bg-gray-700" />
          </div>
        ) : (
          // Pasamos la función `addUrl` a `ClientDashboard`
          <ClientDashboard
            urls={urls}
            onAddUrl={addUrl}
            onUpdateUrl={updateUrl}
            onDeleteUrl={deleteUrl}
          />
        )}
      </div>
    </div>
  );
}
