"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    month: "Jan",
    aprovadas: 20,
    reprovadas: 4,
  },
  {
    month: "Fev",
    aprovadas: 18,
    reprovadas: 6,
  },
  {
    month: "Mar",
    aprovadas: 22,
    reprovadas: 2,
  },
  {
    month: "Abr",
    aprovadas: 19,
    reprovadas: 5,
  },
  {
    month: "Mai",
    aprovadas: 21,
    reprovadas: 3,
  },
  {
    month: "Jun",
    aprovadas: 23,
    reprovadas: 1,
  },
]

export function FleetOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspeções por Mês</CardTitle>
        <CardDescription>Comparativo de inspeções aprovadas vs reprovadas</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Gráfico de Inspeções</h3>
            <p className="text-muted-foreground">Dados dos últimos 6 meses</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="text-green-600">
                <div className="font-bold text-2xl">123</div>
                <div>Aprovadas</div>
              </div>
              <div className="text-red-600">
                <div className="font-bold text-2xl">21</div>
                <div>Reprovadas</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}