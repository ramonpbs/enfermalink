import { Link } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

export function SelectPatient() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Novo Agendamento</h1>
        <p className="text-gray-500">
          Selecione um paciente para iniciar um novo atendimento.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selecione o Paciente</CardTitle>
          <CardDescription>Clique no paciente para o qual deseja criar um novo atendimento.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockPatients.map((patient) => (
              <li key={patient.id}>
                <Link 
                  to={`/pacientes/${patient.id}/novo-atendimento`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors border"
                >
                  <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center font-bold text-gray-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.phone}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}