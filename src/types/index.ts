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
  anamnesis?: {
    chiefComplaint?: string;
    currentIllnessHistory?: string;
    // ... outros campos da anamnese ...
  };
  physicalExam?: {
    vitalSigns?: {
      bloodPressure?: string; // Ex: "120/80"
      heartRate?: number;
      respiratoryRate?: number;
      temperature?: number;
      oxygenSaturation?: number;
      glucose?: number;
    };
    skinAndMucous?: {
      aspect?: string;
    };
    headAndNeck?: string;
    respiratorySystem?: string;
    cardiovascularSystem?: string;
    abdomen?: string;
    limbs?: string;
    neurologicalSystem?: string;
  };
  // As outras seções serão adicionadas depois
}