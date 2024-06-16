"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import MarkdownReport from "@/components/apitext"
import CircularProgress from '@mui/material/CircularProgress';

export default function Component() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("day")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000) // Replace with actual API call
  }, [selectedTimeframe])

  return (
    <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">
      <header className="py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-6xl font-bold tracking-tighter">Catch up with Quantum !</h1>
        </div>
      </header>
      <div className="container px-4 md:px-6 flex-1 flex flex-col gap-8">
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
              {/* <CardDescription>A major event has just occurred. Read all about it.</CardDescription> */}
            </CardHeader>
            <CardContent>
              {loading ? (
                <CircularProgress /> // Render the CircularProgress while loading
              ) : (
                <MarkdownReport apiUrl={`http://127.0.0.1:5000/quantum_news_report/${selectedTimeframe}`} />
              )}
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}