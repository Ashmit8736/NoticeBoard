import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import NoticeCard from "../components/NoticeCard";

export default function HomePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notices");
      const data = await res.json();

      if (data.success) {
        setNotices(data.notices);
      }
    } catch (error) {
      console.error("Fetch notices error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(
    (notice) => activeFilter === "All" || notice.category === activeFilter
  );

  const categories = ["All", "Exam", "Event", "General"];

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Live Updates
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Dashboard
            {!loading && notices.length > 0 && (
              <span className="text-lg bg-slate-200/60 text-slate-600 px-3 py-0.5 rounded-full font-bold shadow-sm">
                {notices.length}
              </span>
            )}
          </h2>
          <p className="text-slate-500 text-base font-medium max-w-xl">
            Create, manage, and view important notices for your institution. Urgent notices are automatically pinned.
          </p>
        </div>

        <Link
          href="/notices/new"
          className="group relative inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 w-full h-full -ml-10 bg-white/20 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out skew-x-[-20deg]" />
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Create Notice
        </Link>
      </div>

      {!loading && notices.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl border border-slate-200/60 p-6 h-[300px]">
              <div className="flex justify-between">
                <div className="h-6 bg-slate-200 rounded-md w-1/2 mb-4"></div>
                <div className="h-6 bg-slate-200 rounded-full w-16 mb-4"></div>
              </div>
              <div className="flex gap-2 mb-5">
                <div className="h-5 bg-slate-100 rounded-md w-16"></div>
                <div className="h-5 bg-slate-100 rounded-md w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : notices.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No notices found</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">Get started by creating your first notice. It will appear here and be visible to everyone.</p>
          <Link
            href="/notices/new"
            className="cursor-pointer inline-flex items-center justify-center px-6 py-3 font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            Create your first notice
          </Link>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-16 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No {activeFilter} notices</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">There are no notices matching the selected category.</p>
          <button
            onClick={() => setActiveFilter("All")}
            className="cursor-pointer inline-flex items-center justify-center px-6 py-3 font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            Show All Notices
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              refreshNotices={fetchNotices}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}