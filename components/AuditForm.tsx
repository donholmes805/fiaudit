import React, { useState, useEffect, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ServiceReport, ServiceType, serviceTypeDetails } from '../types';
import { useAudits } from '../contexts/AuditContext';

interface AuditFormProps {
    auditToReaudit?: ServiceReport;
}

export const AuditForm: React.FC<AuditFormProps> = ({ auditToReaudit }) => {
    const navigate = ReactRouterDOM.useNavigate();
    const { submitServiceRequest, loading: isSubmitting } = useAudits();
    
    // State
    const [serviceType, setServiceType] = useState<ServiceType>('SMART_CONTRACT_AUDIT');
    const [details, setDetails] = useState<Record<string, string>>({
        projectName: auditToReaudit?.projectName || '',
        chain: auditToReaudit?.details?.chain || 'EVM',
        contractCode: auditToReaudit?.details?.contractCode || '',
        githubRepo: auditToReaudit?.details?.githubRepo || '',
        websiteUrl: auditToReaudit?.details?.websiteUrl || '',
        documentLinks: auditToReaudit?.details?.documentLinks || '',
        contactEmail: auditToReaudit?.details?.contactEmail || '',
    });

    // Derived state
    const isReaudit = !!(auditToReaudit && auditToReaudit.remainingSubmissions && auditToReaudit.remainingSubmissions > 0);
    
    // Effects
    useEffect(() => {
        if (auditToReaudit) {
            setServiceType(auditToReaudit.serviceType);
        }
    }, [auditToReaudit]);


    // Handlers
    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isSubmitting) return;

        const newReport = await submitServiceRequest(serviceType, details, isReaudit ? auditToReaudit?.id : undefined);
        
        if (newReport) {
            console.log('Service submitted successfully!');
            navigate(`/report/${newReport.id}`);
        } else {
            // Error is handled in context, maybe show a generic message here
            console.error("Submission failed. Check the console for details.");
        }

    }, [
        serviceType, details, isReaudit, auditToReaudit, 
        isSubmitting, navigate, submitServiceRequest
    ]);
    
    const renderInputs = () => {
        switch (serviceType) {
            case 'SMART_CONTRACT_AUDIT':
                return <>
                    <InputField name="projectName" value={details.projectName} onChange={handleDetailChange} label="Project Name" disabled={isReaudit} required/>
                    <SelectField name="chain" value={details.chain} onChange={handleDetailChange} label="Chain" disabled={isReaudit} options={['EVM', 'Solana', 'Fitochain']}/>
                    <TextareaField name="contractCode" value={details.contractCode} onChange={handleDetailChange} label="Smart Contract Code" rows={10} required/>
                </>;
            case 'L1_L2_AUDIT':
                return <>
                    <InputField name="projectName" value={details.projectName} onChange={handleDetailChange} label="Project Name" disabled={isReaudit} required/>
                    <InputField name="githubRepo" value={details.githubRepo} onChange={handleDetailChange} label="Public GitHub Repository URL" disabled={isReaudit} required/>
                </>
            case 'PENETRATION_TEST':
                 return <>
                    <InputField name="projectName" value={details.projectName} onChange={handleDetailChange} label="Project Name" disabled={isReaudit} required/>
                    <InputField name="websiteUrl" value={details.websiteUrl} onChange={handleDetailChange} label="dApp / Website URL" disabled={isReaudit} required/>
                </>
            case 'KYC_SINGLE':
            case 'KYC_TEAM':
                 return <>
                    <InputField name="projectName" value={details.projectName} onChange={handleDetailChange} label="Project / Team Name" required/>
                    <InputField name="contactEmail" value={details.contactEmail} onChange={handleDetailChange} label="Primary Contact Email" type="email" required/>
                    <TextareaField name="documentLinks" value={details.documentLinks} onChange={handleDetailChange} label="Secure Links to Documents" rows={4} placeholder="e.g., links to a secure cloud storage folder with government IDs, proof of address, etc." required/>
                </>
            default:
                return null;
        }
    };
    
    // Loading/Button state text
    let buttonText = 'Submit Request';
    if(isSubmitting) {
        buttonText = 'Submitting...';
    } else if (isReaudit) {
        buttonText = 'Submit Re-audit';
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {!isReaudit && (
                 <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-1">Service Type</label>
                    <select id="serviceType" name="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value as ServiceType)} className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
                        {Object.entries(serviceTypeDetails).map(([key, { name }]) => (
                            <option key={key} value={key}>{name}</option>
                        ))}
                    </select>
                </div>
            )}
            
            {renderInputs()}
            
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {buttonText}
            </button>
        </form>
    );
};

// Helper components for form fields
const InputField: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input {...props} id={props.name} className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700" />
    </div>
);

const TextareaField: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <textarea {...props} id={props.name} className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
);

const SelectField: React.FC<any> = ({ label, options, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select {...props} id={props.name} className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700">
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);