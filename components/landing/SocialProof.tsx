'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function SocialProof() {
  const testimonials = [
    {
      name: 'Lars Andersen',
      role: 'Software Udvikler',
      company: 'TDC NET',
      content: 'Job-Hjælpen.dk hjalp mig med at få 3 samtaler på én uge. AI-funktionerne er fantastiske!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5
    },
    {
      name: 'Maria Nielsen',
      role: 'Marketing Manager',
      company: 'Carlsberg',
      content: 'Det bedste værktøj til jobsøgning i Danmark. Jeg fandt mit drømmejob på kun 2 uger.',
      avatar: 'https://images.pexels.com/photos/3307758/pexels-photo-3307758.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5
    },
    {
      name: 'Thomas Hansen',
      role: 'Sales Director',
      company: 'Novo Nordisk',
      content: 'Virkelig imponerende teknologi. CV builderen sparede mig timer af arbejde.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5
    }
  ];

  const companies = [
    { name: 'Novo Nordisk', logo: 'NN' },
    { name: 'Mærsk', logo: 'M' },
    { name: 'Carlsberg', logo: 'C' },
    { name: 'Danske Bank', logo: 'DB' },
    { name: 'TDC NET', logo: 'TDC' },
    { name: 'Vestas', logo: 'V' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Social Proof Stats */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Betroet af over 1.200 danske jobsøgere
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Se hvorfor professionelle i hele Danmark vælger vores platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-gray-600">Succesfulde ansættelser</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
              <div className="text-gray-600">Forbedret CV score</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">3x</div>
              <div className="text-gray-600">Flere jobsamtaler</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Brugertilfredshed</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>

              <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />

              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} hos {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-8">Vores brugere arbejder hos Danmarks førende virksomheder:</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                className="flex items-center justify-center w-20 h-20 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-lg font-bold text-gray-700">{company.logo}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
