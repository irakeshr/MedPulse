import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPaymentDetails } from '../../server/allApi';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/');
      return;
    }

    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 2000; // Start with 2 seconds

    const fetchPayment = async () => {
      try {
        const res = await getPaymentDetails(sessionId);
        if (res.data.success) {
          setPayment(res.data.payment);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching payment:', error);
        
        // If 404 and we haven't exceeded retries, try again
        if (error.response?.status === 404 && retryCount < maxRetries) {
          retryCount++;
          console.log(`Payment not found yet, retrying (${retryCount}/${maxRetries})...`);
          setTimeout(fetchPayment, retryDelay * retryCount); // Exponential backoff
        } else {
          setLoading(false);
        }
      }
    };

    fetchPayment();
  }, [searchParams, navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">Processing your payment...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This may take a few moments while we confirm your payment with Stripe.
          </p>
        </div>
      </main>
    );
  }

  if (!payment) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white dark:bg-[#162a2a] rounded-xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="mb-4">
            <span className="material-symbols-outlined text-5xl text-yellow-500">pending</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Payment Processing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're still processing your payment. This usually takes just a few seconds.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
            >
              Refresh Page
            </button>
            <button 
              onClick={() => navigate('/user')}
              className="w-full px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Go to Dashboard
            </button>
          </div>
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
            💡 Don't worry - your payment was successful! We're just waiting for confirmation from our payment processor.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-[520px] w-full bg-white dark:bg-[#162a2a] rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center">
        
        {/* Success Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 animate-pulse"></div>
            <div className="relative bg-primary text-white size-20 rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-[#111818] dark:text-white tracking-tight text-3xl font-bold leading-tight mb-3">
          Payment Successful!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed mb-8">
          Your appointment has been confirmed. A confirmation email will be sent to your registered address.
        </p>

        {/* Transaction Summary Card */}
        <div className="bg-background-light dark:bg-[#1e3a3a] rounded-lg p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Amount Paid</p>
            <p className="text-[#111818] dark:text-white text-base font-bold">₹{payment.amount}</p>
          </div>
          <div className="w-full h-px bg-slate-200 dark:bg-slate-700"></div>
          
          <div className="flex justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Doctor</p>
            <p className="text-[#111818] dark:text-white text-sm">Dr. {payment.doctor?.displayName}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Specialization</p>
            <p className="text-[#111818] dark:text-white text-sm">{payment.doctor?.specialization}</p>
          </div>

          {payment.booking?.slot && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Date</p>
                <p className="text-[#111818] dark:text-white text-sm">{payment.booking.date}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Time</p>
                <p className="text-[#111818] dark:text-white text-sm">{formatTime(payment.booking.startTime)}</p>
              </div>
            </>
          )}

          <div className="w-full h-px bg-slate-200 dark:bg-slate-700"></div>

          <div className="flex justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Transaction Date</p>
            <p className="text-[#111818] dark:text-white text-sm">{formatDate(payment.createdAt)}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Transaction ID</p>
            <p className="text-[#111818] dark:text-white text-sm font-mono text-xs break-all">
              {payment.stripeSessionId.substring(0, 20)}...
            </p>
          </div>

          {payment.paymentMethod && (
            <div className="flex justify-between items-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Payment Method</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-lg">credit_card</span>
                <p className="text-[#111818] dark:text-white text-sm">{payment.paymentMethod}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/user/appointments')}
            className="w-full bg-primary hover:bg-primary/90 transition-colors text-[#102222] font-bold py-3.5 px-6 rounded-lg text-base shadow-sm"
          >
            View My Appointments
          </button>
          <button 
            onClick={() => navigate('/user')}
            className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-semibold py-3.5 px-6 rounded-lg text-base"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Receipt Link */}
        {payment.receiptUrl && (
          <div className="mt-8">
            <a 
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold" 
              href={payment.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download PDF Receipt
            </a>
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentSuccess;
