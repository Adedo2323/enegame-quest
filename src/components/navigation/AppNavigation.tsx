import { Home, BookOpen, Trophy, Users, Target, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppNavigationProps {
  currentView: 'login' | 'dashboard' | 'question' | 'battle' | 'ranking' | 'simulation';
  onNavigate: (view: 'login' | 'dashboard' | 'question' | 'battle' | 'ranking' | 'simulation') => void;
  user: any;
}

export function AppNavigation({ currentView, onNavigate, user }: AppNavigationProps) {
  const navigationItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'question' as const, label: 'Questões', icon: BookOpen },
    { id: 'battle' as const, label: 'Batalhas', icon: Trophy },
    { id: 'ranking' as const, label: 'Ranking', icon: Users },
    { id: 'simulation' as const, label: 'Simulado', icon: Target },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:hidden z-30">
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}