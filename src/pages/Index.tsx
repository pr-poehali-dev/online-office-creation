import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

type EditorType = 'home' | 'doc' | 'presentation' | 'spreadsheet';

const Index = () => {
  const [activeEditor, setActiveEditor] = useState<EditorType>('home');
  const [docContent, setDocContent] = useState('');
  const [slides, setSlides] = useState([{ id: 1, content: 'Слайд 1' }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [spreadsheetData, setSpreadsheetData] = useState(
    Array(10).fill(null).map(() => Array(8).fill(''))
  );

  const handleSave = () => {
    toast.success('Документ сохранён');
  };

  const handleOpen = () => {
    toast.info('Открытие документа...');
  };

  const handlePrint = () => {
    window.print();
  };

  const addSlide = () => {
    setSlides([...slides, { id: slides.length + 1, content: `Слайд ${slides.length + 1}` }]);
  };

  const updateCell = (row: number, col: number, value: string) => {
    const newData = [...spreadsheetData];
    newData[row][col] = value;
    setSpreadsheetData(newData);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="neon-glow rounded-lg p-2 bg-primary/10">
              <Icon name="Layers" size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold neon-text">OnlineOffice</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleOpen}
              className="hover:bg-primary/20 hover:text-primary transition-all"
            >
              <Icon name="FolderOpen" size={18} className="mr-2" />
              Открыть
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSave}
              className="hover:bg-primary/20 hover:text-primary transition-all"
            >
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrint}
              className="hover:bg-primary/20 hover:text-primary transition-all"
            >
              <Icon name="Printer" size={18} className="mr-2" />
              Печать
            </Button>
          </div>
        </div>
      </header>

      {activeEditor === 'home' && (
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 neon-text">Выберите редактор</h2>
            <p className="text-muted-foreground text-lg">Создавайте документы, презентации и таблицы</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card 
              className="p-8 cursor-pointer hover:border-primary hover:neon-glow transition-all duration-300 bg-card/50 backdrop-blur-sm group"
              onClick={() => setActiveEditor('doc')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:neon-glow transition-all">
                  <Icon name="FileText" size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Документы</h3>
                <p className="text-muted-foreground">Текстовый редактор с форматированием</p>
              </div>
            </Card>

            <Card 
              className="p-8 cursor-pointer hover:border-secondary hover:shadow-[0_0_30px_hsl(var(--secondary))] transition-all duration-300 bg-card/50 backdrop-blur-sm group"
              onClick={() => setActiveEditor('presentation')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_30px_hsl(var(--secondary))] transition-all">
                  <Icon name="Presentation" size={40} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Презентации</h3>
                <p className="text-muted-foreground">Создание слайд-шоу и докладов</p>
              </div>
            </Card>

            <Card 
              className="p-8 cursor-pointer hover:border-accent hover:shadow-[0_0_30px_hsl(var(--accent))] transition-all duration-300 bg-card/50 backdrop-blur-sm group"
              onClick={() => setActiveEditor('spreadsheet')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_30px_hsl(var(--accent))] transition-all">
                  <Icon name="Table" size={40} className="text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Таблицы</h3>
                <p className="text-muted-foreground">Работа с данными и формулами</p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeEditor === 'doc' && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveEditor('home')}
              className="hover:bg-primary/20 hover:text-primary"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <h2 className="text-xl font-semibold">Текстовый редактор</h2>
            <div className="w-20"></div>
          </div>

          <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="Bold" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="Italic" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="Underline" size={18} />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="AlignLeft" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="AlignCenter" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="AlignRight" size={18} />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="List" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                <Icon name="ListOrdered" size={18} />
              </Button>
            </div>
          </Card>

          <Card className="p-8 min-h-[600px] bg-card/50 backdrop-blur-sm">
            <textarea
              className="w-full h-full min-h-[550px] bg-transparent border-none outline-none resize-none text-foreground font-['JetBrains_Mono'] leading-relaxed"
              placeholder="Начните печатать..."
              value={docContent}
              onChange={(e) => setDocContent(e.target.value)}
            />
          </Card>
        </div>
      )}

      {activeEditor === 'presentation' && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveEditor('home')}
              className="hover:bg-secondary/20 hover:text-secondary"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <h2 className="text-xl font-semibold">Редактор презентаций</h2>
            <Button 
              onClick={addSlide}
              className="bg-secondary hover:bg-secondary/80 neon-glow"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить слайд
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="text-sm font-semibold mb-3">Слайды</h3>
              <div className="space-y-2">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`p-3 rounded cursor-pointer transition-all ${
                      activeSlide === index 
                        ? 'bg-secondary/20 border border-secondary neon-glow' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                    onClick={() => setActiveSlide(index)}
                  >
                    <div className="text-xs font-semibold mb-1">Слайд {slide.id}</div>
                    <div className="text-xs text-muted-foreground truncate">{slide.content}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="lg:col-span-3 p-8 min-h-[600px] bg-card/50 backdrop-blur-sm">
              <textarea
                className="w-full h-full min-h-[550px] bg-transparent border-none outline-none resize-none text-foreground font-['JetBrains_Mono'] text-2xl leading-relaxed"
                placeholder="Содержимое слайда..."
                value={slides[activeSlide]?.content || ''}
                onChange={(e) => {
                  const newSlides = [...slides];
                  newSlides[activeSlide].content = e.target.value;
                  setSlides(newSlides);
                }}
              />
            </Card>
          </div>
        </div>
      )}

      {activeEditor === 'spreadsheet' && (
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveEditor('home')}
              className="hover:bg-accent/20 hover:text-accent"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <h2 className="text-xl font-semibold">Табличный редактор</h2>
            <div className="w-20"></div>
          </div>

          <Card className="overflow-auto bg-card/50 backdrop-blur-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border bg-muted/50 p-2 w-12 sticky left-0">#</th>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((col) => (
                    <th key={col} className="border border-border bg-muted/50 p-2 min-w-[120px]">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {spreadsheetData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border border-border bg-muted/50 p-2 text-center sticky left-0 font-semibold">
                      {rowIndex + 1}
                    </td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="border border-border p-0">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                          className="w-full h-full p-2 bg-transparent border-none outline-none focus:bg-accent/10 font-['JetBrains_Mono']"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
