'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogOutIcon, PlusIcon, EditIcon, TrashIcon } from 'lucide-react'

// Mock data for demonstration
const initialUrls = [
  { id: 1, originalUrl: 'https://example.com', shortUrl: 'https://short.url/abc123', clicks: 100 },
  { id: 2, originalUrl: 'https://anotherexample.com', shortUrl: 'https://short.url/def456', clicks: 75 },
  { id: 3, originalUrl: 'https://testsite.com', shortUrl: 'https://short.url/ghi789', clicks: 50 },
]

export function DashboardComponent() {
  const [urls, setUrls] = useState(initialUrls)
  const [newUrl, setNewUrl] = useState('')

  const handleCreateUrl = () => {
    if (newUrl) {
      const newShortUrl = {
        id: urls.length + 1,
        originalUrl: newUrl,
        shortUrl: `https://short.url/${Math.random().toString(36).substr(2, 6)}`,
        clicks: 0
      }
      setUrls([...urls, newShortUrl])
      setNewUrl('')
    }
  }

  const handleEditUrl = (id: number) => {
    // Implement edit functionality
    console.log('Edit URL with id:', id)
  }

  const handleDeleteUrl = (id: number) => {
    setUrls(urls.filter(url => url.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Salir
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Total de URLs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{urls.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Total de Clics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{urls.reduce((sum, url) => sum + url.clicks, 0)}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Promedio de Clics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {(urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

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
                onChange={(e) => setNewUrl(e.target.value)}
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
                {urls.map((url) => (
                  <TableRow key={url.id}>
                    <TableCell className="font-medium">{url.originalUrl}</TableCell>
                    <TableCell>{url.shortUrl}</TableCell>
                    <TableCell>{url.clicks}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditUrl(url.id)}>
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUrl(url.id)}>
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
      </div>
    </div>
  )
}