import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NewsProvider } from './context/NewsContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Header from './components/Header/Header';
import NewsGrid from './components/NewsGrid/NewsGrid';
import BookmarkSidebar from './components/Sidebar/BookmarkSidebar';
import ArticleModal from './components/Modal/ArticleModal';
import Toast from './components/UI/Toast';
import FloatingButtons from './components/UI/FloatingButtons';
import BackgroundAnimation from './components/UI/BackgroundAnimation';
import { useToast } from './hooks/useToast';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <ThemeProvider>
      <NewsProvider>
        <BookmarkProvider>
          <div className="app-container min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <BackgroundAnimation />
            
            <Header 
              onBookmarksClick={() => setSidebarOpen(true)} 
              showToast={showToast}
            />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
              <NewsGrid showToast={showToast} />
            </main>
            
            <BookmarkSidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
              showToast={showToast}
            />
            
            <ArticleModal showToast={showToast} />
            
            <FloatingButtons 
              onBookmarksClick={() => setSidebarOpen(true)} 
            />
            
            {toast && (
              <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={hideToast} 
              />
            )}
          </div>
        </BookmarkProvider>
      </NewsProvider>
    </ThemeProvider>
  );
}

export default App;
