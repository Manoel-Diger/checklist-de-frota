import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

const stats = [
  {
    title: "Total de Veículos",
    value: "24",
    description: "+2 desde o mês passado",
    icon: Truck,
    color: "text-blue-600",
  },
  {
    title: "Inspeções Aprovadas",
    value: "18",
    description: "75% da frota",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Pendências",
    value: "4",
    description: "Requer atenção",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    title: "Em Manutenção",
    value: "2",
    description: "Retorno previsto em 3 dias",
    icon: Clock,
    color: "text-red-600",
  },
]

export function DashboardStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}