import  { Book } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl">
      <img 
        src="https://images.unsplash.com/photo-1601191362988-ac6ebec629c8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwwfHx8fDE3NDM2MzM1NTN8MA&ixlib=rb-4.0.3"
        alt="مسجد أبيض مع قبة"
        className="w-full h-[300px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/70 flex flex-col justify-center px-8 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center mb-4">
            <Book className="h-8 w-8 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">حصن المسلم</h1>
          </div>
          <p className="text-lg md:text-xl opacity-90">
            مجموعة من الأذكار والأدعية الصحيحة من السنة النبوية لتحصين المسلم في حياته اليومية
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
 