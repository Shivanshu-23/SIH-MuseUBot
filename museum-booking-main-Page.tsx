import React, { useState } from 'react'
import { Home, Calendar, Clock, ChevronDown, X, History, RefreshCcw, HelpCircle, Search, Mic, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

export default function MuseUBOT() {
  const [date, setDate] = useState<Date>()
  const [type, setType] = useState<string>("")
  const [time, setTime] = useState<string>("12:00 PM")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isListening, setIsListening] = useState(false)
  const [maleCount, setMaleCount] = useState<number>(0)
  const [femaleCount, setFemaleCount] = useState<number>(0)
  const [showGroupDetails, setShowGroupDetails] = useState(false)
  const [groupConfirmed, setGroupConfirmed] = useState(false)

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const minutes = ['00', '15', '30', '45']
  const periods = ['AM', 'PM']

  const formatTime = (hour: string, minute: string, period: string) => {
    return `${hour}:${minute} ${period}`
  }

  const handleMicClick = () => {
    if (!isListening) {
      setIsListening(true)
      // Simulating voice input
      setTimeout(() => {
        setSearchQuery(prev => prev + " Voice input simulation")
        setIsListening(false)
        toast({
          title: "Voice Input Received",
          description: "Your voice input has been processed.",
        })
      }, 2000)
    } else {
      setIsListening(false)
      toast({
        title: "Voice Input Cancelled",
        description: "Voice input has been cancelled.",
      })
    }
  }

  const handleTypeChange = (value: string) => {
    setType(value)
    if (value === "Group") {
      setShowGroupDetails(true)
      setGroupConfirmed(false)
    } else {
      setShowGroupDetails(false)
      setGroupConfirmed(false)
    }
  }

  const handleGroupConfirm = () => {
    if (maleCount + femaleCount > 0) {
      setGroupConfirmed(true)
      setShowGroupDetails(false)
      toast({
        title: "Group Details Confirmed",
        description: `Group of ${maleCount + femaleCount} (${maleCount} males, ${femaleCount} females) confirmed.`,
      })
    } else {
      toast({
        title: "Invalid Group Size",
        description: "Please enter at least one person in the group.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 max-w-md bg-white shadow-lg overflow-hidden flex flex-col">
        <header className="bg-orange-500 text-white p-4 flex items-center">
          <Home className="mr-2" />
          <h1 className="text-xl font-bold">MuseUBOT</h1>
        </header>
        
        <main className="p-4 overflow-y-auto flex-grow">
          <h2 className="text-xl font-semibold mb-4">Good Afternoon</h2>
          <p className="text-gray-600 mb-6">How may I help you today?</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center border rounded p-2">
              <span className="text-gray-500 mr-2">Name</span>
              <Select>
                <SelectTrigger className="border-none">
                  <SelectValue placeholder="Select Museum/UIT Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="museum1">Museum 1</SelectItem>
                  <SelectItem value="museum2">Museum 2</SelectItem>
                  <SelectItem value="museum3">Museum 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center border rounded p-2">
              <Clock className="text-gray-500 mr-2" />
              <span className="text-gray-500 mr-2">Visiting Time</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    {time}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="flex space-x-2 p-2">
                    <Select onValueChange={(hour) => setTime(prev => formatTime(hour, prev.split(':')[1].split(' ')[0], prev.split(' ')[1]))}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map(hour => (
                          <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(minute) => setTime(prev => formatTime(prev.split(':')[0], minute, prev.split(' ')[1]))}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map(minute => (
                          <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(period) => setTime(prev => formatTime(prev.split(':')[0], prev.split(':')[1].split(' ')[0], period))}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent>
                        {periods.map(period => (
                          <SelectItem key={period} value={period}>{period}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-between items-center border rounded p-2">
              <div className="flex items-center">
                <Calendar className="text-gray-500 mr-2" />
                <span className="text-gray-500">Visiting Date</span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col border rounded p-2">
              <Select value={type} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full border-none mb-2">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Type</SelectItem>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                </SelectContent>
              </Select>
              {showGroupDetails && (
                <div className="space-y-2 mt-2">
                  <div>
                    <Label htmlFor="maleCount">Number of Males</Label>
                    <Input
                      id="maleCount"
                      type="number"
                      min="0"
                      value={maleCount}
                      onChange={(e) => setMaleCount(parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="femaleCount">Number of Females</Label>
                    <Input
                      id="femaleCount"
                      type="number"
                      min="0"
                      value={femaleCount}
                      onChange={(e) => setFemaleCount(parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleGroupConfirm} className="w-full mt-2">
                    Confirm Group Details
                  </Button>
                </div>
              )}
              {groupConfirmed && (
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Group of {maleCount + femaleCount} ({maleCount} males, {femaleCount} females)</span>
                </div>
              )}
            </div>
          </div>
          
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Book Ticket</Button>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">My Upcoming Bookings</h3>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Looking for something else?</span>
              <ChevronDown className="text-gray-500" />
            </div>
          </div>
        </main>
        
        <footer className="bg-gray-100 p-4">
          <div className="flex justify-between items-center">
            <Button variant="ghost" className="flex flex-col items-center">
              <X className="h-6 w-6" />
              <span className="text-xs mt-1">Cancel Ticket</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <History className="h-6 w-6" />
              <span className="text-xs mt-1">Booking History</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <RefreshCcw className="h-6 w-6" />
              <span className="text-xs mt-1">Refund</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <HelpCircle className="h-6 w-6" />
              <span className="text-xs mt-1">Help Me Improve</span>
            </Button>
          </div>
        </footer>
      </div>
      
      <div className="w-1/2 bg-white shadow-lg flex flex-col">
        <div className="p-4 flex-grow overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Museum History</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founded in 1870, our museum has been a beacon of culture and learning for over 150 years. 
              Originally housed in a modest building, it has grown into a world-renowned institution, 
              home to over 2 million artifacts spanning human history and culture. From ancient 
              civilizations to modern art, our collections offer a journey through time and human 
              creativity. Notable expansions in 1905, 1968, and 2010 have allowed us to showcase more 
              of our collection and host groundbreaking exhibitions. Today, we continue our mission 
              to inspire, educate, and preserve the world's cultural heritage for future generations.
            </p>
          </div>
          {searchQuery && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <p className="text-gray-600 mt-2">Showing results for: {searchQuery}</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative flex items-center">
            <Textarea
              placeholder="Type here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-12 py-2 rounded-lg bg-gray-100 transition-all duration-300 ease-in-out ${
                searchQuery ? 'h-32' : 'h-10'
              }`}
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-2 top-1 ${isListening ? 'text-red-500' : 'text-gray-400'}`}
              onClick={handleMicClick}
            >
              <Mic className="h-6 w-6" />
              <span className="sr-only">{isListening ? 'Stop voice input' : 'Start voice input'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}