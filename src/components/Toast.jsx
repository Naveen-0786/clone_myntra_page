import { useCart } from '../context/CartContext';
import { CheckCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
      <div className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-xl text-sm font-semibold text-white
        ${toast.type === 'info' ? 'bg-myntra-dark' : 'bg-myntra-green'}`}>
        {toast.type === 'info' ? <Info size={15} /> : <CheckCircle size={15} />}
        {toast.msg}
      </div>
    </div>
  );
}
