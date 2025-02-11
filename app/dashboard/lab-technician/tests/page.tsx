'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskRound as Flask, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DashboardHeader from '@/app/components/DashboardHeader';
import Sidebar from '@/app/components/Sidebar';

interface LabTest {
  id: string;
  patientName: string;
  testType: string;
  status: 'pending' | 'in_progress' | 'completed';
  requestedBy: string;
  requestDate: string;
}

const mockTests: LabTest[] = [
  {
    id: '1',
    patientName: 'Alice Johnson',
    testType: 'Blood Test',
    status: 'pending',
    requestedBy: 'Dr. Smith',
    requestDate: '2024-03-15'
  },
  // Add more mock tests
];

export default function LabTestsPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Flask className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="lab_technician" />
      <main className="ml-64 p-8">
        <DashboardHeader title="Lab Tests Management" userName="Mike Wilson" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {['pending', 'in_progress', 'completed'].map((status) => (
              <TabsContent key={status} value={status}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTests
                    .filter((test) => test.status === status)
                    .map((test) => (
                      <Card key={test.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{test.testType}</CardTitle>
                            {getStatusIcon(test.status)}
                          </div>
                          <CardDescription>
                            Patient: {test.patientName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                              Requested by: {test.requestedBy}
                            </p>
                            <p className="text-sm text-gray-500">
                              Date: {new Date(test.requestDate).toLocaleDateString()}
                            </p>
                            <div className="pt-4">
                              <Button className="w-full">
                                {status === 'pending' ? 'Start Test' :
                                 status === 'in_progress' ? 'Update Results' :
                                 'View Results'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}