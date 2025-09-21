"use client";

import { useState } from "react";
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    toast.loading('Sending message...', { id: 'email-send' });
    
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        toast.success('Message sent successfully!', { id: 'email-send' });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setStatus("");
      } else {
        toast.error('Failed to send message. Please try again.', { id: 'email-send' });
        setStatus("");
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.', { id: 'email-send' });
      setStatus("");
    }
  };

  return (
    <div className="min-h-screen bg-white lg:ml-80">
      <div className="max-w-6xl mx-auto px-8 pt-4 pb-16 lg:pt-20 lg:pb-16 content-text">

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="max-w-xs">
              <h1 className="text-2xl font-light text-gray-800 mb-6">Get in Touch</h1>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                We welcome collaborations, inquiries, and conversations about architecture, design, and the spaces we inhabit. Reach out to discuss your project or simply to connect.
              </p>
              <p className="text-gray-600 font-light">
                For career enquiry, send your portfolios to <a href="mailto:mail@studiogravitas.com" className="font-bold text-gray-800 hover:text-gray-600">mail@studiogravitas.com</a>
              </p>
            </div>
            
          </div>
          
          <div className="max-w-80">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-800"
                required
              />
              
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-800"
                required
              />
              
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-800"
              />
              
              <textarea
                name="message"
                rows="12"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-800 resize-none"
                required
              />
              
              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-3 hover:bg-gray-700 transition-colors font-light"
              >
                Send Message
              </button>
            </form>
            

          </div>
        </div>
      </div>
    </div>
  );
}
