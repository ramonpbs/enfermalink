import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { mockPatients } from "../data/mockData"

const patientFormSchema = z.object({
  name: z.string().min(3, { message: "O nome completo é obrigatório." }),
  dateOfBirth: z.string().min(1, { message: "A data de nascimento é obrigatória." }),
  gender: z.string().min(1, { message: "Por favor, selecione o gênero." }),
  phone: z.string().min(10, { message: "O telefone é obrigatório." }),
  cpf: z.string().optional(),
  susCard: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
})

export function NewPatient() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      gender: "", // <-- AQUI ESTÁ A CORREÇÃO
      phone: "",
      cpf: "",
      susCard: "",
      address: "",
      emergencyContact: "",
    },
  })

  function onSubmit(values: z.infer<typeof patientFormSchema>) {
    const newPatient = {
      id: new Date().getTime().toString(),
      ...values,
      gender: values.gender as "Masculino" | "Feminino" | "Outro",
    }
    mockPatients.push(newPatient)
    navigate("/pacientes")
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Novo Paciente</h1>
        <p className="text-gray-500">Adicione um novo paciente ao sistema</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Nome completo *</FormLabel> <FormControl> <Input placeholder="Nome do paciente" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="dateOfBirth" render={({ field }) => ( <FormItem> <FormLabel>Data de Nascimento *</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gênero *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione o gênero" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Telefone *</FormLabel> <FormControl> <Input placeholder="(00) 00000-0000" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            </div>
            <div className="flex justify-end"> <Button type="submit">Salvar</Button> </div>
          </form>
        </Form>
      </div>
    </div>
  )
}