import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Target, QuoteIcon, Check, X } from "lucide-react"

import GoalsList from "./GoalsList"
// import { useForm } from "react-hook-form"
import AddGoals from "./AddGoals"

export default function GoalsSection() {
  const [weeklyGoals, setWeeklyGoals] = useState([])
  const [monthlyGoals, setMonthlyGoals] = useState([])
  const [quote, setQuote] = useState(null)
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [activeTab, setActiveTab] = useState("weekly")
  const [editingGoal, setEditingGoal] = useState(null)
  // const [newGoal, setNewGoal] = useState({ title: "", description: "" })
  const [isLoadingQuote, setIsLoadingQuote] = useState(true)

  //  const [open, setOpen] = useState(false)
 

  useEffect(() => {
    fetchQuote()
  }, [])

  const fetchQuote = async () => {
    try {
      setIsLoadingQuote(true)
      const response = await fetch("https://api.quotable.io/random?tags=motivational,success,inspirational")
      const data = await response.json()
      setQuote({ content: data.content, author: data.author })
    } catch (error) {
      console.error("Failed to fetch quote:", error)
      setQuote({
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      })
    } finally {
      setIsLoadingQuote(false)
    }
  }

  // const addGoal = () => {
  //   if (!newGoal.title.trim()) return

  //   const goal = {
  //     id: Date.now().toString(),
  //     title: newGoal.title,
  //     description: newGoal.description,
  //     completed: false,
  //     createdAt: new Date(),
  //   }

  //   if (activeTab === "weekly") {
  //     setWeeklyGoals([...weeklyGoals, goal])
  //   } else {
  //     setMonthlyGoals([...monthlyGoals, goal])
  //   }

  //   setNewGoal({ title: "", description: "" })
  //   setIsAddingGoal(false)
  // }

  const toggleGoal = (id) => {
    const updateGoals = (goals) =>
      goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal))

    if (activeTab === "weekly") {
      setWeeklyGoals(updateGoals(weeklyGoals))
    } else {
      setMonthlyGoals(updateGoals(monthlyGoals))
    }
  }

  const deleteGoal = (id) => {
    if (activeTab === "weekly") {
      setWeeklyGoals(weeklyGoals.filter((goal) => goal.id !== id))
    } else {
      setMonthlyGoals(monthlyGoals.filter((goal) => goal.id !== id))
    }
  }

  const updateGoal = (id, title, description) => {
    const updateGoals = (goals) =>
      goals.map((goal) => (goal.id === id ? { ...goal, title, description } : goal))

    if (activeTab === "weekly") {
      setWeeklyGoals(updateGoals(weeklyGoals))
    } else {
      setMonthlyGoals(updateGoals(monthlyGoals))
    }
    setEditingGoal(null)
  }

  const getCurrentGoals = () => (activeTab === "weekly" ? weeklyGoals : monthlyGoals)
  const completedGoals = getCurrentGoals().filter((goal) => goal.completed).length
  const totalGoals = getCurrentGoals().length
  const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QuoteIcon className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg text-blue-900">Daily Motivation</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchQuote}
              disabled={isLoadingQuote}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              New Quote
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingQuote ? (
            <div className="animate-pulse">
              <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-blue-200 rounded w-1/2"></div>
            </div>
          ) : (
            quote && (
              <blockquote className="text-blue-800">
                <p className="text-lg font-medium italic mb-2">"{quote.content}"</p>
                <footer className="text-sm text-blue-600">— {quote.author}</footer>
              </blockquote>
            )
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              <CardTitle>My Goals</CardTitle>
            </div>
            <Badge variant="secondary" className="text-sm">
              {completedGoals}/{totalGoals} completed
            </Badge>
          </div>
          {totalGoals > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Weekly Goals</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-4">
              <GoalsList
                goals={weeklyGoals}
                onToggle={toggleGoal}
                onDelete={deleteGoal}
                onUpdate={updateGoal}
                editingGoal={editingGoal}
                setEditingGoal={setEditingGoal}
              />
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <GoalsList
                goals={monthlyGoals}
                onToggle={toggleGoal}
                onDelete={deleteGoal}
                onUpdate={updateGoal}
                editingGoal={editingGoal}
                setEditingGoal={setEditingGoal}
              />
            </TabsContent>
          </Tabs>

          {isAddingGoal ? (
              <AddGoals isAddingGoal={isAddingGoal} setIsAddingGoal={setIsAddingGoal}/>
              
          ) : (
            <Button onClick={() => setIsAddingGoal(true)} className="mt-4 w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add New {activeTab === "weekly" ? "Weekly" : "Monthly"} Goal
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
