import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface QuestionCardProps {
  question: {
    id: string;
    subject: string;
    year: number;
    difficulty: "easy" | "medium" | "hard";
    statement: string;
    alternatives: string[];
    correctAnswer: number;
    explanation: string;
    topic: string;
  };
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswer: (selectedAnswer: number, isCorrect: boolean) => void;
  onNext: () => void;
  showResult?: boolean;
  selectedAnswer?: number;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  onAnswer,
  onNext,
  showResult = false,
  selectedAnswer
}: QuestionCardProps) {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(selectedAnswer ?? null);
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setLocalSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === question.correctAnswer;
    onAnswer(answerIndex, isCorrect);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "text-success bg-success/10",
      medium: "text-warning bg-warning/10", 
      hard: "text-error bg-error/10"
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: "Fácil",
      medium: "Médio",
      hard: "Difícil"
    };
    return labels[difficulty as keyof typeof labels] || "Médio";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-medium">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-muted-foreground">
              Questão {questionNumber} de {totalQuestions}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyLabel(question.difficulty)}
            </span>
            <span className="text-sm text-muted-foreground">
              {question.subject} • {question.year} • {question.topic}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-accent">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <p className="text-foreground leading-relaxed text-lg">
            {question.statement}
          </p>
        </div>

        {/* Alternatives */}
        <div className="space-y-3">
          {question.alternatives.map((alternative, index) => {
            const isSelected = localSelectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const isWrong = showResult && isSelected && !isCorrect;
            const shouldHighlight = showResult && isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                  isSelected && !showResult
                    ? "border-primary bg-primary/5"
                    : shouldHighlight
                    ? "border-success bg-success/10"
                    : isWrong
                    ? "border-error bg-error/10"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-start space-x-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                    shouldHighlight
                      ? "border-success bg-success text-success-foreground"
                      : isWrong
                      ? "border-error bg-error text-error-foreground"
                      : isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-foreground">{alternative}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                  {showResult && isWrong && (
                    <AlertCircle className="w-5 h-5 text-error" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Explicação:</h4>
            <p className="text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <div className="mt-6 flex justify-end">
            <Button onClick={onNext} className="bg-gradient-primary">
              {questionNumber === totalQuestions ? "Finalizar" : "Próxima"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}