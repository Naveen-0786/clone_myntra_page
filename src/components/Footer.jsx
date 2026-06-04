import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Camera, Play, Briefcase } from 'lucide-react';
const SocialIcons = [Share2, MessageCircle, Camera, Play, Briefcase];

const cols = [
  { title: 'ONLINE SHOPPING', links: ['Men', 'Women', 'Kids', 'Home & Living', 'Beauty', 'Gift Cards', 'Myntra Insider'] },
  { title: 'CUSTOMER POLICIES', links: ['Contact Us', 'FAQ', 'T&C', 'Terms Of Use', 'Track Orders', 'Cancellation', 'Returns', 'Privacy Policy', 'Grievance Officer'] },
  { title: 'EXPERIENCE MYNTRA APP', links: ['Myntra App On Google Play', 'Myntra App On App Store'] },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-myntra-border mt-10">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-myntra-dark tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <Link to="#" className="text-xs text-myntra-gray hover:text-myntra-pink transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold text-myntra-dark tracking-wider mb-4">KEEP IN TOUCH</h4>
            <div className="flex gap-3 flex-wrap">
              {SocialIcons.map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-myntra-border flex items-center justify-center text-myntra-gray hover:text-myntra-pink hover:border-myntra-pink transition-all hover:scale-110">
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold text-myntra-dark tracking-wider mb-2">SUBSCRIBE</h4>
              <div className="flex">
                <input type="email" placeholder="Enter email" className="border border-myntra-border text-xs px-3 py-2 rounded-l-md focus:outline-none focus:border-myntra-pink w-36" />
                <button className="bg-myntra-pink text-white text-xs px-3 py-2 rounded-r-md font-bold hover:bg-opacity-90 transition-colors">GO</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-myntra-border">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-myntra-gray">© 2024 www.myntra.com. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <img src="https://constant.myntassets.com/web/assets/img/footer_payment_icons_new.png"
              alt="payment" className="h-5 object-contain opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
