import { Button } from '@/components/ui/button';
import ShortUrl from './components/ShortUrl';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
export default function Home() {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="p-4 flex justify-between">
        <Link href="/login">
          <Button
            variant="outline"
            className="text-gray-100 border-gray-100 hover:bg-gray-800"
          >
            Iniciar sesión
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant="outline"
            className="text-gray-100 border-gray-100 hover:bg-gray-800"
          >
            Registrarse
          </Button>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-4xl">
          <ShortUrl />

          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-100 text-center">
              Cómo funciona nuestro algoritmo
            </h2>

            <p className="text-gray-300 text-balance text-center">
              El algoritmo implementado usa la conversion en base 32 para
              posteriormente hashear este base 32 lo que nos da un nivel de
              seguridad para mantener la perfecta operatividad de la URL
              acortada se comienza desde cierto numero el cual va incrementando
              debido a que es una operacion crucial para aplicacion usa
              transacciones para su correcto funcionamiento !
            </p>
          </div>
        </div>
      </main>
      <Toaster />

      <footer className="py-4 px-6 text-center text-gray-400 text-sm ">
        <p>Juan Medina | {currentDate}</p>
      </footer>
    </div>
  );
}
