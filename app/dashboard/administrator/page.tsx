'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, FileText, Settings } from 'lucide-react';
import DashboardHeader from '@/app/components/DashboardHeader';
import Sidebar from '@/app/components/Sidebar';
import styles from '@/app/styles/Dashboard.module.css';

const stats = [
  { icon: Users, label: 'Total Staff', value: '45' },
  { icon: DollarSign, label: 'Revenue Today', value: '$5,234' },
  { icon: FileText, label: 'Reports Generated', value: '12' },
  { icon: Settings, label: 'System Updates', value: '3' },
];

export default function AdministratorDashboard() {
  return (
    <div className={styles.dashboard}>
      <Sidebar role="administrator" />
      <main className={styles.content}>
        <DashboardHeader title="Administrator Dashboard" userName="Robert Taylor" />
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