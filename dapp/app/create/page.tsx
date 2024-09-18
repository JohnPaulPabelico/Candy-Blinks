import NavBar from "@/components/navbar";
import CreateView from "@/views/create/create";

export default function Create() {
  return (
    <section className="min-h-dvh flex flex-col gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
      <NavBar />
      <div className="container">
        <CreateView />
      </div>
    </section>
  );
}
