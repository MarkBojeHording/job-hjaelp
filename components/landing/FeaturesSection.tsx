'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Target, BarChart3, Zap, Shield, Clock, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: 'AI CV Builder',
      description: 'Byg et professionelt CV på minutter med AI-drevne forslag og optimering baseret på danske rekrutteringsstandards.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Target,
      title: 'Smart Job Matching',
      description: 'Vores AI analyserer dine skills og finder de mest relevante job opportunities med præcise match-procenter.',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn Optimering',
      description: 'Optimer din LinkedIn profil med AI for bedre synlighed og flere professionelle forbindelser i Danmark.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: BarChart3,
      title: 'Ansøgningssporing',
      description: 'Hold styr på alle dine jobansøgninger med intelligent tracking og automatiske påmindelser.',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      icon: Zap,
      title: 'Hurtig Ansøgning',
      description: 'Ansøg til jobs med et enkelt klik. AI genererer personlige følgebreve automatisk.',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Shield,
      title: 'GDPR Sikkerhed',
      description: 'Dine data er fuldt beskyttet under danske og europæiske privatlissslovgivning.',
      color: 'text-red-600 bg-red-50'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Alt du behøver for at lande dit næste job
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vores platform kombinerer kunstig intelligens med dyb forståelse af det danske arbejdsmarked 
            for at give dig de bedste chancer for succes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Designet specifikt til det danske arbejdsmarked
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                Vi forstår danske virksomheder, rekrutteringsprocesser og forventninger. 
                Vores AI er trænet på tusindvis af succesfulde danske jobansøgninger.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-blue-200 text-sm">Danske virksomheder</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-blue-200 text-sm">Brugertilfredshed</div>
                </div>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="inline-flex flex-wrap gap-2">
                {['Copenhagen', 'Aarhus', 'Odense', 'Aalborg'].map((city) => (
                  <span 
                    key={city}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}