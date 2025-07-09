import { NextResponse } from "next/server"

// Mock data - Em produção, isso viria de um banco de dados
const vehicles = [
  {
    id: "1",
    model: "Scania R450",
    plate: "ABC-1234",
    year: "2020",
    km: "125000",
    status: "active",
    lastInspection: "2024-01-15T14:30:00Z",
    nextMaintenance: "2024-02-15T09:00:00Z",
    driver: "João Silva",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "2",
    model: "Volvo FH540",
    plate: "DEF-5678",
    year: "2019",
    km: "180000",
    status: "maintenance",
    lastInspection: "2024-01-10T13:15:00Z",
    nextMaintenance: "2024-01-20T08:00:00Z",
    driver: "Maria Santos",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-10T13:15:00Z",
  },
  {
    id: "3",
    model: "Mercedes Actros",
    plate: "GHI-9012",
    year: "2021",
    km: "95000",
    status: "active",
    lastInspection: "2024-01-14T11:45:00Z",
    nextMaintenance: "2024-03-01T09:00:00Z",
    driver: "Pedro Costa",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-14T11:45:00Z",
  },
  {
    id: "4",
    model: "DAF XF480",
    plate: "JKL-3456",
    year: "2018",
    km: "220000",
    status: "inactive",
    lastInspection: "2024-01-05T10:20:00Z",
    nextMaintenance: "2024-01-25T08:00:00Z",
    driver: "Ana Oliveira",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-05T10:20:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: vehicles,
      total: vehicles.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.model || !body.plate || !body.year) {
      return NextResponse.json({ success: false, error: "Campos obrigatórios não preenchidos" }, { status: 400 })
    }

    const newVehicle = {
      id: (vehicles.length + 1).toString(),
      ...body,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vehicles.push(newVehicle)

    return NextResponse.json(
      {
        success: true,
        data: newVehicle,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
