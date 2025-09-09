import { Clock, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DailyMissionProps {
  mission: {
    title: string;
    description: string;
    progress: number;
    target: number;
    xpReward: number;
    timeLeft: string;
    isCompleted: boolean;
  };
  onStart: () => void;
}

export function DailyMission({ mission, onStart }: DailyMissionProps) {
  const progressPercentage = (mission.progress / mission.target) * 100;

  return (
    <div className="bg-gradient-primary p-6 rounded-xl shadow-medium text-primary-foreground">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
          <p className="text-primary-foreground/80 text-sm mb-4">
            {mission.description}
          </p>
        </div>
        <div className="flex items-center space-x-1 bg-primary-foreground/20 px-2 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-semibold">{mission.timeLeft}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span className="font-semibold">{mission.progress}/{mission.target}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-primary-foreground/20"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">+{mission.xpReward} XP</span>
          </div>

          {mission.isCompleted ? (
            <Button 
              variant="secondary" 
              size="sm" 
              disabled
              className="bg-success text-success-foreground"
            >
              ✓ Concluído
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={onStart}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Target className="w-4 h-4 mr-1" />
              Começar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}