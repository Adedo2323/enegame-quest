import { useState, useEffect } from "react";
import { Sword, Trophy, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface BattleArenaProps {
  onExit: () => void;
}

export function BattleArena({ onExit }: BattleArenaProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [battlePhase, setBattlePhase] = useState<'searching' | 'found' | 'battle' | 'result'>('searching');

  const opponent = {
    name: "Carlos M.",
    avatar: "👨‍🎓",
    rating: 1450,
    streak: 8
  };

  useEffect(() => {
    if (battlePhase === 'searching') {
      const timer = setTimeout(() => setBattlePhase('found'), 2000);
      return () => clearTimeout(timer);
    }
    
    if (battlePhase === 'found') {
      const timer = setTimeout(() => setBattlePhase('battle'), 1500);
      return () => clearTimeout(timer);
    }

    if (battlePhase === 'battle' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    }

    if (currentQuestion > 5) {
      setBattlePhase('result');
    }
  }, [battlePhase, timeLeft, currentQuestion]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setMyScore(myScore + 1);
    }
    // Simulate opponent answering
    if (Math.random() > 0.4) {
      setOpponentScore(opponentScore + 1);
    }
    
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setBattlePhase('result');
    }
  };

  if (battlePhase === 'searching') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="animate-spin w-16 h-16 mx-auto">
            <Sword className="w-16 h-16 text-accent" />
          </div>
          <h2 className="text-2xl font-bold">Procurando adversário...</h2>
          <p className="text-muted-foreground">Conectando com outro estudante do seu nível</p>
          <Button variant="outline" onClick={onExit}>Cancelar</Button>
        </div>
      </div>
    );
  }

  if (battlePhase === 'found') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 animate-bounce-in">
          <div className="text-6xl">{opponent.avatar}</div>
          <h2 className="text-2xl font-bold">Adversário encontrado!</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-lg">{opponent.name}</h3>
            <p className="text-muted-foreground">Rating: {opponent.rating}</p>
            <p className="text-accent">🔥 {opponent.streak} dias de sequência</p>
          </div>
          <p className="text-primary font-semibold">Preparando batalha...</p>
        </div>
      </div>
    );
  }

  if (battlePhase === 'result') {
    const isWinner = myScore > opponentScore;
    const isDraw = myScore === opponentScore;
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 animate-bounce-in">
          <div className="text-6xl">
            {isWinner ? "🏆" : isDraw ? "🤝" : "😔"}
          </div>
          <h2 className="text-3xl font-bold">
            {isWinner ? "Vitória!" : isDraw ? "Empate!" : "Derrota"}
          </h2>
          
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{myScore}</p>
                <p className="text-sm text-muted-foreground">Você</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl">⚔️</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{opponentScore}</p>
                <p className="text-sm text-muted-foreground">{opponent.name}</p>
              </div>
            </div>
            
            {isWinner && (
              <div className="space-y-2">
                <p className="text-success font-semibold">+25 XP</p>
                <p className="text-warning font-semibold">+10 Moedas</p>
                <p className="text-accent">Sequência mantida! 🔥</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button onClick={onExit} className="bg-gradient-primary">
              Voltar ao Dashboard
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Nova Batalha
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Battle phase
  const mockQuestion = {
    statement: "Qual é o resultado de 2x + 5 = 15?",
    alternatives: ["x = 3", "x = 5", "x = 7", "x = 10"],
    correct: 1
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Battle Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{myScore}</p>
                <p className="text-sm text-muted-foreground">Você</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sword className="w-6 h-6 text-accent" />
                <span className="text-lg font-bold">{currentQuestion}/5</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{opponentScore}</p>
                <p className="text-sm text-muted-foreground">{opponent.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-accent/10 px-3 py-2 rounded-full">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-bold text-accent">{timeLeft}s</span>
            </div>
          </div>
          
          <Progress value={(currentQuestion - 1) * 20} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">{mockQuestion.statement}</h3>
          
          <div className="space-y-3">
            {mockQuestion.alternatives.map((alt, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 hover:border-primary hover:bg-primary/5"
                onClick={() => handleAnswer(index === mockQuestion.correct)}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {alt}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}