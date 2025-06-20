// app/my-application/page.tsx
'use client'; // This component runs on the client-side

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Shadcn Tabs
import { toast } from 'sonner';
import { ArrowLeft, Save, Sparkles, PlusCircle } from 'lucide-react'; // Icons
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; // Import your Supabase client

// Define types for CV data for better type safety
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  summary: string;
}

interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string; // Or current: boolean
  description: string;
}

interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string; // Or current: boolean
  description: string; // This will hold AI-generated/edited bullet points
}

interface Skill {
  name: string;
  level?: string; // e.g., 'Beginner', 'Intermediate', 'Expert'
}

interface MasterCVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  // Add more sections as needed (e.g., projects, certifications)
}

export default function MyApplicationPage() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('master-cv');
  const [masterCVData, setMasterCVData] = useState<MasterCVData>({
    personalInfo: { fullName: '', email: '', phone: '', linkedin: '', website: '', summary: '' },
    education: [],
    experience: [],
    skills: [],
  });
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    companyName: '',
    jobUrl: '',
    jobDescription: '', // This will NOT be stored in DB permanently
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingCV, setIsSavingCV] = useState(false);
  const [isInitiatingTailoring, setIsInitiatingTailoring] = useState(false);

  // --- Authentication Check ---
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!authLoading && isAuthenticated) {
      // Fetch existing Master CV data on load
      fetchMasterCVData();
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchMasterCVData = async () => {
    setIsLoading(true);
    try {
      // Call your Next.js API route to fetch CV data
      const response = await fetch('/api/user-cvs');
      if (!response.ok) {
        throw new Error('Failed to fetch CV data');
      }
      const data = await response.json();
      if (data && data.json_data) {
        setMasterCVData(data.json_data); // Assuming json_data directly maps to MasterCVData
      }
      toast.success('CV-data indlæst.');
    } catch (error) {
      console.error('Error fetching master CV data:', error);
      toast.error('Kunne ikke indlæse CV-data. Opret venligst en ny.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers for Master CV Data ---
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setMasterCVData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [id]: value },
    }));
  };

  // Simplified Add/Remove for arrays (e.g., Education, Experience, Skills)
  const addEducation = () => setMasterCVData(prev => ({ ...prev, education: [...prev.education, { degree: '', institution: '', startDate: '', endDate: '', description: '' }] }));
  const addExperience = () => setMasterCVData(prev => ({ ...prev, experience: [...prev.experience, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }] }));
  const addSkill = () => setMasterCVData(prev => ({ ...prev, skills: [...prev.skills, { name: '' }] }));

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const updated = masterCVData.education.map((item, i) => (i === index ? { ...item, [id]: value } : item));
    setMasterCVData(prev => ({ ...prev, education: updated }));
  };
  // Similar handlers for experience and skills...

  const handleSaveMasterCV = async () => {
    setIsSavingCV(true);
    try {
      // Call your Next.js API route to save CV data
      // This will handle upserting into the user_cvs table
      const response = await fetch('/api/user-cvs', {
        method: 'POST', // Or PUT for updates, but POST can be upsert
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(masterCVData),
      });

      if (!response.ok) {
        throw new Error('Failed to save CV data');
      }
      toast.success('Master CV er gemt!');
    } catch (error) {
      console.error('Error saving master CV:', error);
      toast.error('Kunne ikke gemme Master CV.');
    } finally {
      setIsSavingCV(false);
    }
  };

  // --- Handlers for Job Details & Application Tailoring ---
  const handleJobDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setJobDetails((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInitiateTailoring = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitiatingTailoring(true);

    if (!jobDetails.jobTitle || !jobDetails.companyName || !jobDetails.jobDescription) {
      toast.error('Jobtitel, firmanavn og jobbeskrivelse er påkrævet for at skræddersy.');
      setIsInitiatingTailoring(false);
      return;
    }

    try {
      // In Day 3, this will call a Next.js API route which in turn
      // calls a Supabase Edge Function with jobDetails.jobDescription and masterCVData.
      // The Edge Function then uses OpenAI to tailor, and returns the tailored content.
      // This tailored content is then saved to user_applications table.

      console.log('Initiating tailoring with:', jobDetails, masterCVData);
      toast.success('Skræddersyning initieret! Du kan nu redigere den skræddersyede ansøgning.');
      // After initiating, you might update the UI to show the tailored content area
      // and allow saving it. For now, it just logs.
    } catch (error) {
      console.error('Error initiating tailoring:', error);
      toast.error('Der opstod en fejl under skræddersyning.');
    } finally {
      setIsInitiatingTailoring(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
        <p className="text-lg text-gray-700">Indlæser...</p>
      </div>
    );
  }

  // If not authenticated after loading, redirect to login
  if (!isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Button
          variant="ghost"
          className="text-gray-700 hover:text-gray-900 mb-8"
          asChild
        >
          <Link href="/dashboard" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbage til dashboard
          </Link>
        </Button>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Byg din ansøgning
            </CardTitle>
            <CardDescription className="text-gray-600">
              Opret dit Master CV eller skræddersy din ansøgning til et specifikt job.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="master-cv">Master CV Builder</TabsTrigger>
                <TabsTrigger value="job-tailoring">Jobdetaljer & Skræddersyning</TabsTrigger>
              </TabsList>

              {/* --- Master CV Builder Tab Content --- */}
              <TabsContent value="master-cv" className="mt-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Personlige oplysninger</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Fulde navn</Label>
                    <Input id="fullName" type="text" value={masterCVData.personalInfo.fullName} onChange={handlePersonalInfoChange} placeholder="Dit fulde navn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={masterCVData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="din@email.dk" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" value={masterCVData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="+45 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input id="linkedin" type="url" value={masterCVData.personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="https://linkedin.com/in/ditprofil" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (valgfrit)</Label>
                    <Input id="website" type="url" value={masterCVData.personalInfo.website} onChange={handlePersonalInfoChange} placeholder="https://dinwebside.dk" />
                  </div>
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="summary">Professionel opsummering</Label>
                    <Textarea id="summary" value={masterCVData.personalInfo.summary} onChange={handlePersonalInfoChange} rows={5} placeholder="En kort opsummering af din professionelle baggrund..." />
                    {/* Future: Add AI button here to generate summary */}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveMasterCV} disabled={isSavingCV}>
                    {isSavingCV ? 'Gemmer Master CV...' : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Gem Master CV
                      </>
                    )}
                  </Button>
                </div>

                {/* Placeholder for other sections (Education, Experience, Skills) */}
                <h3 className="text-xl font-semibold text-gray-800 mt-8">Uddannelse</h3>
                {/* For each education entry, render inputs and allow AI generation/editing for description */}
                {masterCVData.education.map((edu, index) => (
                  <Card key={index} className="mt-4 p-4">
                    <CardContent className="p-0 space-y-2">
                      <Label htmlFor={`degree-${index}`}>Uddannelse</Label>
                      <Input id={`degree-${index}`} type="text" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                      {/* ... more education fields ... */}
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" onClick={addEducation} className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Uddannelse
                </Button>

                <h3 className="text-xl font-semibold text-gray-800 mt-8">Arbejdserfaring</h3>
                {/* For each experience entry, render inputs and allow AI generation/editing for description */}
                {/* Add an "Add Experience" button similar to Education */}
                <Button variant="outline" onClick={addExperience} className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Erfaring
                </Button>

                <h3 className="text-xl font-semibold text-gray-800 mt-8">Færdigheder</h3>
                {/* For each skill entry, render inputs and allow AI generation/editing */}
                {/* Add an "Add Skill" button similar to Education */}
                <Button variant="outline" onClick={addSkill} className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Færdighed
                </Button>

                {/* Future: CV Preview Section Here (Day 3 task) */}

              </TabsContent>

              {/* --- Job Details & Application Tailoring Tab Content --- */}
              <TabsContent value="job-tailoring" className="mt-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Joboplysninger</h3>
                <form onSubmit={handleInitiateTailoring} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Jobtitel</Label>
                    <Input
                      id="jobTitle"
                      type="text"
                      placeholder="F.eks. Softwareudvikler, Marketingchef"
                      value={jobDetails.jobTitle}
                      onChange={handleJobDetailsChange}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Firmanavn</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="F.eks. Mærsk, Danske Bank"
                      value={jobDetails.companyName}
                      onChange={handleJobDetailsChange}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobUrl">Joblink (valgfrit)</Label>
                    <Input
                      id="jobUrl"
                      type="url"
                      placeholder="F.eks. https://www.firma.dk/job/..."
                      value={jobDetails.jobUrl}
                      onChange={handleJobDetailsChange}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Jobbeskrivelse (kopier og indsæt)</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Kopier og indsæt hele jobbeskrivelsen her..."
                      value={jobDetails.jobDescription}
                      onChange={handleJobDetailsChange}
                      required
                      rows={15}
                      className="resize-y"
                    />
                    <p className="text-sm text-yellow-700 mt-2 p-2 bg-yellow-50 rounded-md border border-yellow-200">
                      <span className="font-semibold">Vigtigt:</span> Denne jobbeskrivelse bruges udelukkende til AI-generering af din ansøgning og vil <span className="font-bold">IKKE</span> blive gemt på vores platform grundet dansk lovgivning.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                    disabled={isInitiatingTailoring}
                  >
                    {isInitiatingTailoring ? 'Skræddersyer ansøgning...' : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Skræddersy ansøgning
                      </>
                    )}
                  </Button>
                </form>

                {/* Future: Display area for tailored application content (Day 3 task) */}
                {/* Future: Export button for tailored application (Day 3 task) */}

              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
