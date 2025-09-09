import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DailyMission } from "@/components/dashboard/DailyMission";
import { SubjectCard } from "@/components/dashboard/SubjectCard";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { BattleArena } from "@/components/battles/BattleArena";
import { RankingBoard } from "@/components/ranking/RankingBoard";
import { SimulationTest } from "@/components/simulation/SimulationTest";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Sword, Users, TrendingUp } from "lucide-react";

// Mock data
const mockUser = {
  name: "Ana Silva",
  xp: 2450,
  streak: 12,
  coins: 380
};

const mockDailyMission = {
  title: "Missão do Dia",
  description: "Complete 5 questões de Matemática para ganhar XP extra!",
  progress: 3,
  target: 5,
  xpReward: 50,
  timeLeft: "14h 32m",
  isCompleted: false
};

const mockSubjects = [
  {
    id: "linguagens",
    name: "Linguagens",
    icon: "linguagens",
    color: "blue",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    questionsAnswered: 156,
    accuracy: 84,
    estimatedTime: "15 min"
  },
  {
    id: "matematica", 
    name: "Matemática",
    icon: "matematica",
    color: "green",
    progress: 62,
    totalLessons: 32,
    completedLessons: 20,
    questionsAnswered: 203,
    accuracy: 78,
    estimatedTime: "20 min"
  },
  {
    id: "natureza",
    name: "Ciências da Natureza",
    icon: "natureza", 
    color: "purple",
    progress: 45,
    totalLessons: 28,
    completedLessons: 13,
    questionsAnswered: 98,
    accuracy: 82,
    estimatedTime: "18 min"
  },
  {
    id: "humanas",
    name: "Ciências Humanas",
    icon: "humanas",
    color: "orange", 
    progress: 68,
    totalLessons: 26,
    completedLessons: 18,
    questionsAnswered: 167,
    accuracy: 88,
    estimatedTime: "12 min"
  },
  {
    id: "redacao",
    name: "Redação",
    icon: "redacao",
    color: "red",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    questionsAnswered: 45,
    accuracy: 90,
    estimatedTime: "25 min"
  }
];

const mockStats = {
  weeklyXP: 850,
  weeklyGoal: 1200,
  currentStreak: 12,
  longestStreak: 28,
  totalStudyHours: 24,
  questionsAnswered: 669,
  averageAccuracy: 84,
  rank: 127
};

const mockQuestion = {
  id: "q1",
  subject: "Matemática",
  year: 2023,
  difficulty: "medium" as const,
  statement: "Em uma progressão aritmética, o primeiro termo é 3 e a razão é 5. Qual é o valor do décimo termo?",
  alternatives: [
    "38",
    "43", 
    "48",
    "53",
    "58"
  ],
  correctAnswer: 2,
  explanation: "Em uma PA, o termo geral é dado por an = a1 + (n-1)r. Substituindo: a10 = 3 + (10-1)×5 = 3 + 45 = 48.",
  topic: "Progressões"
};

export default function Index() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'question' | 'battle' | 'ranking' | 'simulation'>('login');
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleStartMission = () => {
    setCurrentView('question');
  };

  const handleStartSubject = () => {
    setCurrentView('question');
  };

  const handleStartBattle = () => {
    setCurrentView('battle');
  };

  const handleShowRanking = () => {
    setCurrentView('ranking');
  };

  const handleStartSimulation = () => {
    setCurrentView('simulation');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setShowQuestionResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: number, isCorrect: boolean) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      setShowQuestionResult(true);
    }, 500);
  };

  const handleNextQuestion = () => {
    setCurrentView('dashboard');
    setShowQuestionResult(false);
    setSelectedAnswer(null);
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  // Login screen
  if (currentView === 'login' || !currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Battle Arena
  if (currentView === 'battle') {
    return <BattleArena onExit={handleBackToDashboard} />;
  }

  // Ranking Board
  if (currentView === 'ranking') {
    return <RankingBoard onBack={handleBackToDashboard} />;
  }

  // Simulation Test
  if (currentView === 'simulation') {
    return <SimulationTest onExit={handleBackToDashboard} />;
  }

  if (currentView === 'question') {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={currentUser} onLogout={() => setCurrentView('login')} />
        <div className="p-4 lg:p-8">
          <QuestionCard
            question={mockQuestion}
            questionNumber={1}
            totalQuestions={5}
            timeRemaining={180}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            showResult={showQuestionResult}
            selectedAnswer={selectedAnswer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <main className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Olá, {currentUser.name}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Pronto para conquistar o ENEM 2025?
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={mockStats} />

        {/* Daily Mission */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Missão de Hoje</h2>
          <DailyMission mission={mockDailyMission} onStart={handleStartMission} />
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-16 flex items-center justify-center space-x-3 hover:border-accent hover:bg-accent/5"
            onClick={handleStartBattle}
          >
            <Sword className="w-6 h-6 text-accent" />
            <div className="text-center">
              <p className="font-semibold">Batalha 1x1</p>
              <p className="text-xs text-muted-foreground">Desafie outros estudantes</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-16 flex items-center justify-center space-x-3 hover:border-secondary hover:bg-secondary/5"
            onClick={handleShowRanking}
          >
            <Users className="w-6 h-6 text-secondary" />
            <div className="text-center">
              <p className="font-semibold">Ranking</p>
              <p className="text-xs text-muted-foreground">Veja sua posição</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-16 flex items-center justify-center space-x-3 hover:border-warning hover:bg-warning/5"
            onClick={handleStartSimulation}
          >
            <TrendingUp className="w-6 h-6 text-warning" />
            <div className="text-center">
              <p className="font-semibold">Simulado</p>
              <p className="text-xs text-muted-foreground">Teste completo</p>
            </div>
          </Button>
        </section>

        {/* Subjects */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Suas Matérias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSubjects.map((subject) => (
              <SubjectCard 
                key={subject.id} 
                subject={subject} 
                onStart={handleStartSubject}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}