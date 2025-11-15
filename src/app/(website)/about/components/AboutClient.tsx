"use client";
import { AnimatedTestimonialClient } from "../../components/AnimatedTestimonialClient";
import { OtherMember } from "./OtherMember";

const AboutClient = () => {
  return (
    <main className="relative mt-22 bg-brand-secondary text-gray-200 max-w-4xl mx-auto px-6 py-12">
      <div className="max-w-3xl text-center space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white mb-4">
            <span className="text-brand-primary">About</span> Wynnie Runner
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Celebrating the spirit of running, teamwork, and shared memories.
          </p>
        </div>

        {/* Divider Line */}
        <div className="h-0.5 w-24 bg-brand-primary mx-auto opacity-70"></div>

        {/* Disclaimer Section */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-left shadow-md">
          <p className="leading-relaxed mb-4">
            The{" "}
            <span className="text-brand-primary font-semibold">
              Wynnie Running Team
            </span>{" "}
            platform is created solely for documenting and sharing joyful
            moments among individuals connected to our team. It is designed for
            personal enjoyment, reflecting the unique experiences and memories
            of our members.
          </p>

          <p className="leading-relaxed mb-4">
            We do not claim to represent any professional organization, nor is
            this platform intended for commercial purposes or public
            representation. Any opinions expressed here are personal to the
            individuals involved.
          </p>

          <p className="leading-relaxed">
            If you believe any content on this platform infringes on your rights
            or is inappropriate, please contact us for resolution.
          </p>
        </section>
      </div>

      <AnimatedTestimonialClient />

      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-primary text-center">
          Other Members
        </h1>
        <OtherMember />
      </section>

      {/* Contact Section */}
      <section className="text-center space-y-4">
        <p className="text-gray-400 text-sm">
          Want to reach us? We’re happy to connect.
        </p>
      </section>
    </main>
  );
};

export default AboutClient;
