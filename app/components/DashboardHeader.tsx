'use client';

import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  userName: string;
}

export default function DashboardHeader({ title, userName }: DashboardHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm mb-8 p-4 flex justify-between items-center"
    >
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">{userName}</span>
        </div>
      </div>
    </motion.header>
  );
}