import flashSaleImage from "../assets/flash-sale.jpg";

{/* ============================== */}
{/* Hero Section */}
{/* ============================== */}
<section className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-600 py-14 text-white">
  <div className="container mx-auto px-4">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      
      {/* Left Side */}
      <div>
        <span className="mb-4 inline-block rounded-full bg-pink-500 px-4 py-1 text-sm font-semibold">
          Gadget Store
        </span>

        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
          Smart gadgets, fast orders,
          <br />
          simple shopping.
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-white/90">
          Explore headphones, cameras, accessories, wearables and more.
          Add to cart or place an order directly from MS Gadget Planet.
        </p>

        <button className="btn mt-8 border-0 bg-pink-500 text-white hover:bg-pink-600">
          Browse Products
        </button>
      </div>

      {/* Right Side - Hero Image */}
      <div className="overflow-hidden rounded-3xl shadow-2xl">
        <img
          src={flashSaleImage}
          alt="Flash Sale"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
</section>