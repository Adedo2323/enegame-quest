import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RankingBoardProps {
  onBack: () => void;
}

export function RankingBoard({ onBack }: RankingBoardProps) {
  const globalRanking = [
    { rank: 1, name: "Maria Santos", xp: 5420, streak: 28, avatar: "👩‍🎓", isCurrentUser: false },
    { rank: 2, name: "João Silva", xp: 5180, streak: 24, avatar: "👨‍💼", isCurrentUser: false },
    { rank: 3, name: "Ana Costa", xp: 4950, streak: 31, avatar: "👩‍💻", isCurrentUser: false },
    { rank: 4, name: "Pedro Lima", xp: 4720, streak: 18, avatar: "👨‍🎓", isCurrentUser: false },
    { rank: 5, name: "Carla Rocha", xp: 4580, streak: 22, avatar: "👩‍🏫", isCurrentUser: false },
    { rank: 127, name: "Ana Silva", xp: 2450, streak: 12, avatar: "👩‍🎓", isCurrentUser: true },
  ];

  const weeklyRanking = [
    { rank: 1, name: "Carlos M.", xp: 850, streak: 7, avatar: "👨‍🎓", isCurrentUser: false },
    { rank: 2, name: "Ana Silva", xp: 820, streak: 12, avatar: "👩‍🎓", isCurrentUser: true },
    { rank: 3, name: "Bruno K.", xp: 780, streak: 5, avatar: "👨‍💼", isCurrentUser: false },
    { rank: 4, name: "Lucia P.", xp: 720, streak: 9, avatar: "👩‍💻", isCurrentUser: false },
    { rank: 5, name: "Diego S.", xp: 680, streak: 6, avatar: "👨‍🎨", isCurrentUser: false },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const RankingList = ({ data, title }: { data: typeof globalRanking, title: string }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <div className="space-y-2">
        {data.map((user, index) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
              user.isCurrentUser
                ? "border-primary bg-primary/5 shadow-medium"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center space-x-4">
              {getRankIcon(user.rank)}
              <div className="text-2xl">{user.avatar}</div>
              <div>
                <p className={`font-semibold ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                  {user.name} {user.isCurrentUser && "(Você)"}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{user.xp} XP</span>
                  <span className="text-accent">🔥 {user.streak} dias</span>
                </div>
              </div>
            </div>
            
            {user.isCurrentUser && (
              <div className="text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Ranking
            </h1>
            <p className="text-muted-foreground">Veja como você está se saindo!</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>

        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Ranking Global</TabsTrigger>
            <TabsTrigger value="weekly">Ranking Semanal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global">
            <RankingList data={globalRanking} title="Os melhores estudantes de todos os tempos" />
          </TabsContent>
          
          <TabsContent value="weekly">
            <RankingList data={weeklyRanking} title="Os melhores da semana" />
          </TabsContent>
        </Tabs>

        {/* User Stats Summary */}
        <div className="mt-8 bg-gradient-primary p-6 rounded-xl text-primary-foreground">
          <h3 className="font-bold text-lg mb-4">Suas Estatísticas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">127°</p>
              <p className="text-sm opacity-80">Posição Global</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">2°</p>
              <p className="text-sm opacity-80">Posição Semanal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">2,450</p>
              <p className="text-sm opacity-80">Total XP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm opacity-80">Sequência</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}