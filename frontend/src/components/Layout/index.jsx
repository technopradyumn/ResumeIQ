import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col min-w-0 pt-[68px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
