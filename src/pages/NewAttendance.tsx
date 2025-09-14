import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockPatients, mockAttendances } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { AppointmentDetails } from '../types';

const attendanceFormSchema = z.object({
  attendanceDate: z.string().min(1, "A data do atendimento é obrigatória."),
  anamnesis: z.object({
    chiefComplaint: z.string().optional(),
    currentIllnessHistory: z.string().optional(),
  }),
  physicalExam: z.object({
    bloodPressure: z.string().optional(), heartRate: z.string().optional(),
    respiratoryRate: z.string().optional(), temperature: z.string().optional(),
    oxygenSaturation: z.string().optional(), glucose: z.string().optional(),
    skinAndMucous: z.string().optional(), headAndNeck: z.string().optional(),
    respiratorySystem: z.string().optional(), cardiovascularSystem: z.string().optional(),
    abdomen: z.string().optional(), limbs: z.string().optional(),
    neurologicalSystem: z.string().optional(),
  }),
  diagnostics: z.object({
    diagnoses: z.array(z.object({ value: z.string() })).optional(),
    interventions: z.array(z.object({ value: z.string() })).optional(),
  }),
  evolution: z.object({
    description: z.string().optional(),
    guidelines: z.string().optional(),
    nextVisit: z.string().optional(),
  }),
});

export function NewAttendance() {
  const { id: patientId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = mockPatients.find((p) => p.id === patientId);

  const [activeTab, setActiveTab] = useState("anamnese");
  const tabOrder = ["anamnese", "exame_fisico", "diagnosticos", "evolucao"];

  const form = useForm<z.infer<typeof attendanceFormSchema>>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      attendanceDate: format(new Date(), 'yyyy-MM-dd'),
      anamnesis: { chiefComplaint: '', currentIllnessHistory: '' },
      physicalExam: {},
      diagnostics: { diagnoses: [], interventions: [] },
      evolution: { description: '', guidelines: '', nextVisit: '' },
    },
  });

  const { fields: diagnosesFields, append: appendDiagnosis, remove: removeDiagnosis } = useFieldArray({ control: form.control, name: "diagnostics.diagnoses" });
  const { fields: interventionsFields, append: appendIntervention, remove: removeIntervention } = useFieldArray({ control: form.control, name: "diagnostics.interventions" });

  function onSubmit(values: z.infer<typeof attendanceFormSchema>) {
    if (!patient) return;

    const currentAttendance: AppointmentDetails = {
      id: new Date().getTime().toString(),
      patientId: patient.id,
      patientName: patient.name,
      date: values.attendanceDate,
      time: format(new Date(), 'HH:mm'),
      type: "Atendimento Realizado",
      professional: "Profissional Logado",
      anamnesis: values.anamnesis,
      physicalExam: values.physicalExam,
      diagnostics: values.diagnostics,
      evolution: values.evolution,
    };
    mockAttendances.push(currentAttendance);
    console.log("Atendimento ATUAL salvo:", currentAttendance);

    if (values.evolution?.nextVisit) {
      const futureAppointment: AppointmentDetails = {
        id: (new Date().getTime() + 1).toString(),
        patientId: patient.id,
        patientName: patient.name,
        date: values.evolution.nextVisit,
        time: "A definir",
        type: "Consulta de Acompanhamento",
        professional: "Profissional Logado",
      };
      mockAttendances.push(futureAppointment);
      console.log("Agendamento FUTURO criado:", futureAppointment);
    }
    
    navigate(`/pacientes/${patient.id}`);
  }
  
  const handleNextTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handlePrevTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  if (!patient) { return <h1>Paciente não encontrado</h1>; }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Novo Atendimento</h1>
        <p className="text-gray-500">Paciente: <span className="font-semibold">{patient.name}</span></p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FormField control={form.control} name="attendanceDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Data do Atendimento *</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
              <TabsTrigger value="exame_fisico">Exame Físico</TabsTrigger>
              <TabsTrigger value="diagnosticos">Diagnósticos</TabsTrigger>
              <TabsTrigger value="evolucao">Evolução</TabsTrigger>
            </TabsList>

            <TabsContent value="anamnese">
              <div className="bg-white p-6 rounded-b-lg border-x border-b shadow-sm space-y-6">
                <FormField control={form.control} name="anamnesis.chiefComplaint" render={({ field }) => ( <FormItem><FormLabel>Queixa Principal</FormLabel><FormControl><Textarea placeholder="Descreva a queixa principal..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="anamnesis.currentIllnessHistory" render={({ field }) => ( <FormItem><FormLabel>História da Doença Atual</FormLabel><FormControl><Textarea placeholder="Descreva a história da doença atual..." rows={5} {...field} /></FormControl><FormMessage /></FormItem> )} />
              </div>
            </TabsContent>

            <TabsContent value="exame_fisico">
              <div className="bg-white p-6 rounded-b-lg border-x border-b shadow-sm space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Sinais Vitais</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="physicalExam.bloodPressure" render={({ field }) => (<FormItem><FormLabel>Pressão Arterial (mmHg)</FormLabel><FormControl><Input placeholder="Ex: 120/80" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.heartRate" render={({ field }) => (<FormItem><FormLabel>FC (bpm)</FormLabel><FormControl><Input placeholder="Ex: 80" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.respiratoryRate" render={({ field }) => (<FormItem><FormLabel>FR (rpm)</FormLabel><FormControl><Input placeholder="Ex: 16" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.temperature" render={({ field }) => (<FormItem><FormLabel>Temperatura (°C)</FormLabel><FormControl><Input placeholder="Ex: 36.5" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.oxygenSaturation" render={({ field }) => (<FormItem><FormLabel>Saturação O₂ (%)</FormLabel><FormControl><Input placeholder="Ex: 98" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.glucose" render={({ field }) => (<FormItem><FormLabel>Glicemia (mg/dL)</FormLabel><FormControl><Input placeholder="Ex: 100" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Avaliação dos Sistemas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="physicalExam.skinAndMucous" render={({ field }) => (<FormItem><FormLabel>Pele e Mucosas</FormLabel><FormControl><Textarea placeholder="Aspecto, coloração, hidratação, lesões..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.headAndNeck" render={({ field }) => (<FormItem><FormLabel>Cabeça e Pescoço</FormLabel><FormControl><Textarea placeholder="Avaliação da cabeça e pescoço..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.respiratorySystem" render={({ field }) => (<FormItem><FormLabel>Sistema Respiratório</FormLabel><FormControl><Textarea placeholder="Avaliação do sistema respiratório..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.cardiovascularSystem" render={({ field }) => (<FormItem><FormLabel>Sistema Cardiovascular</FormLabel><FormControl><Textarea placeholder="Avaliação do sistema cardiovascular..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.abdomen" render={({ field }) => (<FormItem><FormLabel>Abdome</FormLabel><FormControl><Textarea placeholder="Avaliação do abdome..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.limbs" render={({ field }) => (<FormItem><FormLabel>Membros</FormLabel><FormControl><Textarea placeholder="Avaliação dos membros..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="physicalExam.neurologicalSystem" render={({ field }) => (<FormItem><FormLabel>Sistema Neurológico</FormLabel><FormControl><Textarea placeholder="Avaliação do sistema neurológico..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diagnosticos">
              <div className="bg-white p-6 rounded-b-lg border-x border-b shadow-sm space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Diagnósticos de Enfermagem</h3>
                  {diagnosesFields.map((field, index) => ( <FormField key={field.id} control={form.control} name={`diagnostics.diagnoses.${index}.value`} render={({ field }) => ( <FormItem><div className="flex items-center gap-2"><FormControl><Textarea placeholder={`Diagnóstico ${index + 1}`} {...field} /></FormControl><Button type="button" variant="ghost" size="icon" onClick={() => removeDiagnosis(index)}><XCircle className="h-5 w-5 text-red-500" /></Button></div><FormMessage /></FormItem> )} /> ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendDiagnosis({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Diagnóstico</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Intervenções</h3>
                  {interventionsFields.map((field, index) => ( <FormField key={field.id} control={form.control} name={`diagnostics.interventions.${index}.value`} render={({ field }) => ( <FormItem><div className="flex items-center gap-2"><FormControl><Textarea placeholder={`Intervenção ${index + 1}`} {...field} /></FormControl><Button type="button" variant="ghost" size="icon" onClick={() => removeIntervention(index)}><XCircle className="h-5 w-5 text-red-500" /></Button></div><FormMessage /></FormItem> )} /> ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendIntervention({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Intervenção</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evolucao">
              <div className="bg-white p-6 rounded-b-lg border-x border-b shadow-sm space-y-6">
                <FormField control={form.control} name="evolution.description" render={({ field }) => ( <FormItem><FormLabel>Evolução</FormLabel><FormControl><Textarea placeholder="Descreva a evolução do paciente durante o atendimento..." rows={5} {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="evolution.guidelines" render={({ field }) => ( <FormItem><FormLabel>Orientações</FormLabel><FormControl><Textarea placeholder="Descreva as orientações fornecidas ao paciente e cuidadores..." rows={4} {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="evolution.nextVisit" render={({ field }) => ( <FormItem><FormLabel>Próxima Visita</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" asChild><Link to={`/pacientes/${patient?.id}`}>Cancelar</Link></Button>
            <div className="flex space-x-4">
              {activeTab !== 'anamnese' && ( <Button type="button" variant="outline" onClick={(e) => handlePrevTab(e)}>Anterior</Button> )}
              {activeTab !== 'evolucao' ? ( <Button type="button" onClick={(e) => handleNextTab(e)}>Próximo</Button> ) : ( <Button type="submit">Salvar Atendimento</Button> )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}