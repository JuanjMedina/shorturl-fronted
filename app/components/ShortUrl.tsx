'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import CopyCode from './copycode';
import { createUrl } from '../services/shorturl';

const ShortUrl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responseFetch = await createUrl(longUrl);
    console.log(responseFetch?.shortUrl);
    if (responseFetch) {
      setShortUrl(responseFetch.shortUrl);
    } else {
      setError('Error acortando la URL');
    }
  };

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-100">
          Acorta tu URL
        </CardTitle>
        <CardDescription className="text-center text-gray-300">
          Ingresa tu URL larga y obtén una versión corta al instante
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="https://ejemplo.com/tu-url-larga-aqui"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Acortar URL
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </CardContent>

      {shortUrl && <CopyCode shortUrl={shortUrl} />}
    </Card>
  );
};

export default ShortUrl;
