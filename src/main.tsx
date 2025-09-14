import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { AppLayout } from './components/layout/AppLayout.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { Patients } from './pages/Patients.tsx'
import { NewPatient } from './pages/NewPatient.tsx'
import { Appointments } from './pages/Appointments.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { PatientDetails } from './pages/PatientDetails.tsx'
import { NewAttendance } from './pages/NewAttendance.tsx'
import { SelectPatient } from './pages/SelectPatient.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/pacientes', element: <Patients /> },
      { path: '/pacientes/:id', element: <PatientDetails /> },
      { path: '/pacientes/:id/novo-atendimento', element: <NewAttendance /> },
      { path: '/novo-paciente', element: <NewPatient /> },
      { path: '/agendamentos', element: <Appointments /> },
      { path: '/agendamentos/selecionar-paciente', element: <SelectPatient /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)