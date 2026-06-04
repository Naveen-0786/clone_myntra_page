import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.msg) { setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: '', email: '', msg: '' }); }
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-myntra-dark mb-2">Contact Us</h1>
        <p className="text-sm text-myntra-gray">We're here to help! Reach out anytime.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Info */}
        <div className="space-y-4">
          {[
            { icon: Phone, title: 'Call Us', detail: '1800-123-4567 (Toll-Free)', sub: 'Mon–Sat, 8 AM–10 PM' },
            { icon: Mail, title: 'Email Us', detail: 'support@myntra.com', sub: 'Response within 24 hrs' },
            { icon: MessageCircle, title: 'Live Chat', detail: 'Chat with us on App', sub: 'Available 24/7' },
            { icon: MapPin, title: 'Head Office', detail: 'Bengaluru, Karnataka', sub: 'Myntra HQ, India' },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl p-5 flex items-start gap-4 border border-myntra-border hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-full bg-myntra-light flex items-center justify-center flex-shrink-0">
                <c.icon size={18} className="text-myntra-pink" />
              </div>
              <div>
                <p className="text-sm font-bold text-myntra-dark">{c.title}</p>
                <p className="text-xs text-myntra-dark mt-0.5">{c.detail}</p>
                <p className="text-[10px] text-myntra-gray">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 border border-myntra-border">
          <h3 className="text-sm font-black text-myntra-dark mb-4">Send a Message</h3>
          {sent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-xs text-myntra-green font-semibold animate-bounce-in">
              ✓ Message sent! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map(f => (
              <div key={f.id}>
                <label className="text-xs font-bold text-myntra-gray uppercase tracking-wider">{f.label}</label>
                <input type={f.type} value={form[f.id]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  placeholder={f.placeholder} required
                  className="w-full mt-1 border border-myntra-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-myntra-pink transition-colors" />
              </div>
            ))}
            <div>
              <label className="text-xs font-bold text-myntra-gray uppercase tracking-wider">Message</label>
              <textarea value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                placeholder="How can we help?" rows={4} required
                className="w-full mt-1 border border-myntra-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-myntra-pink transition-colors resize-none" />
            </div>
            <button type="submit"
              className="w-full bg-myntra-pink text-white font-black text-sm py-3 rounded-sm hover:bg-opacity-90 transition-all hover:shadow-lg active:scale-95">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
