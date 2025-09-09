import { TrendingUp, Target, Calendar, Award } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    weeklyXP: number;
    weeklyGoal: number;
    currentStreak: number;
    longestStreak: number;
    totalStudyHours: number;
    questionsAnswered: number;
    averageAccuracy: number;
    rank: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const weeklyProgress = (stats.weeklyXP / stats.weeklyGoal) * 100;

  const statCards = [
    {
      title: "XP Semanal",
      value: stats.weeklyXP,
      target: stats.weeklyGoal,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      showProgress: true,
      progress: weeklyProgress
    },
    {
      title: "Sequência Atual",
      value: stats.currentStreak,
      subtitle: `Melhor: ${stats.longestStreak} dias`,
      icon: Target,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Horas de Estudo",
      value: stats.totalStudyHours,
      subtitle: "Este mês",
      icon: Calendar,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Ranking",
      value: `#${stats.rank}`,
      subtitle: `${stats.averageAccuracy}% precisão`,
      icon: Award,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-smooth">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            )}
            {stat.target && (
              <p className="text-xs text-muted-foreground">de {stat.target}</p>
            )}
          </div>

          {stat.showProgress && (
            <div className="mt-3 space-y-1">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-gradient-primary h-1.5 rounded-full transition-all duration-500 animate-fill-progress"
                  style={{ width: `${Math.min(stat.progress || 0, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}