import Layout from "../../components/Layout";
import NoticeForm from "../../components/NoticeForm";

export default function NewNoticePage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Notice</h2>
        <p className="text-gray-500 mb-6">Create a new notice for the board.</p>

        <NoticeForm mode="create" />
      </div>
    </Layout>
  );
}