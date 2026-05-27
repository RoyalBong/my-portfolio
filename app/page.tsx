"use client";

import React, { useState } from "react";

type ContactStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: { success?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section className="w-full max-w-3xl px-6 py-10">
      <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">Contact Me</h3>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
        Interested in collaborating or have questions? Reach out!
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <input
          className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="message"
          rows={4}
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-fit px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && (
          <span className="text-green-600 dark:text-green-400 mt-2 font-medium">
            Message sent successfully! Thank you for reaching out.
          </span>
        )}
        {status === "error" && (
          <span className="text-red-600 dark:text-red-400 mt-2 font-medium">{errorMsg}</span>
        )}
      </form>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-900 font-sans flex flex-col items-center justify-start">
      <section className="w-full py-20 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-50 dark:from-zinc-900 to-zinc-100 dark:to-zinc-800">
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-3 text-center">
          Shayan Dutta
        </h1>
        <h2 className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium text-center max-w-xl">
          DevOps and Cloud enthusiast with hands-on experience in Java/Spring Boot
        </h2>
      </section>

      <section className="w-full max-w-3xl px-6 py-10">
        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">About Me</h3>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Innovative DevOps enthusiast and cloud technology explorer with experience in building scalable backend
          applications using Java Spring Boot. Adept in cloud deployments, CI/CD automation, Linux server
          administration, containerization, and microservices architecture.
        </p>
      </section>

      <section className="w-full max-w-5xl px-6 py-10">
        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-6">Projects</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg shadow-md bg-white dark:bg-zinc-800 p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Employee Management System (Microservices)
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300 text-base">
              <li>Built a microservices-based Java Spring Boot application for employee and department management.</li>
              <li>Deployed and managed applications on AWS EC2 with Linux server configuration and SSH-based administration.</li>
              <li>Implemented CI/CD automation using Jenkins and GitHub webhooks to streamline build and deployment workflows.</li>
              <li>Containerized services using Docker to improve portability, consistency, and deployment efficiency.</li>
              <li>Exploring Kubernetes orchestration concepts including Deployments, Services, scaling, and container management.</li>
            </ul>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
