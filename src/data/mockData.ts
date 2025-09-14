import type { Patient, AppointmentSummary, AppointmentDetails } from '../types';

export const mockPatients: Patient[] = [
  { 
    id: '1', 
    name: 'Maria Silva Santos', 
    dateOfBirth: '1945-03-14', 
    phone: '(11) 98765-4321', 
    gender: 'Feminino',
    medicalConditions: ['Hipertensão Arterial', 'Diabetes Mellitus Tipo 2'],
    allergies: ['Penicilina', 'Dipirona'],
    medications: ['Losartana 50mg', 'Metformina 850mg'],
  },
  { 
    id: '2', 
    name: 'José Oliveira', 
    dateOfBirth: '1958-11-15', 
    phone: '(11) 97654-3210', 
    gender: 'Masculino',
    medicalConditions: ['Asma'],
    allergies: [],
    medications: ['Salbutamol Spray'],
  },
  { 
    id: '3', 
    name: 'Antônia Ferreira', 
    dateOfBirth: '1952-09-29', 
    phone: '(11) 99876-5432', 
    gender: 'Feminino',
    medicalConditions: ['Artrite Reumatoide'],
    allergies: ['Frutos do mar'],
    medications: ['Metotrexato 15mg/semana'],
  },
  { id: '4', name: 'Ramon Charly Vieira Costa', dateOfBirth: '1990-04-10', phone: '(21) 98877-6655', gender: 'Masculino' },
  { id: '5', name: 'Beatriz Souza', dateOfBirth: '1985-04-30', phone: '(12) 9-8452-1452', gender: 'Feminino' },
];

export const mockAppointments: AppointmentSummary[] = [
  // ... (a lista de agendamentos continua a mesma)
];

// ADICIONAMOS ESTA NOVA LISTA EXPORTÁVEL
export let mockAttendances: AppointmentDetails[] = [];