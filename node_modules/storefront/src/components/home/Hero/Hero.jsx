// ==============================
// Hero Section
// ==============================
const Hero = () => (
  <section className="bg-gradient-to-r from-brand to-indigo-600 py-16 text-white">
    <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
      <div>
        <span className="badge badge-secondary mb-4">Gadget Store</span>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Smart gadgets, fast orders, simple shopping.</h1>
        <p className="mt-4 max-w-xl text-base md:text-lg">Explore headphones, cameras, accessories, wearables and more. Add to cart or place an order directly from MS Gadget Planet.</p>
        <a href="#products" className="btn btn-secondary mt-6">Browse Products</a>
      </div>
      <div className="rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/10 p-4"><h3 className="text-3xl font-bold">15+</h3><p>Default products</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><h3 className="text-3xl font-bold">24/7</h3><p>Admin control</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><h3 className="text-3xl font-bold">Cart</h3><p>Easy add to cart</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><h3 className="text-3xl font-bold">Orders</h3><p>Quick checkout form</p></div>
        </div>
      </div>
    </div>
  </section>
);
export default Hero;
