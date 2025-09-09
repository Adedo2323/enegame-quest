import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, BookOpen } from "lucide-react";

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    icon: string;
    color: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    questionsAnswered: number;
    accuracy: number;
    estimatedTime: string;
  };
  onStart: (subjectId: string) => void;
}

export function SubjectCard({ subject, onStart }: SubjectCardProps) {
  const getSubjectIcon = (icon: string) => {
    const iconMap: Record<string, string> = {
      "linguagens": "📚",
      "matematica": "🔢", 
      "natureza": "🧬",
      "humanas": "🌍",
      "redacao": "✍️"
    };
    return iconMap[icon] || "📖";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-medium transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
            {getSubjectIcon(subject.icon)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{subject.name}</h3>
            <p className="text-muted-foreground text-sm">
              {subject.completedLessons}/{subject.totalLessons} aulas
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1 text-success text-sm font-semibold">
            <Trophy className="w-3 h-3" />
            <span>{subject.accuracy}%</span>
          </div>
          <p className="text-muted-foreground text-xs">{subject.questionsAnswered} questões</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold text-foreground">{subject.progress}%</span>
          </div>
          <Progress 
            value={subject.progress} 
            className="h-2"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <Clock className="w-3 h-3" />
            <span>{subject.estimatedTime}</span>
          </div>

          <Button 
            size="sm" 
            onClick={() => onStart(subject.id)}
            className="bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Estudar
          </Button>
        </div>
      </div>
    </div>
  );
}