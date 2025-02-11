'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/hooks';
import {
  Users,
  Calendar,
  FlaskRound as Flask,
  Pill as Pills,
  DollarSign,
  Activity,
  ClipboardList,
  Package,
  Stethoscope
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from '../styles/Dashboard.module.css';

interface DashboardStat {
  icon: any;
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
}

const roleBasedStats: Record<string, DashboardStat[]> = {
  administrator: [
    { icon: Users, label: 'Total Staff', value: '45', change: '+3', trend: 'up' },
    { icon: Activity, label: 'System Load', value: '23%', change: '-5%', trend: 'down' },
    { icon: DollarSign, label: 'Revenue Today', value: '$5,234', change: '+12%', trend: 'up' },
    { icon: ClipboardList, label: 'Active Tasks', value: '28', change: '+5', trend: 'up' },
  ],
  doctor: [
    { icon: Users, label: 'Patients Today', value: '12', change: '+3', trend: 'up' },
    { icon: Calendar, label: 'Appointments', value: '8', change: '-2', trend: 'down' },
    { icon: Flask, label: 'Pending Tests', value: '5', change: '+1', trend: 'up' },
    { icon: Pills, label: 'Prescriptions', value: '15', change: '+4', trend: 'up' },
  ],
  nurse: [
    { icon: Users, label: 'Active Patients', value: '28', change: '+5', trend: 'up' },
    { icon: Stethoscope, label: 'Pending Tasks', value: '7', change: '-2', trend: 'down' },
    { icon: ClipboardList, label: 'Completed Tasks', value: '23', change: '+8', trend: 'up' },
    { icon: Calendar, label: 'Shift Hours', value: '6.5', change: '0', trend: 'up' },
  ],
  reception: [
    { icon: Calendar, label: 'Appointments Today', value: '45', change: '+8', trend: 'up' },
    { icon: Users, label: 'New Patients', value: '7', change: '+2', trend: 'up' },
    { icon: DollarSign, label: 'Payments Pending', value: '12', change: '-3', trend: 'down' },
    { icon: Activity, label: 'Queue Length', value: '15', change: '+5', trend: 'up' },
  ],
  lab_technician: [
    { icon: Flask, label: 'Pending Tests', value: '18', change: '+3', trend: 'up' },
    { icon: ClipboardList, label: 'Completed Today', value: '24', change: '+7', trend: 'up' },
    { icon: Activity, label: 'In Progress', value: '5', change: '-2', trend: 'down' },
    { icon: Calendar, label: 'Scheduled Tests', value: '8', change: '+1', trend: 'up' },
  ],
  pharmacist: [
    { icon: Pills, label: 'Pending Orders', value: '15', change: '+4', trend: 'up' },
    { icon: Package, label: 'Low Stock Items', value: '8', change: '-3', trend: 'down' },
    { icon: ClipboardList, label: 'Completed Today', value: '32', change: '+12', trend: 'up' },
    { icon: Activity, label: 'Active Orders', value: '7', change: '+2', trend: 'up' },
  ],
  cashier: [
    { icon: DollarSign, label: 'Today\'s Revenue', value: '$3,456', change: '+$789', trend: 'up' },
    { icon: ClipboardList, label: 'Transactions', value: '45', change: '+8', trend: 'up' },
    { icon: Users, label: 'Pending Payments', value: '12', change: '-3', trend: 'down' },
    { icon: Activity, label: 'Active Sessions', value: '3', change: '0', trend: 'up' },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const { session, status } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = roleBasedStats[session.user.role] || [];

  return (
    <div className={styles.dashboard}>
      <Sidebar role={session.user.role} />
      
      <main className={styles.content}>
        <DashboardHeader 
          title={`${session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)} Dashboard`}
          userName={session.user.name}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.statsGrid}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <p className={`text-xs ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? '↑' : '↓'} {stat.change} from last period
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add role-specific content sections here */}
      </main>
    </div>
  );
}