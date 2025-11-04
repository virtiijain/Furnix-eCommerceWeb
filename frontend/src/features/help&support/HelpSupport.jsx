import SupportOptions from "../help&support/components/SupportOptions";
import ReportIssueForm from "../help&support/components/ReportIssueForm";
import QuickHelpTopics from "../help&support/components/QuickHelpTopics";

const HelpSupport = () => {
  return (
    <section className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Help & Support
        </h2>

        <SupportOptions />
        <ReportIssueForm />
        <QuickHelpTopics />
      </div>
    </section>
  );
};

export default HelpSupport;
