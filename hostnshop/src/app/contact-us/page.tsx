/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/contact/page.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {Textarea} from "@/presentation/components/ui/textarea";
import {Label} from "@/presentation/components/ui/label";
import {Mail, Phone, MapPin, Clock, CheckCircle} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/contact-hero.jpg"
            alt="Contact HostNShop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg">We&apos;d love to hear from you</p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-textPrimary mb-6">
                Get in Touch
              </h2>
              <p className="text-textSecondary mb-8">
                Have questions, suggestions, or need assistance? Our team is
                here to help. Feel free to reach out through any of the channels
                below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Our Address
                    </h3>
                    <p className="text-textSecondary mt-1">
                      123 Commerce Street
                      <br />
                      Business District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Email Us
                    </h3>
                    <p className="text-textSecondary mt-1">
                      General Inquiries: info@hostnshop.com
                      <br />
                      Customer Support: support@hostnshop.com
                      <br />
                      Business: business@hostnshop.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Call Us
                    </h3>
                    <p className="text-textSecondary mt-1">
                      Customer Service: +1 (555) 123-4567
                      <br />
                      Sales Department: +1 (555) 765-4321
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="h-6 w-6 text-bg_primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-textPrimary">
                      Business Hours
                    </h3>
                    <p className="text-textSecondary mt-1">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-textPrimary mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-bg_secondary rounded-full text-bg_primary hover:bg-bg_primary hover:text-white transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-textPrimary mb-6">
                Send Us a Message
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                  <p className="font-medium">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please let us know how we can help you..."
                    required
                    className="mt-1 h-32"
                  />
                </div>

                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-bg_primary border-gray-300 rounded focus:ring-bg_primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-bg_primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and consent to the processing of my data.
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-bg_primary hover:bg-btn_hover"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Find Us
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Visit our store or office in person
            </p>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
            {/* Replace with an actual embedded map if available */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <p className="text-textSecondary">
                Map Placeholder - Replace with actual Google Maps or other map
                provider
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Find quick answers to common questions or contact us for more
              specific inquiries.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  What are your shipping times?
                </h3>
                <p className="text-textSecondary">
                  Standard shipping typically takes 5-7 business days. Express
                  shipping takes 2-3 business days. Overnight shipping is also
                  available for select items.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  How can I track my order?
                </h3>
                <p className="text-textSecondary">
                  Once your order ships, you&apos;ll receive a confirmation
                  email with tracking information. You can also track your order
                  by logging into your account and viewing your order history.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  What is your return policy?
                </h3>
                <p className="text-textSecondary">
                  We accept returns within 30 days of delivery. Items must be
                  unused and in their original packaging. Please visit our
                  Returns page for more details and to initiate a return.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button asChild className="bg-bg_primary hover:bg-btn_hover">
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Sign-Up */}
      <section className="py-16 bg-bg_primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter for the latest updates, promotions,
              and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 text-textPrimary"
              />
              <Button className="bg-white text-bg_primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-80">
              By subscribing, you agree to our privacy policy and consent to
              receive marketing emails.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
