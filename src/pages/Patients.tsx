import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function Patients() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* O cabeçalho se ajustará bem, mas podemos melhorá-lo depois se necessário */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <p className="text-gray-500">
            Gerenciamento de pacientes para atendimento domiciliar
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center space-x-2">
          <Input
            placeholder="Buscar..."
            className="w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button asChild>
            <Link to="/novo-paciente">+ Novo Paciente</Link>
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Nome</TableHead>
              {/* Estas colunas agora ficarão escondidas em telas pequenas */}
              <TableHead className="hidden md:table-cell">Data de Nascimento</TableHead>
              <TableHead className="hidden md:table-cell">Telefone</TableHead>
              <TableHead className="hidden lg:table-cell">Gênero</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient, index) => (
              <TableRow key={patient.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{patient.name}</TableCell>
                {/* Estas células também ficam escondidas, acompanhando o cabeçalho */}
                <TableCell className="hidden md:table-cell">
                  {new Date(patient.dateOfBirth).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                </TableCell>
                <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                <TableCell className="hidden lg:table-cell">{patient.gender}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/pacientes/${patient.id}`}>Ver detalhes</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}