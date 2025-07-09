import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentInspections = [
  {
    id: "1",
    vehicle: "Scania R450 - ABC-1234",
    inspector: "João Silva",
    status: "approved",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    id: "2",
    vehicle: "Volvo FH540 - DEF-5678",
    inspector: "Maria Santos",
    status: "rejected",
    date: "2024-01-15",
    time: "13:15",
  },
  {
    id: "3",
    vehicle: "Mercedes Actros - GHI-9012",
    inspector: "Pedro Costa",
    status: "approved",
    date: "2024-01-15",
    time: "11:45",
  },
  {
    id: "4",
    vehicle: "DAF XF480 - JKL-3456",
    inspector: "Ana Oliveira",
    status: "pending",
    date: "2024-01-15",
    time: "10:20",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800">Aprovada</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Reprovada</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
    default:
      return <Badge>Desconhecido</Badge>
  }
}

export function RecentInspections() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspeções Recentes</CardTitle>
        <CardDescription>Últimas inspeções realizadas na frota</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInspections.map((inspection) => (
            <div key={inspection.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                <AvatarFallback>
                  {inspection.inspector
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{inspection.vehicle}</p>
                <p className="text-sm text-muted-foreground">
                  {inspection.inspector} • {inspection.time}
                </p>
              </div>
              {getStatusBadge(inspection.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}