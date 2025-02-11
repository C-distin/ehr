'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardHeader from '@/app/components/DashboardHeader';
import Sidebar from '@/app/components/Sidebar';

interface MedicalRecord {
  id: string;
  patientName: string;
  diagnosis: string;
  treatment: string;
  date: string;
  doctorName: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    patientName: 'John Smith',
    diagnosis: 'Hypertension',
    treatment: 'Prescribed ACE inhibitors',
    date: '2024-03-15',
    doctorName: 'Dr. Sarah Johnson'
  },
  // Add more mock records as needed
];

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = mockRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="doctor" />
      <main className="ml-64 p-8">
        <DashboardHeader title="Medical Records" userName="Dr. Sarah Johnson" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Record
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{record.patientName}</CardTitle>
                  <CardDescription>{new Date(record.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Diagnosis:</span>
                      <p className="text-gray-600">{record.diagnosis}</p>
                    </div>
                    <div>
                      <span className="font-medium">Treatment:</span>
                      <p className="text-gray-600">{record.treatment}</p>
                    </div>
                    <div>
                      <span className="font-medium">Doctor:</span>
                      <p className="text-gray-600">{record.doctorName}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}