import { useCart } from '../../App';

export default function CartToast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'var(--brand-primary-color, #111)',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'opacity 0.3s',
        opacity: toast ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      {toast}
    </div>
  );
}
