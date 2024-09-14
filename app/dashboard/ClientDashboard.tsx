'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';

interface Url {
  id: number;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}

interface ClientDashboardProps {
  urls: Url[];
}

export default function ClientDashboard({
  urls: initialUrls,
}: ClientDashboardProps) {
  const [urls, setUrls] = useState(initialUrls);
  const [newUrl, setNewUrl] = useState('');

  const handleCreateUrl = () => {
    if (newUrl) {
      const newShortUrl = {
        id: urls.length + 1,
        originalUrl: newUrl,
        shortUrl: `https://short.url/${Math.random()
          .toString(36)
          .substr(2, 6)}`,
        clicks: 0,
      };
      setUrls([...urls, newShortUrl]);
      setNewUrl('');
    }
  };

  const handleEditUrl = (id: number) => {
    console.log('Edit URL with id:', id);
  };

  const handleDeleteUrl = (id: number) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  return (
    <Card className="bg-gray-800 mb-8">
      <CardHeader>
        <CardTitle>Gestionar URLs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Ingrese una nueva URL"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
          />
          <Button onClick={handleCreateUrl}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Crear URL
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL Original</TableHead>
              <TableHead>URL Corta</TableHead>
              <TableHead>Clics</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map(url => (
              <TableRow key={url.id}>
                <TableCell className="font-medium">{url.originalUrl}</TableCell>
                <TableCell>{url.shortUrl}</TableCell>
                <TableCell>{url.clicks}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditUrl(url.id)}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUrl(url.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
