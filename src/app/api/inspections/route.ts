import { NextResponse } from "next/server"

// Mock data para inspeções
const inspections = [
  {
    id: "1",
    vehicleId: "1",
    vehiclePlate: "ABC-1234",
    inspectorName: "João Silva",
    status: "approved",
    completionRate: 100,
    observations: "Veículo em excelente estado",
    photos: [],
    checklist: {
      documentation: { completed: 4, total: 4 },
      brakes: { completed: 3, total: 3 },
      tires: { completed: 4, total: 4 },
      electrical: { completed: 4, total: 4 },
      engine: { completed: 4, total: 4 },
    },
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "2",
    vehicleId: "2",
    vehiclePlate: "DEF-5678",
    inspectorName: "Maria Santos",
    status: "rejected",
    completionRate: 85,
    observations: "Problemas nos freios detectados",
    photos: [],
    checklist: {
      documentation: { completed: 4, total: 4 },
      brakes: { completed: 2, total: 3 },
      tires: { completed: 4, total: 4 },
      electrical: { completed: 4, total: 4 },
      engine: { completed: 3, total: 4 },
    },
    createdAt: "2024-01-10T13:15:00Z",
    updatedAt: "2024-01-10T13:15:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: inspections,
      total: inspections.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.vehicleId || !body.inspectorName) {
      return NextResponse.json({ success: false, error: "Campos obrigatórios não preenchidos" }, { status: 400 })
    }

    const newInspection = {
      id: (inspections.length + 1).toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    inspections.push(newInspection)

    return NextResponse.json(
      {
        success: true,
        data: newInspection,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
