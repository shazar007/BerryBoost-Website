"use client";
import React, { useState } from "react";

const MailchimpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("FNAME", firstName);
    formData.append("PHONE", phone);
    formData.append("COMPANY", company);

    try {
      const response = await fetch(
        "https://berryboost.us16.list-manage.com/subscribe/post?u=3056d1083d65c1125d948f2ad&id=0a4397f233&f_id=00f2c2e1f0",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Subscription Successful!");
      } else {
        setIsError(true);
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      id="mc_embed_signup"
      className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-40 mb-20 bg-[#EDFCFC]"
    >
      <form
        onSubmit={handleSubmit}
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="space-y-4"
        target="_blank"
      >
        <div id="mc_embed_signup_scroll">
          <h2 className="text-2xl font-semibold text-center mb-6">Subscribe</h2>
          <div className="text-sm text-gray-500 text-center mb-4">
            <span className="text-red-500">*</span> indicates required
          </div>

          <div className="mc-field-group">
            <label
              htmlFor="mce-EMAIL"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="EMAIL"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mce-EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mc-field-group">
            <label
              htmlFor="mce-FNAME"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="FNAME"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mce-FNAME"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mc-field-group">
            <label
              htmlFor="mce-PHONE"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="PHONE"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mce-PHONE"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mc-field-group">
            <label
              htmlFor="mce-COMPANY"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              name="COMPANY"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mce-COMPANY"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {isSuccess && (
            <div
              id="mce-success-response"
              className="response text-green-600 bg-green-100 p-4 rounded-lg"
            >
              {message}
            </div>
          )}

          {isError && (
            <div
              id="mce-error-response"
              className="response text-red-600 bg-red-100 p-4 rounded-lg"
            >
              {message}
            </div>
          )}

          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-5000px" }}
          >
            <input
              type="text"
              name="b_3056d1083d65c1125d948f2ad_0a4397f233"
              tabIndex={-1}
              value=""
            />
          </div>

          <div className="clear">
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#14ccc3] text-white rounded-lg hover:bg-[#00a39b] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailchimpForm;
