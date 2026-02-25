import './DataTable.css';
import { FileWarning, Loader2 } from 'lucide-react';

export default function DataTable({ data, loading, error, keyword }) {
    if (loading) {
        return (
            <div className="table-state-container panel">
                <Loader2 className="spinner" size={48} />
                <p>Loading {keyword} data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="table-state-container error panel">
                <FileWarning size={48} />
                <p>{error}</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="table-state-container panel">
                <p>No data found for {keyword}.</p>
            </div>
        );
    }

    // Extract headers dynamically from the first row of data
    const headers = Object.keys(data[0]);

    return (
        <div className="table-container panel">
            <div className="table-header">
                <h2>{keyword} Report</h2>
                <span className="badge">{data.length} records found</span>
            </div>

            <div className="table-scroll">
                <table>
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {headers.map((header) => (
                                    <td key={`${i}-${header}`}>
                                        {row[header] !== null ? row[header] : <span className="null-val">-</span>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
