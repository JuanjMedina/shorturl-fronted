import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ClientDashboard from './ClientDashboard';

const getUrls = async () => {};

export default async function Dashboard() {
  const urls = await getUrls(); // Esto simula la obtención de datos en el servidor

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-white">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Total de URLs</CardTitle>
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
              <p className="text-4xl font-bold">
                {urls.reduce((sum, url) => sum + url.clicks, 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Promedio de Clics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {(
                  urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length
                ).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <ClientDashboard urls={urls} />
      </div>
    </div>
  );
}
