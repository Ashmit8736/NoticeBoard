import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex flex-col">
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight group-hover:from-indigo-600 group-hover:to-blue-500 transition-all duration-300">
                Notice Board
              </h1>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                Reno Platforms
              </p>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {children}
      </main>
      
      <footer className="border-t border-slate-200/50 mt-auto py-8 text-center relative z-10">

        <p className="text-sm text-slate-500 font-medium mt-2">
          &copy; {new Date().getFullYear()} All Copyrights Reserved by{" "}
          <a
            href="https://github.com/ashmit8736"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-500 hover:text-indigo-600 font-bold transition-colors cursor-pointer"
          >
            ashmit8736
          </a>
        </p>
      </footer>
    </div>
  );
}