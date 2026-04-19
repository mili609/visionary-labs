import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "./About";
import { PremiumButton } from "@/components/PremiumButton";
import { useState } from "react";
import { ArrowRight, User, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GetStarted = () => {
  const [tab, setTab] = useState<"patient" | "practitioner">("patient");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero eyebrow="Get Started" title="Take the next step." subtitle="Whether you are a parent or an eye care professional, getting started with MyoPREVA™ is simple." />

        <section className="pb-32">
          <div className="container-premium max-w-2xl">
            {/* Tabs */}
            <div className="glass relative mx-auto flex w-full rounded-full p-1.5 mb-10">
              <span
                className={cn(
                  "absolute inset-y-1.5 w-1/2 rounded-full bg-gradient-primary shadow-glow transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  tab === "patient" ? "left-1.5" : "left-[calc(50%-0.375rem)]"
                )}
              />
              {([
                { id: "patient", label: "I am a Patient", icon: User },
                { id: "practitioner", label: "I am a Practitioner", icon: Stethoscope },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors duration-300",
                    tab === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-white"
                  )}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
            </div>

            {/* Form panel */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-elevated">
              <div key={tab} className="animate-fade-up">
                <h3 className="font-display text-2xl font-semibold text-white mb-2">
                  {tab === "patient" ? "Order MyoPREVA™" : "Become a MyoPREVA™ Provider"}
                </h3>
                <p className="text-sm text-muted-foreground mb-8">
                  {tab === "patient"
                    ? "Tell us a little about your child and we'll connect you with a certified provider."
                    : "Join our global network of certified eye care professionals."}
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Thank you — we'll be in touch shortly.");
                  }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Full Name" name="name" />
                  <Field label="Email Address" name="email" type="email" />
                  {tab === "patient" ? (
                    <>
                      <Field label="Phone" name="phone" />
                      <Field label="Child's Age" name="age" />
                    </>
                  ) : (
                    <>
                      <Field label="Clinic Name" name="clinic" />
                      <Field label="Country" name="country" />
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <Field label="Message" name="message" textarea />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <PremiumButton type="submit" className="w-full sm:w-auto">
                      Submit <ArrowRight className="h-4 w-4" />
                    </PremiumButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

function Field({ label, name, type = "text", textarea = false }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls =
    "peer w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pt-5 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_hsl(197_100%_50%/0.12)]";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={name} name={name} placeholder={label} rows={4} className={cls} />
      ) : (
        <input id={name} name={name} type={type} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-1.5 text-[10px] uppercase tracking-wider text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  );
}

export default GetStarted;
