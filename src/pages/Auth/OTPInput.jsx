import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { sendOTPApi, verifyOTPApi, resendOTPApi } from "../../server/allApi";
import { loginSuccess } from "../../redux/authSlice";
import CustomToast from "../../components/CustomToast";

const OTPInput = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((v) => v !== "") && newValues.join("").length === length) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newValues = [...values];
    pastedData.split("").forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });
    setValues(newValues);

    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputsRef.current[lastFilledIndex]?.focus();

    if (newValues.every((v) => v !== "") && newValues.join("").length === length) {
      onComplete(newValues.join(""));
    }
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-14 text-center text-xl font-bold bg-med-gray dark:bg-[#253636] border-2 border-transparent focus:border-primary rounded-xl outline-none transition-all text-med-dark dark:text-white"
        />
      ))}
    </div>
  );
};

const OTPLogin = ({ email, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maskedEmail, setMaskedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attemptsError, setAttemptsError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    handleSendOTP();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      const res = await sendOTPApi({ email });
      if (res.data.success) {
        setMaskedEmail(res.data.maskedEmail);
        setCooldown(30);
        setOtpSent(true);
        toast(
          <CustomToast
            title="OTP Sent"
            message={`Code sent to ${res.data.maskedEmail}`}
            type="success"
          />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send OTP";
      if (error.response?.data?.remainingSeconds) {
        setCooldown(error.response.data.remainingSeconds);
      }
      toast(
        <CustomToast title="Error" message={msg} type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    await handleSendOTP();
  };

  const handleVerifyOTP = async (otp) => {
    try {
      setLoading(true);
      setAttemptsError("");
      const res = await verifyOTPApi({ email, otp });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess());

        toast(
          <CustomToast
            title="Login Successful"
            message="Welcome back to MedPulse"
            type="success"
          />,
          { bodyClassName: "p-5 m-0", closeButton: false }
        );

        const role = res.data.role;
        if (role === "doctor") {
          setTimeout(() => navigate("/doctor/dashboard"), 1500);
        } else if (role === "patient") {
          setTimeout(() => navigate("/me"), 1500);
        } else if (role === "admin") {
          setTimeout(() => navigate("/admin"), 1500);
        } else {
          const email = res.data.user?.email;
          setTimeout(() => navigate(`/role-selection/${email}`), 1500);
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid OTP";
      setAttemptsError(msg);
      toast(
        <CustomToast title="Verification Failed" message={msg} type="error" />,
        { bodyClassName: "p-5 m-0", closeButton: false }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2a3838] p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-med-text-secondary dark:text-gray-400 hover:text-primary mb-6 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to email
        </button>

        <div className="text-center mb-8">
          <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl text-primary">mail</span>
          </div>
          <h2 className="text-2xl font-bold text-med-dark dark:text-white mb-2">
            Check your email
          </h2>
          <p className="text-med-text-secondary dark:text-gray-400 text-sm">
            We've sent a code to <span className="font-semibold">{email}</span>
          </p>
        </div>

        <div className="mb-6">
          {!otpSent ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <OTPInput length={6} onComplete={handleVerifyOTP} />
          )}
        </div>

        {attemptsError && (
          <p className="text-center text-red-500 text-sm mb-4">{attemptsError}</p>
        )}

        <button
          onClick={handleResend}
          disabled={cooldown > 0 || loading}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
            cooldown > 0
              ? "bg-gray-100 dark:bg-[#253636] text-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-[#0fdbdb] text-med-dark shadow-lg shadow-primary/20"
          }`}
        >
          {loading ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
        </button>

        <p className="text-center text-xs text-med-text-secondary dark:text-gray-500 mt-4">
          OTP expires in 5 minutes
        </p>
      </div>
    </div>
  );
};

export default OTPLogin;
