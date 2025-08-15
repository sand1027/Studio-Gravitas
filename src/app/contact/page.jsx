"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setStatus("Email sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Error sending email.");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl font-bold">Contact</h1>
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Offices</h2>
        <p className="text-base sm:text-lg">General Enquiries: mail@morq.it</p>
        <p className="text-base sm:text-lg">
          Italy: Via Monte Santo, 25, 00195 Rome. T +39 06 37 35 0175.
          italy@morq.it
        </p>
        <p className="text-base sm:text-lg">Australia: 6 Burns St.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Send</Button>
      </form>
      {status && (
        <p className="text-green-600 text-base sm:text-lg">{status}</p>
      )}
    </div>
  );
}
