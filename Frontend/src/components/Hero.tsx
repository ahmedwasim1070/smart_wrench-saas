export const Hero = () => {
  return (
    <section id="hero">
      <div className="min-w-full h-[800px] relative">
        <img
          src="/hero.webp"
          alt="SmartWrench - Hero Image"
          className="size-full"
        />

        <div className="inset-0 absolute min-w-full min-h-full bg-primary/40"></div>
      </div>
    </section>
  );
};
