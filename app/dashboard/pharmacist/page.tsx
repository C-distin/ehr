'use client';

import { motion } from 'framer-motion';
import { Pills, Package, AlertCircle } from 'lucide-react';
import DashboardHeader from '@/app/components/DashboardHeader';
import Sidebar from '@/app/components/Sidebar';
import styles from '@/app/styles/Dashboard.module.css';

const stats = [
  { icon: Pills, label: 'Pending Prescriptions', value: '15' },
  { icon: Package, label: 'Ready for Pickup', value: '7' },
  { icon: AlertCircle, label: 'Low Stock Items', value: '4' },
];

export default function PharmacistDashboard() {
  return (
    <div className={styles.dashboard}>
      <Sidebar role="pharmacist" />
      <main className={styles.content}>
        <DashboardHeader title="Pharmacist Dashboard" userName="Emily Chen" />
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
              className={styles.statCard}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">{stat.label}</h3>
              </div>
              <p className={styles.statValue}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}