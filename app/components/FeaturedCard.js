export default function FeatureCard({ title, description }) {
    return (
      <div className="relative p-8 rounded-3xl bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-xl transition duration-300 text-left group overflow-hidden">
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-500 ease-in-out pointer-events-none"></div>
  
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 z-10 relative">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed z-10 relative">
          {description}
        </p>
      </div>
    );
  }
  