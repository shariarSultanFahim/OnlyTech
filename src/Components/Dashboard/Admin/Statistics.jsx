import useDocumentTitle from "../../../CustomHooks/useDocumentTitle";

const Statistics = () => {
    useDocumentTitle('Statistics');
    return (
        <div>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl">Statistics</h1>
            </div>
            Statistics
        </div>
    );
};

export default Statistics;