"use client";

import { useState } from "react";
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        setFormData({ name: "", email: "", message: "" });
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
      <div className="max-w-6xl mx-auto px-8 py-16 content-text">

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-lg font-light text-black mb-6">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                We welcome collaborations, inquiries, and conversations about architecture, design, and the spaces we inhabit. Reach out to discuss your project or simply to connect.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-light text-black mb-4">General Enquiries</h3>
                <p className="text-gray-600 font-light">mail@studiogravitas.com</p>
              </div>
              
              <div>
                <h3 className="text-base font-light text-black mb-4">India Office</h3>
                <div className="text-gray-600 space-y-1 font-light">
                  <p>Studio Gravitas</p>
                  <p>New Delhi, India</p>
                  <p>T +91 11 1234 5678</p>
                  <p>india@studiogravitas.com</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-light text-black mb-4">International Projects</h3>
                <p className="text-gray-600 font-light">international@studiogravitas.com</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8">
            <h3 className="text-lg font-light text-black mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-light text-black mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-light text-black mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-light text-black mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors font-light"
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
