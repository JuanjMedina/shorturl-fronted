'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IShortURLUSer, userUrlsService } from '../services/shorturl';
import ClientDashboard from './ClientDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

export function DashboardComponent() {
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
    // Implement logout logic
    console.log('Logout');
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic
    console.log('Delete account');
  };

  const handleUpdateUser = () => {
    // Implement update user logic
    console.log('Update user');
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                Salir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteAccount}>
                Eliminar cuenta
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUpdateUser}>
                Actualizar usuario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-white">
          <Card className="bg-gray-800">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-white text-lg">
                Total de URLs
              </CardTitle>
              {loading ? (
                <Skeleton className="h-6 w-12 bg-gray-700" />
              ) : (
                <p className="text-4xl font-bold">{urls.length}</p>
              )}
            </CardHeader>
          </Card>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 bg-gray-700" />
            <Skeleton className="h-32 bg-gray-700" />
            <Skeleton className="h-32 bg-gray-700" />
          </div>
        ) : (
          <ClientDashboard urls={urls} />
        )}
      </div>
    </div>
  );
}