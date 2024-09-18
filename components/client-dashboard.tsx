'use client';

import { useEffect, useState } from 'react';
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
import { createPersonalizeUrl, IShortURLUSer, updatePersonalizeUrl } from '../services/shorturl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface ClientDashboardProps {
  urls: IShortURLUSer[];
  onAddUrl: (newUrl: IShortURLUSer) => void;
  onUpdateUrl: (updatedUrl: IShortURLUSer) => void;
}

export function ClientDashboardComponent({
  urls: initialUrls,
  onAddUrl,
  onUpdateUrl,
}: ClientDashboardProps) {
  const [urls, setUrls] = useState(initialUrls);
  const [newUrl, setNewUrl] = useState('');
  const [customName, setCustomName] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<IShortURLUSer | null>(null);
  const [editedUrl, setEditedUrl] = useState('');

  useEffect(() => {
    setUrls(initialUrls);
  }, [initialUrls]);

  const handleCreateUrl = async () => {
    const response = await createPersonalizeUrl({
      data: {
        name: customName,
        url: newUrl,
      },
    });

    if (response) {
      onAddUrl(response);
    }

    setNewUrl('');
    setCustomName('');
  };

  const handleEditClick = (url: IShortURLUSer) => {
    setEditingUrl(url);
    setEditedUrl(url.url);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (editingUrl) {
      const updatedUrl = await updatePersonalizeUrl({
        id: editingUrl._id,
        data: { url: editedUrl },
      });

      if (updatedUrl) {
        onUpdateUrl(updatedUrl);
        setUrls(urls.map(u => u._id === updatedUrl._id ? updatedUrl : u));
      }
    }
    setIsEditModalOpen(false);
  };

  return (
    <Card className="bg-gray-800 mb-8">
      <CardHeader>
        <CardTitle className="text-white font-bold text-2xl">
          Gestionar URLs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <form
            action=""
            className="flex items-center space-x-2 mb-4"
            onSubmit={e => {
              e.preventDefault();
              handleCreateUrl();
            }}
          >
            <Input
              type="text"
              placeholder="Ingrese una nueva URL"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 flex-grow"
            />
            <Input
              type="text"
              placeholder="Nombre personalizado"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-1/4"
            />
            <Button type="submit" className="text-white whitespace-nowrap">
              <PlusIcon className="mr-2 h-4 w-4 text-white" /> Crear URL
            </Button>
          </form>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-yellow-300 font-semibold">
                URL Original
              </TableHead>
              <TableHead className="text-yellow-300 font-semibold">
                URL Corta
              </TableHead>
              <TableHead className="text-yellow-300 font-semibold">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url._id}>
                <TableCell className="font-medium text-white">{url.url}</TableCell>
                <TableCell className="text-white">{url.shortUrl}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-white" onClick={() => handleEditClick(url)}>
                      <EditIcon className="h-4 w-4 text-white" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white">
                      <TrashIcon className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Editar URL</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={editedUrl}
            onChange={(e) => setEditedUrl(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}