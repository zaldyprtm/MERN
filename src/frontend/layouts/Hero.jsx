const Hero = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url('/menu/icedCoffee.jpg')",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-amber-500 md:text-amber-800">
              Selamat Datang di Coffee & Chill!
            </h1>
            <p className="mb-5 font-semibold text-md">
              Bergabunglah bersama kami di Coffee & Chill, di mana setiap
              cangkir menceritakan sebuah kisah, dan setiap kunjungan terasa
              seperti pulang ke rumah. Kami tidak sabar untuk melayani Anda dan
              berbagi kecintaan kami terhadap kopi yang luar biasa.
            </p>
            <a href="#menu">
              <button className="btn btn-primary font-semibold uppercase">Order Now</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
