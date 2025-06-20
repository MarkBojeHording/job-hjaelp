// app/my-application/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, Save, Sparkles, PlusCircle, MinusCircle } from 'lucide-react'; // Added MinusCircle
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

// --- Type Definitions for Master CV Data ---
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  summary: string;
  address: string; // Added address
  city: string;    // Added city
  zipCode: string; // Added zipCode
}

interface Education {
  degree: string;
  institution: string;
  city: string; // Added city for education
  startDate: string;
  endDate: string; // Or current: boolean
  description: string; // This will hold AI-generated/edited bullet points
}

interface Course {
  name: string;
  provider: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  jobTitle: string;
  company: string;
  city: string; // Added city for experience
  startDate: string;
  endDate: string; // Or current: boolean
  description: string; // This will hold AI-generated/edited bullet points
}

interface Skill {
  name: string;
  level?: string; // e.g., 'Beginner', 'Intermediate', 'Expert'
}

interface Volunteering {
  role: string;
  organization: string;
  city: string; // Added city for volunteering
  startDate: string;
  endDate: string;
  description: string;
}

interface MasterCVData {
  personalInfo: PersonalInfo;
  education: Education[];
  courses: Course[]; // New section
  experience: Experience[];
  skills: Skill[];
  volunteering: Volunteering[]; // New section
  // Add more sections as needed (e.g., projects, certifications, languages)
}

// --- Default empty state for new entries ---
const emptyEducation: Education = { degree: '', institution: '', city: '', startDate: '', endDate: '', description: '' };
const emptyCourse: Course = { name: '', provider: '', startDate: '', endDate: '', description: '' };
const emptyExperience: Experience = { jobTitle: '', company: '', city: '', startDate: '', endDate: '', description: '' };
const emptySkill: Skill = { name: '', level: '' };
const emptyVolunteering: Volunteering = { role: '', organization: '', city: '', startDate: '', endDate: '', description: '' };


export default function MyApplicationPage() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('master-cv');
  const [masterCVData, setMasterCVData] = useState<MasterCVData>({
    personalInfo: { fullName: '', email: '', phone: '', linkedin: '', website: '', summary: '', address: '', city: '', zipCode: '' },
    education: [],
    courses: [],
    experience: [],
    skills: [],
    volunteering: [],
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

  // --- Authentication Check & Initial CV Data Fetch ---
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!authLoading && isAuthenticated) {
      fetchMasterCVData();
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchMasterCVData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user-cvs');
      if (!response.ok) {
        throw new Error('Failed to fetch CV data');
      }
      const data = await response.json();
      if (data && data.json_data) {
        // Merge fetched data with default structure to ensure all keys exist
        setMasterCVData(prev => ({
          ...prev, // Keep existing structure for robustness
          personalInfo: data.json_data.personalInfo || prev.personalInfo,
          education: data.json_data.education || [],
          courses: data.json_data.courses || [],
          experience: data.json_data.experience || [],
          skills: data.json_data.skills || [],
          volunteering: data.json_data.volunteering || [],
          // Ensure any future sections are also merged/initialized
        }));
      }
      toast.success('CV-data indlæst.');
    } catch (error) {
      console.error('Error fetching master CV data:', error);
      toast.error('Kunne ikke indlæse CV-data. Opret venligst en ny.');
      // If fetching fails, still ensure loading is false to allow editing
      setMasterCVData({
        personalInfo: { fullName: '', email: '', phone: '', linkedin: '', website: '', summary: '', address: '', city: '', zipCode: '' },
        education: [], courses: [], experience: [], skills: [], volunteering: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers for Master CV Data (Individual Sections) ---

  // Personal Info
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setMasterCVData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [id]: value },
    }));
  };

  // Generic handler for array sections (Education, Experience, Courses, Volunteering)
  const handleArrayItemChange = <T, K extends keyof T>(
    section: keyof MasterCVData,
    index: number,
    field: K,
    value: T[K]
  ) => {
    setMasterCVData((prev) => {
      const updatedSection = (prev[section] as T[]).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, [section]: updatedSection } as MasterCVData;
    });
  };

  // Generic add/remove for array sections
  const addArrayItem = (section: keyof MasterCVData, emptyItem: any) => {
    setMasterCVData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), emptyItem]
    }));
  };

  const removeArrayItem = (section: keyof MasterCVData, index: number) => {
    setMasterCVData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_, i) => i !== index)
    }));
  };


  // Handle Skills specifically as it's a simple name field for now
  const handleSkillChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMasterCVData((prev) => {
      const updatedSkills = prev.skills.map((skill, i) =>
        i === index ? { ...skill, name: value } : skill
      );
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSaveMasterCV = async () => {
    setIsSavingCV(true);
    try {
      const response = await fetch('/api/user-cvs', {
        method: 'POST',
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
      // Step 1: Save the minimal job details to user_applications table
      // This will call a Next.js API route, e.g., /api/applications
      const saveAppResponse = await fetch('/api/applications', {
        method: 'POST', // Or a dedicated 'initiate' endpoint
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_title: jobDetails.jobTitle,
          company_name: jobDetails.companyName,
          job_url: jobDetails.jobUrl,
          // Other initial fields like status
        }),
      });

      if (!saveAppResponse.ok) {
        const errorData = await saveAppResponse.json();
        throw new Error(errorData.error || 'Failed to save application details');
      }

      // const { applicationId } = await saveAppResponse.json(); // Get the ID of the new application

      // Step 2: Send full job description + Master CV data to Supabase Edge Function for AI processing
      // IMPORTANT: This will be implemented in Day 3.
      // For now, we simulate.
      // const aiTailoringResponse = await fetch('/api/tailor-application', { // Placeholder API route
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     jobDescription: jobDetails.jobDescription,
      //     masterCV: masterCVData,
      //     applicationId: applicationId, // Pass the ID so AI can update the specific record
      //   }),
      // });
      // if (!aiTailoringResponse.ok) {
      //   throw new Error('AI tailoring failed');
      // }
      // const tailoredContent = await aiTailoringResponse.json(); // Get the tailored content from AI

      // Update the UI with the tailored content (placeholder for now)
      // setTailoredApplicationContent(tailoredContent);

      toast.success('Skræddersyning initieret! Du kan nu redigere den skræddersyede ansøgning.');
      // After initiating, you might update the UI to show the tailored content area
      // or redirect to a specific application ID's tailoring view.
      // For this combined page, we'd reveal/populate the tailored content display area.
    } catch (error) {
      console.error('Error initiating tailoring:', error);
      toast.error(`Der opstod en fejl under skræddersyning: ${(error as Error).message}`);
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

  if (!isAuthenticated) {
    return null;
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
              <TabsContent value="master-cv" className="mt-6 space-y-8">
                {/* Personal Info */}
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
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" type="text" value={masterCVData.personalInfo.address} onChange={handlePersonalInfoChange} placeholder="Gade og husnummer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Postnummer</Label>
                    <Input id="zipCode" type="text" value={masterCVData.personalInfo.zipCode} onChange={handlePersonalInfoChange} placeholder="F.eks. 8000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">By</Label>
                    <Input id="city" type="text" value={masterCVData.personalInfo.city} onChange={handlePersonalInfoChange} placeholder="F.eks. Aarhus" />
                  </div>
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="summary">Professionel opsummering</Label>
                    <Textarea id="summary" value={masterCVData.personalInfo.summary} onChange={handlePersonalInfoChange} rows={5} placeholder="En kort opsummering af din professionelle baggrund..." />
                    {/* Future: Add AI button here to generate summary */}
                  </div>
                </div>

                {/* Uddannelse (Education) */}
                <h3 className="text-xl font-semibold text-gray-800 pt-4">Uddannelse</h3>
                <div className="space-y-4">
                  {masterCVData.education.map((edu, index) => (
                    <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                      <CardContent className="p-0 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edu-degree-${index}`}>Uddannelse/Grad</Label>
                            <Input id={`degree-${index}`} type="text" value={edu.degree} onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)} placeholder="F.eks. Cand.merc." />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                            <Input id={`institution-${index}`} type="text" value={edu.institution} onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)} placeholder="F.eks. Aarhus Universitet" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-city-${index}`}>By</Label>
                            <Input id={`city-${index}`} type="text" value={edu.city} onChange={(e) => handleArrayItemChange('education', index, 'city', e.target.value)} placeholder="F.eks. Aarhus" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-startDate-${index}`}>Startdato</Label>
                            <Input id={`startDate-${index}`} type="date" value={edu.startDate} onChange={(e) => handleArrayItemChange('education', index, 'startDate', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-endDate-${index}`}>Slutdato (el. 'Nuværende')</Label>
                            <Input id={`endDate-${index}`} type="date" value={edu.endDate} onChange={(e) => handleArrayItemChange('education', index, 'endDate', e.target.value)} />
                          </div>
                          <div className="space-y-2 col-span-full">
                            <Label htmlFor={`edu-description-${index}`}>Beskrivelse (resultater, fokusområder)</Label>
                            <Textarea id={`description-${index}`} value={edu.description} onChange={(e) => handleArrayItemChange('education', index, 'description', e.target.value)} rows={3} placeholder="Beskriv dine primære resultater eller fokusområder..." />
                            {/* Future: Add AI button here */}
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="destructive" size="sm" onClick={() => removeArrayItem('education', index)}>
                            <MinusCircle className="h-4 w-4 mr-2" /> Fjern uddannelse
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem('education', emptyEducation)} className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Uddannelse
                  </Button>
                </div>

                {/* Kurser (Courses) */}
                <h3 className="text-xl font-semibold text-gray-800 pt-4">Kurser & Certificeringer</h3>
                <div className="space-y-4">
                  {masterCVData.courses.map((course, index) => (
                    <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                      <CardContent className="p-0 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`course-name-${index}`}>Kursusnavn</Label>
                            <Input id={`name-${index}`} type="text" value={course.name} onChange={(e) => handleArrayItemChange('courses', index, 'name', e.target.value)} placeholder="F.eks. Google Project Management Certificate" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`course-provider-${index}`}>Udbyder</Label>
                            <Input id={`provider-${index}`} type="text" value={course.provider} onChange={(e) => handleArrayItemChange('courses', index, 'provider', e.target.value)} placeholder="F.eks. Coursera, Google" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`course-startDate-${index}`}>Startdato</Label>
                            <Input id={`startDate-${index}`} type="date" value={course.startDate} onChange={(e) => handleArrayItemChange('courses', index, 'startDate', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`course-endDate-${index}`}>Slutdato</Label>
                            <Input id={`endDate-${index}`} type="date" value={course.endDate} onChange={(e) => handleArrayItemChange('courses', index, 'endDate', e.target.value)} />
                          </div>
                          <div className="space-y-2 col-span-full">
                            <Label htmlFor={`course-description-${index}`}>Beskrivelse (nøglefærdigheder lært)</Label>
                            <Textarea id={`description-${index}`} value={course.description} onChange={(e) => handleArrayItemChange('courses', index, 'description', e.target.value)} rows={3} placeholder="Beskriv hvad du har lært og dine resultater..." />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="destructive" size="sm" onClick={() => removeArrayItem('courses', index)}>
                            <MinusCircle className="h-4 w-4 mr-2" /> Fjern kursus
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem('courses', emptyCourse)} className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Kursus
                  </Button>
                </div>

                {/* Arbejdserfaring (Work Experience) */}
                <h3 className="text-xl font-semibold text-gray-800 pt-4">Arbejdserfaring</h3>
                <div className="space-y-4">
                  {masterCVData.experience.map((exp, index) => (
                    <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                      <CardContent className="p-0 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exp-jobTitle-${index}`}>Jobtitel</Label>
                            <Input id={`jobTitle-${index}`} type="text" value={exp.jobTitle} onChange={(e) => handleArrayItemChange('experience', index, 'jobTitle', e.target.value)} placeholder="F.eks. Projektleder" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-company-${index}`}>Virksomhed</Label>
                            <Input id={`company-${index}`} type="text" value={exp.company} onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)} placeholder="F.eks. LEGO" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-city-${index}`}>By</Label>
                            <Input id={`city-${index}`} type="text" value={exp.city} onChange={(e) => handleArrayItemChange('experience', index, 'city', e.target.value)} placeholder="F.eks. Billund" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-startDate-${index}`}>Startdato</Label>
                            <Input id={`startDate-${index}`} type="date" value={exp.startDate} onChange={(e) => handleArrayItemChange('experience', index, 'startDate', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-endDate-${index}`}>Slutdato (el. 'Nuværende')</Label>
                            <Input id={`endDate-${index}`} type="date" value={exp.endDate} onChange={(e) => handleArrayItemChange('experience', index, 'endDate', e.target.value)} />
                          </div>
                          <div className="space-y-2 col-span-full">
                            <Label htmlFor={`exp-description-${index}`}>Beskrivelse (ansvar, resultater)</Label>
                            <Textarea id={`description-${index}`} value={exp.description} onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)} rows={5} placeholder="Beskriv dine ansvarsområder og kvantificer dine resultater..." />
                            {/* Future: Add AI button here */}
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="destructive" size="sm" onClick={() => removeArrayItem('experience', index)}>
                            <MinusCircle className="h-4 w-4 mr-2" /> Fjern erfaring
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem('experience', emptyExperience)} className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Erfaring
                  </Button>
                </div>

                {/* Færdigheder (Skills) */}
                <h3 className="text-xl font-semibold text-gray-800 pt-4">Færdigheder</h3>
                <div className="space-y-4">
                  {masterCVData.skills.map((skill, index) => (
                    <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                      <CardContent className="p-0 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`skill-name-${index}`}>Færdighed</Label>
                            <Input id={`name-${index}`} type="text" value={skill.name} onChange={(e) => handleSkillChange(index, e)} placeholder="F.eks. Projektledelse, Python, Marketing" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`skill-level-${index}`}>Niveau (valgfrit)</Label>
                            <Input id={`level-${index}`} type="text" value={skill.level || ''} onChange={(e) => handleArrayItemChange('skills', index, 'level', e.target.value)} placeholder="F.eks. Ekspert, Avanceret" />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="destructive" size="sm" onClick={() => removeArrayItem('skills', index)}>
                            <MinusCircle className="h-4 w-4 mr-2" /> Fjern færdighed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem('skills', emptySkill)} className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Færdighed
                  </Button>
                </div>

                {/* Frivilligt arbejde (Volunteering) */}
                <h3 className="text-xl font-semibold text-gray-800 pt-4">Frivilligt arbejde</h3>
                <div className="space-y-4">
                  {masterCVData.volunteering.map((vol, index) => (
                    <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                      <CardContent className="p-0 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`vol-role-${index}`}>Rolle</Label>
                            <Input id={`role-${index}`} type="text" value={vol.role} onChange={(e) => handleArrayItemChange('volunteering', index, 'role', e.target.value)} placeholder="F.eks. Frivillig koordinator" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`vol-organization-${index}`}>Organisation</Label>
                            <Input id={`organization-${index}`} type="text" value={vol.organization} onChange={(e) => handleArrayItemChange('volunteering', index, 'organization', e.target.value)} placeholder="F.eks. Røde Kors" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`vol-city-${index}`}>By</Label>
                            <Input id={`city-${index}`} type="text" value={vol.city} onChange={(e) => handleArrayItemChange('volunteering', index, 'city', e.target.value)} placeholder="F.eks. København" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`vol-startDate-${index}`}>Startdato</Label>
                            <Input id={`startDate-${index}`} type="date" value={vol.startDate} onChange={(e) => handleArrayItemChange('volunteering', index, 'startDate', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`vol-endDate-${index}`}>Slutdato</Label>
                            <Input id={`endDate-${index}`} type="date" value={vol.endDate} onChange={(e) => handleArrayItemChange('volunteering', index, 'endDate', e.target.value)} />
                          </div>
                          <div className="space-y-2 col-span-full">
                            <Label htmlFor={`vol-description-${index}`}>Beskrivelse (ansvar, bidrag)</Label>
                            <Textarea id={`description-${index}`} value={vol.description} onChange={(e) => handleArrayItemChange('volunteering', index, 'description', e.target.value)} rows={3} placeholder="Beskriv dine ansvarsområder og hvad du har bidraget med..." />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="destructive" size="sm" onClick={() => removeArrayItem('volunteering', index)}>
                            <MinusCircle className="h-4 w-4 mr-2" /> Fjern frivilligt arbejde
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={() => addArrayItem('volunteering', emptyVolunteering)} className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" /> Tilføj Frivilligt Arbejde
                  </Button>
                </div>

                <div className="flex justify-end pt-8">
                  <Button onClick={handleSaveMasterCV} disabled={isSavingCV} className="h-12 bg-blue-600 hover:bg-blue-700">
                    {isSavingCV ? 'Gemmer Master CV...' : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Gem Master CV
                      </>
                    )}
                  </Button>
                </div>
                {/* Future: CV Preview Section Here (Day 3 task) */}
                {/* Future: CV Export Section Here (Day 3 task) */}
                {/* Future: Import CV from File Section Here (Day 3 task) */}

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
