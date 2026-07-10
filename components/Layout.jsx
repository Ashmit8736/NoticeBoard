import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#ebf4f5] via-[#b5c6e0] to-[#e8cbf5]">
      
      {/* Decorative Orbs for Mesh Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/40 blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-400/40 blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-400/40 blur-[120px] mix-blend-multiply pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <div className="relative w-full flex flex-col min-h-screen bg-white/40 backdrop-blur-2xl z-10">
        
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-white/40 bg-white/20 backdrop-blur-md">
          <div className="px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between">
              <Link href="/" className="group flex flex-col">
                <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-300">
                  Notice Board
                </h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Reno Platforms
                </p>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow px-6 sm:px-8 lg:px-10 py-10 relative z-10 overflow-y-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-white/40 mt-auto py-6 text-center relative z-10 bg-white/10">
          <p className="text-sm text-slate-600 font-semibold">
            &copy; {new Date().getFullYear()} All Copyrights Reserved by{" "}
            <a
              href="https://github.com/ashmit8736"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              ashmit8736
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}