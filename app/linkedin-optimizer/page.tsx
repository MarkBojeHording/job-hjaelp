'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Linkedin, 
  Search, 
  User, 
  FileText, 
  Award, 
  Camera, 
  Activity,
  AlertTriangle,
  Copy,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Download,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  MessageSquare
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LinkedInOptimizerPage() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [profileUrl, setProfileUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [connectionGoal, setConnectionGoal] = useState([20]);
  
  // Mock analysis data
  const analysisData = {
    overallScore: 78,
    scores: {
      headline: 85,
      summary: 72,
      experience: 80,
      skills: 65,
      photo: 90,
      activity: 55
    },
    criticalIssues: [
      'Manglende nøgleord i headline',
      'Summary er for kort og generisk',
      'Kun 3 indlæg de sidste 30 dage'
    ]
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const ScoreCard = ({ title, score, icon: Icon, suggestions }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{suggestions} forslag</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{score}</div>
            <div className="text-xs text-gray-500">af 100</div>
          </div>
        </div>
        <Progress value={score} className="h-2" />
      </CardContent>
    </Card>
  );

  const TemplateCard = ({ title, message, scenario, onCopy }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <Badge variant="secondary">{scenario}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{message}</p>
        <Button size="sm" variant="outline" onClick={onCopy} className="w-full">
          <Copy className="h-4 w-4 mr-2" />
          Kopier besked
        </Button>
      </CardContent>
    </Card>
  );

  const connectionTemplates = [
    {
      title: 'Branchemedarbejder',
      scenario: 'Kollega',
      message: 'Hej [Navn], jeg så dit profil og bemærkede at vi begge arbejder inden for [industri]. Jeg vil gerne udvide mit netværk med dygtige fagfolk som dig. Håber vi kan forbinde!'
    },
    {
      title: 'Virksomhedsmedarbejder',
      scenario: 'Potentiel kollega',
      message: 'Hej [Navn], jeg er interesseret i [Virksomhed] og vil gerne lære mere om jeres arbejdskultur. Vil du dele dine erfaringer med at arbejde der?'
    },
    {
      title: 'Event forbindelse',
      scenario: 'Netværk',
      message: 'Hej [Navn], det var dejligt at møde dig til [Event navn]. Jeg synes vores samtale om [emne] var meget interessant. Lad os holde kontakten!'
    },
    {
      title: 'Alumni netværk',
      scenario: 'Uddannelse',
      message: 'Hej [Navn], jeg så at vi begge har studeret på [Universitet]. Det ville være fedt at forbinde med en medstuderende og høre om din karrierevej!'
    },
    {
      title: 'Mentor forespørgsel',
      scenario: 'Vejledning',
      message: 'Hej [Navn], jeg beundrer din karriere inden for [område]. Som en der er ny i branchen, ville jeg sætte stor pris på at lære af din erfaring.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Linkedin className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                LinkedIn Optimering
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Få flere profil visninger og bedre netværk i det danske erhvervsliv
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Profil Analyse</TabsTrigger>
            <TabsTrigger value="content">Indhold Optimering</TabsTrigger>
            <TabsTrigger value="network">Netværk Strategi</TabsTrigger>
            <TabsTrigger value="results">Resultater & Tracking</TabsTrigger>
          </TabsList>

          {/* Tab 1: Profile Analysis */}
          <TabsContent value="analysis" className="space-y-8">
            {!analysisComplete ? (
              <Card>
                <CardHeader>
                  <CardTitle>Analyser din LinkedIn profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profileUrl">LinkedIn profil URL</Label>
                    <Input
                      id="profileUrl"
                      placeholder="https://linkedin.com/in/dit-navn"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Vi analyserer kun offentlige informationer
                    </p>
                  </div>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!profileUrl || isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Search className="h-4 w-4 mr-2 animate-spin" />
                        Analyserer profil...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyser min profil
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Overall Score */}
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="md:col-span-1">
                    <CardContent className="p-8 text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
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
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisData.overallScore / 100)}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">
                              {analysisData.overallScore}
                            </div>
                            <div className="text-sm text-gray-500">af 100</div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Samlet Score
                      </h3>
                      <p className="text-sm text-gray-600">
                        Din profil er bedre end 68% af danske profiler
                      </p>
                    </CardContent>
                  </Card>

                  <div className="md:col-span-2">
                    {analysisData.overallScore < 60 && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          <strong>Kritiske områder der kræver opmærksomhed:</strong>
                          <ul className="mt-2 space-y-1">
                            {analysisData.criticalIssues.map((issue, index) => (
                              <li key={index} className="text-sm">• {issue}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ScoreCard
                        title="Headline"
                        score={analysisData.scores.headline}
                        icon={FileText}
                        suggestions={3}
                      />
                      <ScoreCard
                        title="Summary"
                        score={analysisData.scores.summary}
                        icon={User}
                        suggestions={5}
                      />
                      <ScoreCard
                        title="Erhvervserfaring"
                        score={analysisData.scores.experience}
                        icon={Award}
                        suggestions={2}
                      />
                      <ScoreCard
                        title="Færdigheder"
                        score={analysisData.scores.skills}
                        icon={Target}
                        suggestions={8}
                      />
                      <ScoreCard
                        title="Profilbillede"
                        score={analysisData.scores.photo}
                        icon={Camera}
                        suggestions={1}
                      />
                      <ScoreCard
                        title="Aktivitetsniveau"
                        score={analysisData.scores.activity}
                        icon={Activity}
                        suggestions={4}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Tab 2: Content Optimization */}
          <TabsContent value="content" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Headline Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Headline Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nuværende headline:</p>
                    <p className="font-medium">Software Developer at TechCorp</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Beskriv din rolle og industri</Label>
                    <Textarea 
                      placeholder="Jeg er en erfaren software udvikler med fokus på web teknologier..."
                      rows={3}
                    />
                  </div>
                  
                  <Button className="w-full">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Generer AI forslag
                  </Button>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-900">AI forslag:</p>
                    {[
                      'Senior Software Developer | React & Node.js Expert | Hjælper danske virksomheder med digital transformation',
                      'Full-Stack Developer | 5+ års erfaring | Specialist i moderne web teknologier og agile metoder',
                      'Software Engineer | Passioneret om clean code | Bygger skalerbare løsninger for danske startups'
                    ].map((suggestion, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="text-sm mb-2">{suggestion}</p>
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4 mr-2" />
                          Brug denne
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Summary Optimizer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Summary Optimizer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nuværende summary:</p>
                    <p className="text-sm">Experienced developer with passion for technology...</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">AI Analyse:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Manglende danske nøgleord</span>
                        <Badge variant="destructive">Kritisk</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Storytelling score</span>
                        <Badge variant="secondary">45/100</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Call-to-action</span>
                        <Badge variant="destructive">Mangler</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Optimer med AI
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Experience Enhancement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Erhvervserfaring Forbedring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Vælg job/erfaring at optimere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Software Developer - TechCorp (2021-nu)</SelectItem>
                    <SelectItem value="previous">Junior Developer - StartupCo (2019-2021)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Nuværende beskrivelse:</h4>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      Developed web applications using React and Node.js. Worked with team to deliver projects on time.
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">AI forbedret version:</h4>
                    <div className="p-3 bg-blue-50 rounded-lg text-sm">
                      • Udviklede 15+ responsive web applikationer med React og Node.js
                      • Reducerede loading tid med 40% gennem performance optimering
                      • Ledede agile team på 4 udviklere og leverede 95% af projekter til tiden
                    </div>
                  </div>
                </div>
                
                <Button>
                  <Copy className="h-4 w-4 mr-2" />
                  Kopier forbedret version
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Network Strategy */}
          <TabsContent value="network" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Connection Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Forbindelses Mål
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Mål forbindelser per uge: {connectionGoal[0]}</Label>
                    <Slider
                      value={connectionGoal}
                      onValueChange={setConnectionGoal}
                      max={50}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Industri fokus:</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['IT', 'Marketing', 'Salg', 'HR', 'Finans', 'Konsulentvirksomhed'].map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox id={industry} />
                          <Label htmlFor={industry} className="text-sm">{industry}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Geografisk fokus:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Vælg by/region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="copenhagen">København</SelectItem>
                        <SelectItem value="aarhus">Aarhus</SelectItem>
                        <SelectItem value="odense">Odense</SelectItem>
                        <SelectItem value="aalborg">Aalborg</SelectItem>
                        <SelectItem value="all">Hele Danmark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Follow-up Strategy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Opfølgnings Strategi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Automatisk opfølgning:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Dag 3: Tak for forbindelse</span>
                        <Badge variant="outline">Aktiv</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Dag 7: Del relevant indhold</span>
                        <Badge variant="outline">Aktiv</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Dag 14: Foreslå møde/kaffe</span>
                        <Badge variant="outline">Aktiv</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Danske forretningskultur tips:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Vær direkte men høflig i din kommunikation</li>
                      <li>• Brug "du" formen i professionelle sammenhænge</li>
                      <li>• Nævn fælles interesser eller forbindelser</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connection Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Forbindelses Besked Skabeloner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connectionTemplates.map((template, index) => (
                    <TemplateCard
                      key={index}
                      title={template.title}
                      message={template.message}
                      scenario={template.scenario}
                      onCopy={() => navigator.clipboard.writeText(template.message)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Results & Tracking */}
          <TabsContent value="results" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Performance Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Performance Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-blue-800">Profil visninger</div>
                      <div className="text-xs text-blue-600">+24% denne uge</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">23</div>
                      <div className="text-sm text-green-800">Nye forbindelser</div>
                      <div className="text-xs text-green-600">+15% denne uge</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Engagement metrics:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Indlæg engagement</span>
                        <span className="font-medium">4.2%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Søgninger</span>
                        <span className="font-medium">89</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Mål Fremgang
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Ugentlige forbindelser</span>
                        <span className="font-medium">18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Månedlige profil visninger</span>
                        <span className="font-medium">156/200</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Engagement rate forbedring</span>
                        <span className="font-medium">4.2/5.0%</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-medium text-green-900">Denne uge's præstation</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Du er på vej til at nå alle dine ugentlige mål! Fortsæt det gode arbejde.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  AI Anbefalinger Baseret på Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Optimale tidspunkter:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span>Din profil får mest trafik på tirsdage</span>
                        <Badge variant="secondary">Tip</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span>Bedste tid at poste: 09:00-11:00</span>
                        <Badge variant="secondary">Tip</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span>Indlæg om teknologi får bedst engagement</span>
                        <Badge variant="secondary">Tip</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Netværk anbefalinger:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                        <span>Tilføj flere forbindelser fra IT</span>
                        <Badge variant="secondary">Handling</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span>Deltag i "Danish Tech Professionals"</span>
                        <Badge variant="secondary">Gruppe</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span>Kommenter mere på andres indlæg</span>
                        <Badge variant="secondary">Engagement</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Eksporter Rapporter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Månedlig rapport
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Performance oversigt
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Forbedringer liste
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}