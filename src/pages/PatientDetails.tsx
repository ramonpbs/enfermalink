import { Link, useParams } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateAge } from '@/lib/utils';
import { Stethoscope } from 'lucide-react';

export function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const patient = mockPatients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Paciente não encontrado</h1>
      </div>
    );
  }

  const age = calculateAge(patient.dateOfBirth);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{patient.name}</h1>
          <p className="text-gray-500">{patient.gender}, {age} anos</p>
        </div>
        <Button asChild>
          <Link to={`/pacientes/${patient.id}/novo-atendimento`}>
            <Stethoscope className="mr-2 h-4 w-4" /> Novo Atendimento
          </Link>
        </Button>
      </div>
      
      {/* ... O resto do código (os Cards) continua o mesmo ... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Telefone:</strong> {patient.phone}</p>
            <p><strong>Data de Nasc.:</strong> {new Date(patient.dateOfBirth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Histórico Médico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Condições Médicas</h3>
              <div className="flex flex-wrap gap-2">
                {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
                  patient.medicalConditions.map((condition) => <Badge key={condition}>{condition}</Badge>)
                ) : <p className="text-sm text-gray-500">Nenhuma condição registrada.</p>}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Alergias</h3>
              <div className="flex flex-wrap gap-2">
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy) => <Badge variant="destructive" key={allergy}>{allergy}</Badge>)
                ) : <p className="text-sm text-gray-500">Nenhuma alergia registrada.</p>}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Medicamentos em Uso</h3>
              <div className="flex flex-wrap gap-2">
                {patient.medications && patient.medications.length > 0 ? (
                  patient.medications.map((med) => <Badge variant="secondary" key={med}>{med}</Badge>)
                ) : <p className="text-sm text-gray-500">Nenhum medicamento registrado.</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}