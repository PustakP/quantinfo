"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import MarkdownReport from "@/components/apitext"
import Image from "next/image"

export default function Component() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("day")

  return (
    <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">
      <header className="py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-6xl font-bold tracking-tighter">Catch up with Quantum !</h1>
        </div>
      </header>
      <div className="container px-4 md:px-6 flex-1 flex flex-col gap-8 pb-1/2h">
        <div className="flex justify-center gap-4">
          <Button
            variant={selectedTimeframe === "day" ? "default" : "ghost"}
            onClick={() => setSelectedTimeframe("day")}
          >
            Last Day
          </Button>
          <Button
            variant={selectedTimeframe === "week" ? "default" : "ghost"}
            onClick={() => setSelectedTimeframe("week")}
          >
            Last Week
          </Button>
          <Button
            variant={selectedTimeframe === "month" ? "default" : "ghost"}
            onClick={() => setSelectedTimeframe("month")}
          >
            Last Month
          </Button>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>News for the {selectedTimeframe}</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownReport apiUrl={`https://jubilant-parakeet.onrender.com/quantum_news_report?report_type=research_report&time_frame=${selectedTimeframe}`} />
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}