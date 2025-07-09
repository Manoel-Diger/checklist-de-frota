import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "6months"
    const type = searchParams.get("type") || "general"

    // Mock data baseado no período e tipo
    const reportData = {
      general: {
        totalInspections: 152,
        approvalRate: 81,
        maintenanceCost: 10400,
        availability: 92,
        monthlyData: [
          { month: "Jan", inspections: 24, approved: 20, rejected: 4 },
          { month: "Fev", inspections: 24, approved: 18, rejected: 6 },
          { month: "Mar", inspections: 24, approved: 22, rejected: 2 },
          { month: "Abr", inspections: 24, approved: 19, rejected: 5 },
          { month: "Mai", inspections: 24, approved: 21, rejected: 3 },
          { month: "Jun", inspections: 24, approved: 23, rejected: 1 },
        ],
        statusDistribution: [
          { name: "Aprovadas", value: 123 },
          { name: "Reprovadas", value: 21 },
          { name: "Pendentes", value: 8 },
        ],
      },
    }

    return NextResponse.json({
      success: true,
      data: reportData[type as keyof typeof reportData] || reportData.general,
      period,
      type,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
