'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ShortUrlPageDarkCentered() {
  const currentDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header con botón de inicio de sesión */}
      <header className="p-4 flex justify-end">
        <Button variant="outline" className="text-gray-100 border-gray-100 hover:bg-gray-800">
          Iniciar sesión
        </Button>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-4xl">
          <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-100">Acorta tu URL</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Ingresa tu URL larga y obtén una versión corta al instante
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://ejemplo.com/tu-url-larga-aqui"
                  className="w-full bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Acortar URL
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sección de explicación del algoritmo */}
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-100 text-center">Cómo funciona nuestro algoritmo</h2>
            <p className="text-gray-300 text-center">
              Nuestro algoritmo de acortamiento de URL utiliza una combinación de hashing y codificación
              para generar URLs cortas únicas. Primero, convertimos la URL larga en un hash, luego
              codificamos este hash en una cadena alfanumérica corta. Este proceso garantiza URLs
              cortas y únicas, manteniendo la eficiencia y la seguridad.
            </p>
          </div>
        </div>
      </main>

      {/* Footer con información del creador y fecha */}
      <footer className="py-4 px-6 bg-gray-800 text-center text-gray-400 text-sm">
        <p>Creado por Tu Nombre | {currentDate}</p>
      </footer>
    </div>
  )
}