// ==============================
// Footer Component
// ==============================
const Footer = () => (
  <footer className="bg-neutral py-10 text-neutral-content">
    <div className="container mx-auto px-4 text-center">
      <h3 className="text-2xl font-bold">MS Gadget Planet</h3>
      <p className="mt-2 text-sm opacity-80">Your trusted destination for modern gadgets, smart accessories and easy online ordering.</p>
      <p className="mt-4 text-xs opacity-60">© {new Date().getFullYear()} MS Gadget Planet. All rights reserved.</p>
    </div>
  </footer>
);
export default Footer;
