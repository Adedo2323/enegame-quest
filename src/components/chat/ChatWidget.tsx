import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  isLoggedIn: boolean;
}

export function ChatWidget({ isLoggedIn }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Olá! Sou sua assistente de estudos do ENEM. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        'Essa é uma excelente pergunta! Para resolver questões de matemática do ENEM, recomendo focar nos conceitos fundamentais primeiro.',
        'Sobre redação do ENEM, é importante praticar a estrutura: introdução, desenvolvimento e conclusão com proposta de intervenção.',
        'Para ciências da natureza, sugiro revisar os conceitos de física, química e biologia de forma integrada.',
        'Em ciências humanas, foque nos eventos históricos do Brasil e suas relações com a geografia e sociologia.',
        'Para linguagens, pratique interpretação de texto e análise de diferentes gêneros textuais.',
        'Que tal fazer um simulado para testar seus conhecimentos? Posso te indicar o melhor caminho!'
      ];

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary shadow-strong hover:shadow-medium transition-all duration-300 z-50"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 shadow-strong z-40 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-primary rounded-t-xl">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary-foreground" />
              <h3 className="font-semibold text-primary-foreground">Assistente ENEM</h3>
            </div>
            <p className="text-xs text-primary-foreground/80">Tire suas dúvidas sobre estudos</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 opacity-70" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-0.5 opacity-70" />}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="bg-gradient-primary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}