import { LogoSVG } from "../public/logo";

const Logo = () => {
  return (
    <section className="flex items-center">
      <LogoSVG className="md:h-16 md:w-16 h-20 w-20 fill-white" />
      <h1 className="text-6xl font-thin ml-2 text-white hidden md:block font-rhd">
        Match<span className="font-bold">Point</span> Times
      </h1>
    </section>
  );
};

export default Logo;
