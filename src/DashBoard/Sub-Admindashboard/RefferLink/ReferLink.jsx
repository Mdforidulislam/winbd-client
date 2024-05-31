import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ReferralRegistrationPage = () => {
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Generate referral link with subadmin ID
  const generateReferralLink = (subadminId) => {
    return `${window.location.origin}/register?ref=${subadminId}`;
  };

  // Copy referral link to clipboard
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
  };

  // Get subadmin ID (replace with actual subadmin ID)
  const subadminId = JSON.parse(localStorage.getItem('userData'))?.uniqueId;

  // Generate referral link when component mounts
  useEffect(() => {
    setReferralLink(generateReferralLink(subadminId));
  }, [subadminId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white ">Referral Registration</h2>
      <div className="mb-4">
        <label htmlFor="referralLink" className="block mb-4 text-white">Referral Link:</label>
        <div className="flex jusDtify-center gap-2 items-center">
          <input
            id="referralLink"
            type="text"
            value={referralLink}
            readOnly
            className="min-w-40 md:min-w-96 py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
          />
          <button
            onClick={copyReferralLink}
            className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p className="text-sm mt-4 text-white">Share this referral link with others to invite them to register under your subadmin ID.</p>
      </div>
    </div>
  );
};

export default ReferralRegistrationPage;
