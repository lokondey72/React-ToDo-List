const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-tr from-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Welcome to{" "}
            <span className="text-white font-semibold">Privet Limited</span> — a
            dynamic and forward-thinking company focused on delivering
            innovative digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-700 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">
              Who We Are
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Privet Limited is a creative software firm specializing in web
              development, mobile apps, and cloud-based solutions. We are
              committed to building high-quality, scalable systems with a
              user-first approach.
            </p>
          </div>

          <div className="bg-slate-700 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">
              Our Mission
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Our mission is to empower businesses through cutting-edge
              technology, smart automation, and stunning user experiences. We
              thrive on innovation and believe in delivering meaningful impact
              to our clients.
            </p>
          </div>

          <div className="bg-slate-700 p-8 rounded-2xl shadow-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">
              What We Do
            </h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Custom Web & Mobile App Development</li>
              <li>Cloud Integration & DevOps</li>
              <li>UI/UX Design & Prototyping</li>
              <li>Maintenance & Support Services</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Privet Limited. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
