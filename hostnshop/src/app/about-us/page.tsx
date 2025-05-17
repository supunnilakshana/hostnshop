// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

import {Users, Award, Heart, Target} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";

export default function AboutUs() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
      <div className="absolute inset-0 z-0 w-full h-full">
      <Image
        src="/assets/images/about-hero.jpg"
        alt="About HostNShop"
        fill
        priority
        quality={100}            
        sizes="100vw"             
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>


        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About HostNShop
            </h1>
            <p className="text-lg">Learn more about our story and mission</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-textPrimary mb-6">
                Our Story
              </h2>
              <p className="text-textSecondary mb-4">
                HostNShop began in 2020 with a simple vision: to create an
                online shopping experience that truly puts customers first. What
                started as a small operation has now grown into a thriving
                e-commerce platform offering thousands of products across
                multiple categories.
              </p>
              <p className="text-textSecondary mb-4">
                Our founders, who had years of experience in retail and
                technology, noticed a gap in the market for a user-friendly and
                reliable online store that offers quality products at
                competitive prices. They combined their expertise to build
                HostNShop from the ground up.
              </p>
              <p className="text-textSecondary">
                Today, we serve thousands of customers worldwide, but our core
                principles remain the same – providing exceptional products,
                outstanding service, and a seamless shopping experience.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/images/team.jpg"
              alt="Our Team"
              fill
              quality={100}           
              sizes="100vw"           
              className="object-cover"
            />
          </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Our Mission & Values
            </h2>
            <p className="text-textSecondary max-w-3xl mx-auto">
              At HostNShop, we&apos;re driven by a set of core values that guide
              everything we do – from the products we select to the way we
              interact with our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Award className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Quality
              </h3>
              <p className="text-textSecondary">
                We carefully select each product to ensure it meets our high
                standards. Quality is never compromised.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Heart className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Customer First
              </h3>
              <p className="text-textSecondary">
                Your satisfaction is our priority. We strive to exceed
                expectations with every interaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Target className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Innovation
              </h3>
              <p className="text-textSecondary">
                We continuously improve our platform and processes to provide
                the best shopping experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Users className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Community
              </h3>
              <p className="text-textSecondary">
                We believe in building strong relationships with customers,
                suppliers, and our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Meet Our Team
            </h2>
            <p className="text-textSecondary max-w-3xl mx-auto">
              Behind HostNShop is a dedicated team of professionals passionate
              about creating the best shopping experience for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  John Doe
                </h3>
                <p className="text-bg_primary">Founder & CEO</p>
                <p className="mt-2 text-sm text-textSecondary">
                  John brings over 15 years of retail experience and a vision
                  for customer-centric e-commerce.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Jane Smith"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  Jane Smith
                </h3>
                <p className="text-bg_primary">CTO</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Jane leads our tech team, ensuring a seamless and secure
                  online shopping experience.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Mike Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  Mike Johnson
                </h3>
                <p className="text-bg_primary">Product Director</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Mike curates our product selection, ensuring we offer only the
                  highest quality items.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/assets/images/avatar.jpg"
                  alt="Sarah Wilson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-textPrimary">
                  Sarah Wilson
                </h3>
                <p className="text-bg_primary">Customer Success Manager</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Sarah ensures every customer interaction exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bg_primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Become part of our growing community of satisfied customers and
            experience the HostNShop difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-bg_primary hover:bg-gray-100"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-bg_primary hover:bg-gray-100"
            >
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
