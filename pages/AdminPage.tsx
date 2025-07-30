

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAudits } from '../contexts/AuditContext';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeOffIcon, Trash2Icon } from '../components/Icons';

export const AdminPage: React.FC = () => {
    const { audits, toggleVisibility, deleteAudit } = useAudits();
    const { is2FAEnabled, disable2FA } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const handle2FAToggle = () => {
        if (is2FAEnabled) {
            if (window.confirm('Are you sure you want to disable 2FA? This will remove the extra layer of security from your account.')) {
                disable2FA();
            }
        } else {
            navigate('/setup-2fa');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <ReactRouterDOM.Link to="/submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                    New Audit
                </ReactRouterDOM.Link>
            </div>

            <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">Two-Factor Authentication (2FA)</h2>
                    <p className="text-sm text-gray-400">
                        {is2FAEnabled ? "2FA is currently enabled for your account." : "Add an extra layer of security to your account."}
                    </p>
                </div>
                <button
                    onClick={handle2FAToggle}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex-shrink-0 ${
                        is2FAEnabled
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Grade</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {audits.map(audit => (
                            <tr key={audit.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ReactRouterDOM.Link to={`/report/${audit.id}`} className="text-sm font-medium text-indigo-400 hover:text-indigo-300">{audit.projectName}</ReactRouterDOM.Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 truncate" style={{ maxWidth: '150px' }}>{audit.userId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-300">{audit.grade}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(audit.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => toggleVisibility(audit.id)} className="text-gray-400 hover:text-white transition-colors" title={audit.isPublic ? 'Make Private' : 'Make Public'}>
                                            {audit.isPublic ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                                        </button>
                                        <button onClick={() => deleteAudit(audit.id)} className="text-red-500 hover:text-red-400 transition-colors" title="Delete Audit">
                                            <Trash2Icon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {audits.length === 0 && (
                     <div className="text-center py-16 text-gray-500">No audits found in the system.</div>
                 )}
            </div>
        </div>
    );
};