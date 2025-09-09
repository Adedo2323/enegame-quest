import { useState, useEffect } from "react";
import { Clock, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/questions/QuestionCard";

interface SimulationTestProps {
  onExit: () => void;
}

export function SimulationTest({ onExit }: SimulationTestProps) {
  const [phase, setPhase] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5 * 60 * 60); // 5 hours in seconds
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(180).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  const mockQuestions = Array.from({ length: 180 }, (_, i) => ({
    id: `q${i + 1}`,
    subject: ["Linguagens", "Matemática", "Ciências da Natureza", "Ciências Humanas"][i % 4],
    year: 2023,
    difficulty: ["easy", "medium", "hard"][i % 3] as "easy" | "medium" | "hard",
    statement: `Esta é a questão ${i + 1} do simulado. Escolha a alternativa correta.`,
    alternatives: [
      "Alternativa A - Esta é uma opção possível",
      "Alternativa B - Esta é outra opção", 
      "Alternativa C - Mais uma alternativa",
      "Alternativa D - Penúltima opção",
      "Alternativa E - Última alternativa"
    ],
    correctAnswer: Math.floor(Math.random() * 5),
    explanation: `Explicação detalhada da questão ${i + 1}. Esta é a resposta correta porque...`,
    topic: "Tópico Exemplo"
  }));

  useEffect(() => {
    if (phase === 'test' && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
    
    if (timeRemaining === 0 && phase === 'test') {
      setPhase('result');
    }
  }, [timeRemaining, phase]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionIndex: number, selectedAnswer: number, isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[questionIndex] = isCorrect;
    setCorrectAnswers(newCorrectAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setPhase('result');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalAnswered = answers.filter(a => a !== null).length;
    const totalCorrect = correctAnswers.filter(Boolean).length;
    const accuracy = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;
    
    return {
      totalQuestions: mockQuestions.length,
      totalAnswered,
      totalCorrect,
      accuracy: Math.round(accuracy),
      estimatedScore: Math.round((totalCorrect / mockQuestions.length) * 1000)
    };
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-6 text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Simulado ENEM 2025</h1>
            <p className="text-muted-foreground text-lg">
              Teste completo com 180 questões - simule a experiência real do ENEM
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-lg">Informações Importantes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>5 horas de duração</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>180 questões</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Pode navegar entre questões</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-error" />
                <span>Não pode pausar o cronômetro</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => setPhase('test')}
              className="w-full h-12 bg-gradient-primary text-lg font-semibold"
            >
              Iniciar Simulado
            </Button>
            <Button variant="outline" onClick={onExit}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-success rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Simulado Finalizado!</h1>
              <p className="text-muted-foreground">Confira seu desempenho</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-3xl font-bold text-primary">{results.totalCorrect}</p>
                <p className="text-sm text-muted-foreground">Acertos</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-3xl font-bold text-accent">{results.accuracy}%</p>
                <p className="text-sm text-muted-foreground">Precisão</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-3xl font-bold text-warning">{results.estimatedScore}</p>
                <p className="text-sm text-muted-foreground">Nota Estimada</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-3xl font-bold text-secondary">{results.totalAnswered}</p>
                <p className="text-sm text-muted-foreground">Respondidas</p>
              </div>
            </div>

            <div className="bg-gradient-primary p-6 rounded-xl text-primary-foreground">
              <h3 className="font-bold text-lg mb-4">Recompensas Ganhas</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">+150 XP</p>
                  <p className="text-sm opacity-80">Experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">+25 💰</p>
                  <p className="text-sm opacity-80">Moedas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">🏆</p>
                  <p className="text-sm opacity-80">Conquista</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={onExit} className="bg-gradient-primary">
                Voltar ao Dashboard
              </Button>
              <Button variant="outline">
                Ver Correção Detalhada
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test phase
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-bold text-lg">Simulado ENEM</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Questão {currentQuestion + 1} de {mockQuestions.length}</span>
              <span>•</span>
              <span>{answeredCount} respondidas</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-semibold text-accent">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onExit}>
              Finalizar
            </Button>
          </div>
        </div>
        
        <Progress value={progress} className="h-1 mt-3" />
      </div>

      {/* Question */}
      <div className="p-6">
        <QuestionCard
          question={mockQuestions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={mockQuestions.length}
          timeRemaining={timeRemaining}
          onAnswer={(answer, isCorrect) => handleAnswer(currentQuestion, answer, isCorrect)}
          onNext={handleNext}
          showResult={false}
          selectedAnswer={answers[currentQuestion]}
        />

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-6 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Anterior
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {mockQuestions.length}
            </span>
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-primary"
          >
            {currentQuestion === mockQuestions.length - 1 ? "Finalizar" : "Próxima"}
          </Button>
        </div>
      </div>
    </div>
  );
}