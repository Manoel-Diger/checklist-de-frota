"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Edit, Truck } from "lucide-react"
import { useState } from "react"

const vehicles = [
  {
    id: "1",
    model: "Scania R450",
    plate: "ABC-1234",
    year: "2020",
    km: "125.000",
    status: "active",
    lastInspection: "2024-01-15",
    nextMaintenance: "2024-02-15",
    driver: "João Silva",
  },
  {
    id: "2",
    model: "Volvo FH540",
    plate: "DEF-5678",
    year: "2019",
    km: "180.000",
    status: "maintenance",
    lastInspection: "2024-01-10",
    nextMaintenance: "2024-01-20",
    driver: "Maria Santos",
  },
  {
    id: "3",
    model: "Mercedes Actros",
    plate: "GHI-9012",
    year: "2021",
    km: "95.000",
    status: "active",
    lastInspection: "2024-01-14",
    nextMaintenance: "2024-03-01",
    driver: "Pedro Costa",
  },
  {
    id: "4",
    model: "DAF XF480",
    plate: "JKL-3456",
    year: "2018",
    km: "220.000",
    status: "inactive",
    lastInspection: "2024-01-05",
    nextMaintenance: "2024-01-25",
    driver: "Ana Oliveira",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
    case "maintenance":
      return <Badge className="bg-yellow-100 text-yellow-800">Manutenção</Badge>
    case "inactive":
      return <Badge className="bg-red-100 text-red-800">Inativo</Badge>
    default:
      return <Badge>Desconhecido</Badge>
  }
}

export function FleetList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por modelo, placa ou motorista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="maintenance">Manutenção</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{vehicle.model}</CardTitle>
                </div>
                {getStatusBadge(vehicle.status)}
              </div>
              <CardDescription className="text-lg font-mono">{vehicle.plate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Ano:</span>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <span className="text-gray-500">KM:</span>
                  <p className="font-medium">{vehicle.km}</p>
                </div>
                <div>
                  <span className="text-gray-500">Motorista:</span>
                  <p className="font-medium">{vehicle.driver}</p>
                </div>
                <div>
                  <span className="text-gray-500">Última Inspeção:</span>
                  <p className="font-medium">{new Date(vehicle.lastInspection).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Truck className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum veículo encontrado</h3>
            <p className="text-gray-500 text-center">Tente ajustar os filtros ou termos de busca</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
