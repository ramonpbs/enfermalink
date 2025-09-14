import { Users, Stethoscope, Calendar, Clock } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { mockAppointments, mockPatients } from '../data/mockData';

export function Dashboard() {
  const upcomingAppointments = mockAppointments
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const recentPatients = mockPatients.slice(0, 5);
  
  const lastAppointmentDate = mockAppointments.length > 0 
    ? new Date(`${mockAppointments[0].date}T${mockAppointments[0].time}`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'N/A';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Olá, profissional de saúde</h1>
        <p className="text-gray-500">Seja Muito Bem Vindo.</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Pacientes" value={mockPatients.length} icon={Users} />
        <StatCard title="Atendimentos" value={mockAppointments.length} icon={Stethoscope} />
        <StatCard title="Atendimentos Agendados" value={mockAppointments.length} icon={Calendar} />
        <StatCard title="Último Atendimento" value={lastAppointmentDate} icon={Clock} />
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Atendimentos */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Próximos Atendimentos</h2>
          <ul className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <li key={apt.id} className="p-2 rounded-md hover:bg-gray-100">
                <p className="font-bold">{apt.patientName}</p>
                <p className="text-sm text-gray-600">
                  {new Date(apt.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} às {apt.time} - {apt.type}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Pacientes Recentes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Pacientes Recentes</h2>
          <ul className="space-y-3">
            {recentPatients.map((patient) => (
              <li key={patient.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
                <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.phone} - {patient.gender}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}