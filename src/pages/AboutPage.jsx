import { TrendingUp, Users, Globe, Star } from 'lucide-react';

const stats = [
  { icon: Users, val: '60M+', label: 'Customers', color: 'text-myntra-pink' },
  { icon: Globe, val: '19,000+', label: 'Pin Codes', color: 'text-blue-500' },
  { icon: TrendingUp, val: '50,000+', label: 'Brands', color: 'text-myntra-orange' },
  { icon: Star, val: '4.8★', label: 'App Rating', color: 'text-myntra-green' },
];

export default function AboutPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <span className="text-3xl font-black text-myntra-pink">myntra</span>
        <h1 className="text-2xl font-black text-myntra-dark mt-3 mb-3">About Us</h1>
        <p className="text-sm text-myntra-gray max-w-xl mx-auto leading-relaxed">
          Myntra is India's leading fashion and lifestyle platform, bringing you the best of brands and trends at the click of a button. We're passionate about making fashion accessible to everyone.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 text-center border border-myntra-border shadow-sm hover:shadow-md transition-shadow">
            <s.icon size={24} className={`mx-auto mb-2 ${s.color}`} />
            <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
            <p className="text-xs text-myntra-gray mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-myntra-border p-8">
        <h2 className="text-lg font-black text-myntra-dark mb-4">Our Story</h2>
        <p className="text-sm text-myntra-gray leading-relaxed mb-4">
          Founded in 2007, Myntra started as a personalized gift article business. In 2010, we pivoted to focus on fashion, and the journey since has been nothing short of extraordinary. From a small team with a big dream, we've grown into India's largest fashion e-commerce destination.
        </p>
        <p className="text-sm text-myntra-gray leading-relaxed">
          Today, Myntra serves millions of customers across India, offering over 5 lakh products from over 3,000 leading brands and designers. We are committed to delivering the best shopping experience — curating fashion that speaks to every Indian, in every city, town, and village.
        </p>
      </div>
    </div>
  );
}
