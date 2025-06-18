'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Adgangskoderne matcher ikke');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      toast.error('Du skal acceptere vilkår og betingelser');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Velkommen til Job-Hjælpen.dk!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Der opstod en fejl ved registrering');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    'AI-optimeret CV på 5 minutter',
    'Smart job matching',
    'Automatisk ansøgningssporing',
    'Personlige følgebreve',
    'GDPR-sikker databehandling'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-5 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="lg:col-span-2 text-white space-y-8 hidden lg:block">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Begynd din jobsøgning i dag
            </h1>
            <p className="text-xl text-blue-100">
              Tilslut dig over 1.200 danskere der har fundet deres drømmejob gennem vores platform.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={benefit} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-blue-100">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold mb-2">Gratis at komme i gang</div>
            <div className="text-blue-100">
              Ingen kreditkort påkrævet. Opgrader når du er klar.
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:col-span-3">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="text-white hover:text-blue-200 mb-8"
            asChild
          >
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbage til forsiden
            </Link>
          </Button>

          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">JH</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Opret din gratis konto
              </CardTitle>
              <CardDescription className="text-gray-600">
                Start din jobsøgning med AI-powered værktøjer
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Fulde navn</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dit fulde navn"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@email.dk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Adgangskode</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimum 8 karakterer"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                      className="h-12 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Bekræft adgangskode</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Gentag din adgangskode"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Jeg accepterer{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline">
                      vilkår og betingelser
                    </Link>{' '}
                    og{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline">
                      privatlivspolitik
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || !acceptTerms}
                >
                  {isLoading ? 'Opretter konto...' : 'Opret gratis konto'}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <div className="text-sm text-gray-600">
                  Har du allerede en konto?{' '}
                  <Link 
                    href="/login" 
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Log ind her
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}