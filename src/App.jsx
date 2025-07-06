import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { NewsProvider } from "./context/NewsContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import Header from "./components/Header/Header";
import NewsGrid from "./components/NewsGrid/NewsGrid";
import BookmarkSidebar from "./components/Sidebar/BookmarkSidebar";
import ArticleModal from "./components/Modal/ArticleModal";
import Toast from "./components/UI/Toast";
import FloatingButtons from "./components/UI/FloatingButtons";
import { useToast } from "./hooks/useToast";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  return (
    <ThemeProvider>
      <NewsProvider>
        <BookmarkProvider>
          <div className="app-container">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Glassmorphism Overlay */}
            {/* <div className="fixed inset-0 -z-5 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"></div> */}

            <Header
              onBookmarksClick={() => setSidebarOpen(true)}
              showToast={showToast}
            />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4"> {/* Updated padding and width */}
              <NewsGrid showToast={showToast} />
            </main>

            <BookmarkSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              showToast={showToast}
            />

            <ArticleModal />

            <FloatingButtons onBookmarksClick={() => setSidebarOpen(true)} />

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
