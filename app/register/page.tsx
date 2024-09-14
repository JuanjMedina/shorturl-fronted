'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  ArrowLeftIcon,
  LogInIcon,
} from 'lucide-react';
import Link from 'next/link';
import { createUserService } from '../services/shorturl';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function Component() {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState({ message: '', status: false });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleErrors = (message: string) => {
    setError({ message, status: true });
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataResponse = await createUserService(formData, handleErrors);

    if (dataResponse) {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative">
      <Link
        href="/"
        className="absolute top-4 left-4 text-gray-300 hover:text-white transition-colors"
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <ArrowLeftIcon size={20} />
          <span onClick={() => Link}>Volver</span>
        </Button>
      </Link>
      <Link
        href="/login"
        className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <LogInIcon size={20} />
          <span>Iniciar sesión</span>
        </Button>
      </Link>
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Crear una cuenta
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Ingrese sus datos para registrarse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">
                Nombre de usuario
              </Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre de usuario"
                  className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Correo electrónico
              </Label>
              <div className="relative">
                <MailIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingrese su correo electrónico"
                  className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-200">
                Teléfono
              </Label>
              <div className="relative">
                <PhoneIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ingrese su número de teléfono"
                  className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Contraseña
              </Label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingrese su contraseña"
                  className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
