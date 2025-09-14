export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  cpf?: string;
  susCard?: string;
  address?: string;
  emergencyContact?: string;
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
}

export interface AppointmentSummary {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  professional: string;
}

export interface AppointmentDetails extends AppointmentSummary {
  attendanceDate?: string; // Adicionado para consistência
  anamnesis?: {
    chiefComplaint?: string;
    currentIllnessHistory?: string;
  };
  physicalExam?: {
    bloodPressure?: string;
    heartRate?: string;
    respiratoryRate?: string;
    temperature?: string;
    oxygenSaturation?: string;
    glucose?: string;
    skinAndMucous?: string;
    headAndNeck?: string;
    respiratorySystem?: string;
    cardiovascularSystem?: string;
    abdomen?: string;
    limbs?: string;
    neurologicalSystem?: string;
  };
  diagnostics?: {
    diagnoses?: { value: string }[];
    interventions?: { value: string }[];
  };
  evolution?: {
    description?: string;
    guidelines?: string;
    nextVisit?: string;
  };
}