import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const developers = [
  { name: "Amanpreet Kaurl", role: "Developer", linkedin: "https://www.linkedin.com/in/amanpreet-kaur-708707235", github: "https://github.com/2121139git" },
  { name: "Gagandeep Kaur", role: " Developer", linkedin: "https://www.linkedin.com/in/gagandeep-kaur-211961224/", github: "https://github.com/Gagan-9" },
];

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center py-20">
            <h1 className="text-6xl font-bold mb-6">Welcome to SOLVE IT</h1>
            <p className="text-2xl mb-8">Challenge Your Code, Elevate Your Skills</p>
            <img
              src='/logo.png'
              alt='codegamy_logo'
              className='w-80 h-80 mb-10 object-contain'
            />
            <div className="flex gap-4">
              <Link href="/problems">
                <button className="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition duration-300">Explore Problems</button>
              </Link>
              <Link href="/contests">
                <button className="py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300">Explore Contests</button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FeatureCard  title="Explore" description="Discover a variety of learning modules for different programming languages to enhance your skills and knowledge."/>
            <FeatureCard title="Problems" description="Dive into a vast array of coding problems to hone your skills and master various algorithms and data structures." />
              <FeatureCard title="Challenges" description="Put your skills to the test in our thrilling coding contests. Compete against top programmers and climb the leaderboard to showcase your talent." />
              <FeatureCard title="Interview Prep" description="Ace your coding interviews with our curated collection of questions and resources tailored to help you succeed." />
            </div>
          </section>

          {/* Developers Section */}
          <section className="py-16">
            <h2 className="text-4xl font-bold mb-10 text-center">Meet Our Developers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {developers.map((developer) => (
                <DeveloperCard key={developer.name} {...developer} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-800 text-white rounded-xl p-8 shadow-lg transition duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function DeveloperCard({ name, role, linkedin, github }) {
  return (
    <div className="bg-gray-800 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center">
        <img src='/profile.png' alt={name} className='w-16 h-16 rounded-full object-cover' />
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-400">{role}</p>
          <div className="flex mt-2">
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 mr-4">
              <FaLinkedin className="w-6 h-6" />
            </Link>
            <Link href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
              <FaGithub className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
