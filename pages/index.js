import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import NoticeCard from "../components/NoticeCard";

export default function HomePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchNotices = useCallback(async (pageNum = 1, search = searchQuery, reset = false) => {
    try {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "6",
      });

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const res = await fetch(`/api/notices?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        if (reset) {
          setNotices(data.notices);
        } else {
          setNotices((prev) => [...prev, ...data.notices]);
        }
        setHasMore(data.pagination.hasMore);
        setTotalCount(data.pagination.totalCount);
      }
    } catch (error) {
      console.error("Fetch notices error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      setPage(1);
      fetchNotices(1, searchQuery, true);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchNotices]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotices(nextPage, searchQuery, false);
    }
  };

  const filteredNotices = notices.filter(
    (notice) => activeFilter === "All" || notice.category === activeFilter
  );

  const categories = ["All", "Exam", "Event", "General"];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
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
            {!loading && (
              <span className="text-lg bg-slate-200/60 text-slate-600 px-3 py-0.5 rounded-full font-bold shadow-sm">
                {totalCount}
              </span>
            )}
          </h2>
          <p className="text-slate-500 text-base font-medium max-w-xl">
            Create, manage, and view important notices for your institution. Urgent notices are automatically pinned.
          </p>
        </div>

        <Link
          href="/notices/new"
          className="cursor-pointer group relative inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 w-full h-full -ml-10 bg-white/20 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out skew-x-[-20deg]" />
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Create Notice
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
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

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices..."
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 shadow-sm"
          />
        </div>
      </div>

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
          <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
            {searchQuery ? "Try adjusting your search query to find what you're looking for." : "Get started by creating your first notice. It will appear here and be visible to everyone."}
          </p>
          {!searchQuery && (
            <Link
              href="/notices/new"
              className="cursor-pointer inline-flex items-center justify-center px-6 py-3 font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              Create your first notice
            </Link>
          )}
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                refreshNotices={() => fetchNotices(1, searchQuery, true)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 font-bold text-indigo-600 bg-white border-2 border-indigo-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Loading more...
                  </>
                ) : (
                  "Load More Notices"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}