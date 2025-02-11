'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DashboardHeader from '@/app/components/DashboardHeader';
import Sidebar from '@/app/components/Sidebar';

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

  const handleBookAppointment = async () => {
    if (!date || !selectedTime || !selectedDoctor) {
      return;
    }

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date.toISOString(),
          time: selectedTime,
          doctorId: selectedDoctor,
          type: 'consultation',
          status: 'scheduled',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      // Handle success (e.g., show confirmation, reset form)
    } catch (error) {
      console.error('Appointment booking error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="reception" />
      <main className="ml-64 p-8">
        <DashboardHeader title="Appointment Scheduling" userName="Jane Smith" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
            
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time Slots
                </label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. John Doe</SelectItem>
                    <SelectItem value="2">Dr. Jane Smith</SelectItem>
                    <SelectItem value="3">Dr. Robert Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleBookAppointment}
                  className="w-full"
                  disabled={!date || !selectedTime || !selectedDoctor}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
              {/* Add schedule component here */}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}