import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import NoticeForm from "../../../components/NoticeForm";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNotice = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/notices/${id}`);
        const data = await res.json();

        if (data.success) {
          setNotice(data.notice);
        } else {
          alert(data.message || "Notice not found");
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch notice");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id, router]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Notice</h2>
        <p className="text-gray-500 mb-6">Update the selected notice.</p>

        {loading ? (
          <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
            Loading notice...
          </div>
        ) : notice ? (
          <NoticeForm mode="edit" initialData={notice} noticeId={id} />
        ) : null}
      </div>
    </Layout>
  );
}