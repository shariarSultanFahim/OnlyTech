import useDocumentTitle from "../../../CustomHooks/useDocumentTitle";

const ReportedContent = () => {
    useDocumentTitle('Reported Content')
    return (
        <div>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl">Reports</h1>
            </div>
        </div>
    );
};

export default ReportedContent;