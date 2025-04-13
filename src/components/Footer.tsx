import  { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white dark:bg-gray-800 shadow-md py-3 text-center">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          تم تطويره بـ <Heart className="inline-block h-4 w-4 text-red-500 mx-1" /> - حصن المسلم &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
 