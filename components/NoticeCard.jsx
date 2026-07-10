import Link from "next/link";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function NoticeCard({ notice, refreshNotices }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const res = await fetch(`/api/notices/${notice.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        refreshNotices();
      } else {
        alert(data.message || "Failed to delete notice");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col h-full bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />

        <div className="relative z-10 p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
              {notice.title}
            </h2>

            {notice.priority === "Urgent" && (
              <span className="flex-shrink-0 animate-pulse bg-red-100/80 text-red-600 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-red-200/50 shadow-sm backdrop-blur-sm">
                Urgent
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50/80 text-indigo-700 border border-indigo-100/50 backdrop-blur-sm">
              {notice.category}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/60 text-slate-600 border border-white/60 backdrop-blur-sm">
              {notice.priority}
            </span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line line-clamp-4">
            {notice.body}
          </p>

          <div className="mt-5 pt-4 border-t border-white/60 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Publish: {new Date(notice.publishDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {notice.image && (
            <div className="mt-5 rounded-xl overflow-hidden shadow-sm border border-white/50">
              <img
                src={notice.image}
                alt={notice.title}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          )}
          
          <div className="mt-auto pt-6 flex gap-3">
            <Link
              href={`/notices/${notice.id}/edit`}
              className="cursor-pointer flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-amber-500/10 text-amber-700 font-bold text-sm hover:bg-amber-500 hover:text-white transition-colors duration-200 backdrop-blur-sm"
            >
              Edit
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-red-50/80 text-red-600 font-bold text-sm hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 backdrop-blur-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </>
  );
}