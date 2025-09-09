import { Trophy, Zap, Coins, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user?: {
    name: string;
    avatar?: string;
    xp: number;
    streak: number;
    coins: number;
  };
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-card border-b border-border px-4 py-3 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-xl text-foreground">ENEM Pro</span>
        </div>

        {/* User Stats - Desktop */}
        {user && (
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1.5 rounded-full">
              <Zap className="w-4 h-4 text-accent animate-pulse-glow" />
              <span className="font-semibold text-accent">{user.streak}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-warning/10 px-3 py-1.5 rounded-full">
              <Coins className="w-4 h-4 text-warning" />
              <span className="font-semibold text-warning">{user.coins}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary">{user.xp} XP</span>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={onLogout}
            >
              <User className="w-4 h-4" />
              <span>{user.name}</span>
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}