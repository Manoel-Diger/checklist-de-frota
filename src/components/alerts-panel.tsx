import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Clock, Wrench } from 'lucide-react'

const alerts = [
  {
    id: "1",
    type: "warning",
    title: "Manutenção Preventiva Vencida",
    description: "Scania R450 - ABC-1234 está com manutenção preventiva vencida há 5 dias",
    icon: Wrench,
  },
  {
    id: "2",
    type: "error",
    title: "Inspeção Reprovada",
    description: "Volvo FH540 - DEF-5678 reprovada por problemas nos freios",
    icon: AlertTriangle,
  },
  {
    id: "3",
    type: "info",
    title: "Licenciamento Próximo do Vencimento",
    description: "Mercedes Actros - GHI-9012 com licenciamento vencendo em 15 dias",
    icon: Clock,
  },
]

export function AlertsPanel() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Alertas e Notificações</CardTitle>
        <CardDescription>Itens que requerem sua atenção imediata</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              className={
                alert.type === "error"
                  ? "border-red-200 bg-red-50"
                  : alert.type === "warning"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-blue-200 bg-blue-50"
              }
            >
              <alert.icon className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}