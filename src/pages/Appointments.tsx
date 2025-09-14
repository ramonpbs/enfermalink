import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, addMonths, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// A MUDANÇA ESTÁ AQUI: importamos a lista correta de dados
import { mockAttendances } from '../data/mockData'; 
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, CalendarPlus } from 'lucide-react';

export function Appointments() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const lastDayCurrentMonth = endOfMonth(currentMonth);

  // E A MUDANÇA ESTÁ AQUI: filtramos a lista correta
  const filteredAppointments = mockAttendances.filter(apt => 
    isWithinInterval(new Date(apt.date), { start: firstDayCurrentMonth, end: lastDayCurrentMonth })
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full">
          <h1 className="text-3xl font-bold">Agendamentos</h1>
          <p className="text-gray-500">Gerenciamento de agendamentos de visitas domiciliares</p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link to="/agendamentos/selecionar-paciente"><CalendarPlus className="mr-2 h-4 w-4" /> Novo Agendamento</Link>
        </Button>
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-4 bg-white p-2 rounded-lg shadow-sm">
        <Button variant="outline" size="icon" onClick={handlePrevMonth}><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-lg sm:text-xl font-semibold w-48 text-center capitalize">{format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}</h2>
        <Button variant="outline" size="icon" onClick={handleNextMonth}><ChevronRight className="h-4 w-4" /></Button>
      </div>

      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead className="hidden sm:table-cell">Horário</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{format(new Date(apt.date), "dd/MM/yy", { locale: ptBR })}</TableCell>
                  <TableCell className="hidden sm:table-cell">{apt.time}</TableCell>
                  <TableCell>{apt.patientName}</TableCell>
                  <TableCell className="hidden md:table-cell">{apt.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">Nenhum agendamento encontrado para este período.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}