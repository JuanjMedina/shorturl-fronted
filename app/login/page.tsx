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
import { UserIcon, LockIcon, ArrowLeftIcon, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { loginUserService } from '../services/shorturl';
import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userIdentifier: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginUserService(formData);
    if (data) {
      data.AccessToken ? localStorage.setItem('token', data.AccessToken) : null;
      router.push('/dashboard');
    }
    console.log(data);
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
          <span>Volver</span>
        </Button>
      </Link>
      <Link
        href="/register"
        className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <UserPlusIcon size={20} />
          <span>Registrarse</span>
        </Button>
      </Link>
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Ingrese sus credenciales para acceder a su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userIdentifier" className="text-gray-200">
                Nombre de usuario o correo electrónico
              </Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  id="userIdentifier"
                  name="userIdentifier"
                  type="text"
                  required
                  value={formData.userIdentifier}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre de usuario o correo"
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
              Iniciar sesión
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
