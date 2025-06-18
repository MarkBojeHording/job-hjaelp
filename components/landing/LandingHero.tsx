'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function LandingHero() {
  const benefits = [
    'AI-optimeret CV på 5 minutter',
    'Smart job matching baseret på dine skills',
    'Automatisk ansøgningssporing'
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%2260%22%20height%3D%2260%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22/%3E%3Cpath%20d%3D%22M30%2030l30-30H30v30z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22/%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div 
              className="text-white space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm border border-blue-500/20">
                  <span className="text-blue-300">🚀 Ny AI-teknologi tilgængelig</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Land dit{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
                    drømmejob
                  </span>{' '}
                  i Danmark
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Få hjælp fra Danmarks mest avancerede AI til at bygge det perfekte CV, 
                  finde relevante jobs og spore dine ansøgninger. Alt på ét sted.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={benefit}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/25 group" 
                  asChild
                >
                  <Link href="/register" className="flex items-center">
                    Kom i gang gratis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Se hvordan det virker
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div>
                  <div className="text-2xl font-bold text-white">1.200+</div>
                  <div className="text-sm text-gray-400">Succesfulde ansættelser</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-sm text-gray-400">Forbedret CV score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3x</div>
                  <div className="text-sm text-gray-400">Flere samtaler</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div 
              className="lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Dashboard Preview */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-blue-50 rounded-lg p-3">
                        <div className="h-2 bg-blue-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-blue-600 rounded w-2/3"></div>
                      </div>
                      <div className="h-20 bg-green-50 rounded-lg p-3">
                        <div className="h-2 bg-green-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-green-600 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CheckCircle className="h-6 w-6" />
                </motion.div>

                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-lg shadow-lg"
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-semibold">+95% Match</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}