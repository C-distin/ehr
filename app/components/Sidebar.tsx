'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, FlaskRound as Flask, Pill as Pills, CreditCard, Settings, LogOut, Home, Activity, Stethoscope, ClipboardList, Package, DollarSign, BarChart } from 'lucide-react';
import { Role } from '../types/user';

interface SidebarProps {
  role: Role;
}

const menuItems = {
  administrator: [
    { icon: Users, label: 'Staff Management', href: '/dashboard/administrator/staff' },
    { icon: Activity, label: 'System Overview', href: '/dashboard/administrator' },
    { icon: BarChart, label: 'Analytics', href: '/dashboard/administrator/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/administrator/settings' },
  ],
  doctor: [
    { icon: Users, label: 'Patients', href: '/dashboard/patients' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: FileText, label: 'Medical Records', href: '/dashboard/medical-records' },
    { icon: Flask, label: 'Lab Tests', href: '/dashboard/lab-tests' },
    { icon: Pills, label: 'Prescriptions', href: '/dashboard/prescriptions' },
  ],
  nurse: [
    { icon: Users, label: 'Patients', href: '/dashboard/patients' },
    { icon: Stethoscope, label: 'Patient Care', href: '/dashboard/nurse/patient-care' },
    { icon: ClipboardList, label: 'Tasks', href: '/dashboard/nurse/tasks' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/nurse/schedule' },
  ],
  reception: [
    { icon: Users, label: 'Patients', href: '/dashboard/patients' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  ],
  lab_technician: [
    { icon: Flask, label: 'Lab Tests', href: '/dashboard/lab-technician/tests' },
    { icon: ClipboardList, label: 'Reports', href: '/dashboard/lab-technician/reports' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/lab-technician/schedule' },
  ],
  pharmacist: [
    { icon: Pills, label: 'Prescriptions', href: '/dashboard/pharmacist/prescriptions' },
    { icon: Package, label: 'Inventory', href: '/dashboard/pharmacist/inventory' },
    { icon: ClipboardList, label: 'Orders', href: '/dashboard/pharmacist/orders' },
  ],
  cashier: [
    { icon: DollarSign, label: 'Payments', href: '/dashboard/cashier/payments' },
    { icon: CreditCard, label: 'Transactions', href: '/dashboard/cashier/transactions' },
    { icon: FileText, label: 'Reports', href: '/dashboard/cashier/reports' },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = menuItems[role as keyof typeof menuItems] || [];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 z-50 flex flex-col"
    >
      <div className="p-6 flex-1">
        <Link href="/dashboard" className="flex items-center space-x-2 mb-8">
          <Home className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">EHR System</span>
        </Link>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/settings"
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          onClick={() => {/* Add logout logic */}}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full mt-1"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
}