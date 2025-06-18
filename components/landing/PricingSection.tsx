'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: 'Gratis',
      price: 0,
      description: 'Perfekt til at komme i gang',
      features: [
        'Basis CV builder',
        'Op til 5 jobansøgninger per måned',
        'Basis job matching',
        'E-mail support'
      ],
      limitations: [
        'Ingen AI-optimering',
        'Begrænset ansøgningssporing'
      ],
      cta: 'Kom i gang gratis',
      href: '/register',
      popular: false
    },
    {
      name: 'Pro',
      price: 199,
      description: 'For seriøse jobsøgere',
      features: [
        'Alt i Gratis',
        'Ubegrænset AI CV optimering',
        'Avanceret job matching',
        'Automatisk ansøgningssporing',
        'AI-genererede følgebreve',
        'Prioriteret support',
        'Karriererådigivning'
      ],
      limitations: [],
      cta: 'Start 14-dages gratis prøveperiode',
      href: '/register?plan=pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 499,
      description: 'For teams og rekrutteringsagenturer',
      features: [
        'Alt i Pro',
        'Team dashboard',
        'Bulk CV processing',
        'API adgang',
        'Brugerdefinerede rapporter',
        'Dedikeret success manager',
        'SLA garanti'
      ],
      limitations: [],
      cta: 'Kontakt salg',
      href: '/contact?plan=enterprise',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Vælg den plan der passer til dig
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start gratis og opgrader når du er klar. Alle planer inkluderer 14 dages pengene tilbage garanti.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                    <Star className="w-4 h-4 mr-1" />
                    Mest populær
                  </span>
                </div>
              )}
              
              <Card className={`h-full ${plan.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'shadow-md hover:shadow-lg'} transition-all duration-300`}>
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.price > 0 ? 'DKK/måned' : ''}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">Begrænsninger:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="text-sm text-gray-500">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-6">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                      asChild
                    >
                      <Link href={plan.href}>
                        {plan.cta}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Har du spørgsmål?
          </h3>
          <p className="text-gray-600 mb-8">
            Vi hjælper gerne med at finde den rigtige løsning for dig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/faq">Se FAQ</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Kontakt os</Link>
            </Button>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            100% Tilfredshedsgaranti
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vi er så sikre på at du vil elske Job-Hjælpen.dk, at vi tilbyder 14 dages pengene tilbage garanti. 
            Ingen spørgsmål stillet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}