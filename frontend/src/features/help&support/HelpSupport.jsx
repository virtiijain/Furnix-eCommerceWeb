import SupportOptions from "../help&support/components/SupportOptions";
import ReportIssueForm from "../help&support/components/ReportIssueForm";
import QuickHelpTopics from "../help&support/components/QuickHelpTopics";

const HelpSupport = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-800 text-center sm:text-left">
          Help & Support
        </h2>

        <div className="space-y-8 sm:space-y-10">
          <SupportOptions />
          <ReportIssueForm />
          <QuickHelpTopics />
        </div>
      </div>
    </section>
  );
};

export default HelpSupport;
