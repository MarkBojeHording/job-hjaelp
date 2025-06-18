'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  Target, 
  TrendingUp, 
  Eye, 
  Calendar,
  Linkedin,
  ArrowRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [weeklyGoal] = useState(75);
  const [currentProgress] = useState(60);

  const stats = [
    {
      title: 'Ansøgninger denne uge',
      value: '12',
      change: '+3 fra sidste uge',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Samtale invitationer',
      value: '4',
      change: '+2 nye i dag',
      icon: Users,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'LinkedIn Score',
      value: '78%',
      change: '+12% denne måned',
      icon: Linkedin,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Profil visninger',
      value: '156',
      change: '+24% denne uge',
      icon: Eye,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const recentActivity = [
    {
      type: 'job_match',
      title: 'Nyt job hos Novo Nordisk matcher din profil 95%',
      time: '2 timer siden',
      icon: Target,
      color: 'text-green-600'
    },
    {
      type: 'profile_view',
      title: 'Dit CV blev set af Danske Bank',
      time: '4 timer siden',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      type: 'linkedin',
      title: 'Din LinkedIn profil kan forbedres med 3 simple ændringer',
      time: '6 timer siden',
      icon: Linkedin,
      color: 'text-blue-600'
    },
    {
      type: 'interview',
      title: 'Påmindelse: Samtale i morgen hos TDC NET',
      time: '1 dag siden',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Færdiggør dit CV',
      description: 'Du mangler kun 2 sektioner',
      progress: 80,
      href: '/cv-builder',
      color: 'bg-blue-600'
    },
    {
      title: 'Optimer LinkedIn',
      description: 'Få 78% → 90% score',
      progress: 78,
      href: '/linkedin-optimizer',
      color: 'bg-blue-600'
    },
    {
      title: 'Ansøg 3 anbefalede jobs',
      description: 'Høj match procent',
      progress: 0,
      href: '/jobs',
      color: 'bg-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Velkommen tilbage, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">
                Her er dit jobsøgnings overblik for i dag
              </p>
            </div>
            <Button asChild>
              <Link href="/jobs" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Find nye jobs
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Seneste aktivitet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ugentlige mål</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - currentProgress / 100)}`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">
                          {currentProgress}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Du er {currentProgress}% på vej til dit ugentlige mål
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ansøgninger</span>
                      <span className="font-medium">12/15</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Netværk kontakter</span>
                      <span className="font-medium">8/10</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hurtige handlinger</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={action.href}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                      {action.progress > 0 && (
                        <Progress value={action.progress} className="h-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}