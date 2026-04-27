'use client';

import { useEffect, useState, type ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Stethoscope, Upload, User } from "lucide-react";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Footer } from "@/components/Footer";
import { PremiumButton } from "@/components/PremiumButton";
import { cn } from "@/lib/utils";

const measurementSchema = z
  .string()
  .trim()
  .max(20, "Use 20 characters or fewer")
  .refine((value) => value === "" || /^-?\d+(\.\d+)?$/.test(value), "Enter a valid number");

const patientSchema = z.object({
  patientId: z.string().trim().min(1, "Patient ID is required").max(80, "Use 80 characters or fewer"),
  lastName: z.string().trim().min(1, "Last name is required").max(80, "Use 80 characters or fewer"),
  email: z.string().trim().email("Enter a valid email address").max(160, "Use 160 characters or fewer"),
  rRefraction: measurementSchema,
  rAxialLength: measurementSchema,
  lRefraction: measurementSchema,
  lAxialLength: measurementSchema,
  cycloplegia: z.enum(["", "Yes", "No"]),
  productOption: z
    .string()
    .min(1, "Select a product option")
    .refine((value) => ["standard", "premium"].includes(value), "Select a valid product option"),
  otherTreatment: z.string().trim().max(500, "Use 500 characters or fewer"),
});

const practitionerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80, "Use 80 characters or fewer"),
  lastName: z.string().trim().min(1, "Last name is required").max(80, "Use 80 characters or fewer"),
  email: z.string().trim().email("Enter a valid email address").max(160, "Use 160 characters or fewer"),
  practiceName: z.string().trim().max(140, "Use 140 characters or fewer"),
  practiceAddress: z.string().trim().max(500, "Use 500 characters or fewer"),
  profession: z.string().min(1, "Select your profession"),
  country: z.string().trim().min(1, "Country is required").max(80, "Use 80 characters or fewer"),
});

type PatientFormValues = z.infer<typeof patientSchema>;
type PractitionerFormValues = z.infer<typeof practitionerSchema>;

const patientDefaults: PatientFormValues = {
  patientId: "",
  lastName: "",
  email: "",
  rRefraction: "",
  rAxialLength: "",
  lRefraction: "",
  lAxialLength: "",
  cycloplegia: "",
  productOption: "",
  otherTreatment: "",
};

const practitionerDefaults: PractitionerFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  practiceName: "",
  practiceAddress: "",
  profession: "",
  country: "",
};

async function submitLead(type: "patient" | "practitioner", payload: Record<string, unknown>) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    return;
  }

  const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, ...payload }),
  });

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}`);
  }
}

export default function GetStarted() {
  const [tab, setTab] = useState<"patient" | "practitioner">("patient");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <main className="pt-28 md:pt-40 pb-24 md:pb-32">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-secondary/6 to-transparent rounded-full blur-3xl animate-float-delayed" />
        </div>

        <section
          className={cn(
            "relative mb-12 md:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="container-premium max-w-4xl">
            <div className="text-center space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Have access to<br className="hidden sm:inline" /> MyoPREVA
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Be part of the expert panel to fit MyoPREVA
              </p>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
            <div
              className={cn(
                "flex justify-center mb-9 transition-all duration-1000",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
              )}
            >
              <div className="glass relative flex rounded-full p-0.5">
                <span
                  className={cn(
                    "absolute inset-y-0.5 w-1/2 rounded-full bg-gradient-primary shadow-glow transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    tab === "patient" ? "left-0.5" : "left-1/2 translate-x-0",
                  )}
                />
                {([
                  { id: "patient", label: "Order Details", icon: User },
                  { id: "practitioner", label: "Doctor Registration", icon: Stethoscope },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "relative z-10 flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 px-4 md:px-5 text-xs md:text-sm font-semibold transition-colors duration-300 group h-10",
                      tab === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-white",
                    )}
                  >
                    <t.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="hidden sm:inline truncate">{t.label}</span>
                    <span className="sm:hidden text-xs truncate">{t.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "glass-card rounded-3xl p-8 md:p-12 shadow-elevated transition-all duration-1000 max-w-4xl mx-auto",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <div key={tab} className="animate-fade-in">
                <div className="mb-7 space-y-1.5">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {tab === "patient" ? "Order MyoPREVA" : "Become a Provider"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tab === "patient"
                      ? "Complete your assessment to get started"
                      : "Join our network of certified professionals"}
                  </p>
                </div>

                {tab === "patient" ? <PatientForm /> : <PractitionerForm />}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PatientForm() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: patientDefaults,
    mode: "onSubmit",
  });

  const cycloplegia = useWatch({ control, name: "cycloplegia" });

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const validTypes = ["image/dicom", "application/dicom", "image/png", "image/jpeg"];
      if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".dcm")) {
        toast.error("Only DICOM, PNG, and JPEG files are supported");
        return;
      }

      setUploadedFile(file.name);
      toast.success("File uploaded successfully");
    }
  };

  const onSubmit = async (data: PatientFormValues) => {
    try {
      await submitLead("patient", { ...data, uploadedFile });
      toast.success("Your assessment has been submitted. We'll be in touch shortly.");
      reset(patientDefaults);
      setUploadedFile(null);
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-white uppercase tracking-wider opacity-70 block">
          Upload Fundus Photos
        </label>
        <div className="relative group">
          <input
            type="file"
            accept=".dcm,image/png,image/jpeg"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="relative border-2 border-dashed border-primary/35 rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/55 hover:bg-primary/[0.03] group-hover:shadow-lg hover:shadow-[0_0_30px_hsl(197_100%_50%/0.15)]">
            <div className="flex flex-col items-center gap-2.5 text-center">
              <div className="p-2.5 rounded-full bg-gradient-primary/10 group-hover:scale-110 transition-transform">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Drag and drop or click to browse</p>
                <p className="text-xs text-muted-foreground">DICOM, PNG, JPEG - Max 5MB</p>
              </div>
            </div>
            {uploadedFile && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span className="text-primary font-medium truncate max-w-[150px]">{uploadedFile}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">Patient Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField label="Patient ID" name="patientId" registration={register("patientId")} error={errors.patientId?.message} />
          <FormField label="Last Name" name="lastName" registration={register("lastName")} error={errors.lastName?.message} />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            registration={register("email")}
            error={errors.email?.message}
            className="md:col-span-2"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">Clinical Measurements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="R. Refraction (D)"
            name="rRefraction"
            placeholder="e.g. -2.50"
            registration={register("rRefraction")}
            error={errors.rRefraction?.message}
          />
          <FormField
            label="R. Axial Length (mm)"
            name="rAxialLength"
            placeholder="e.g. 24.5"
            registration={register("rAxialLength")}
            error={errors.rAxialLength?.message}
          />
          <FormField
            label="L. Refraction (D)"
            name="lRefraction"
            placeholder="e.g. -2.25"
            registration={register("lRefraction")}
            error={errors.lRefraction?.message}
          />
          <FormField
            label="L. Axial Length (mm)"
            name="lAxialLength"
            placeholder="e.g. 24.3"
            registration={register("lAxialLength")}
            error={errors.lAxialLength?.message}
          />
        </div>

        <div className="space-y-2 pt-0.5">
          <label className="text-xs font-semibold text-white uppercase tracking-wider opacity-60 block">
            Cycloplegia Applied?
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {["Yes", "No"].map((option) => (
              <label key={option} className="relative cursor-pointer group">
                <input
                  type="radio"
                  value={option}
                  checked={cycloplegia === option}
                  className="sr-only"
                  {...register("cycloplegia")}
                />
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg border text-center font-medium text-sm transition-all duration-300 h-10 flex items-center justify-center",
                    cycloplegia === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-primary/40 hover:text-white",
                  )}
                >
                  {option}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">Treatment Plan</h3>
        <div className="space-y-3">
          <FormSelect
            label="Select Product Option"
            name="productOption"
            registration={register("productOption")}
            error={errors.productOption?.message}
            options={[
              { value: "", label: "Choose an option" },
              { value: "standard", label: "MyoPREVA Standard" },
              { value: "premium", label: "MyoPREVA Premium" },
            ]}
          />
          <FormField
            label="Other Combination Treatment"
            name="otherTreatment"
            placeholder="Please indicate if applicable"
            registration={register("otherTreatment")}
            error={errors.otherTreatment?.message}
            textarea
          />
        </div>
      </div>

      <div className="pt-2">
        <PremiumButton type="submit" disabled={isSubmitting} className="w-full">
          <span>{isSubmitting ? "Submitting" : "Continue to Order"}</span>
          <ArrowRight className="h-4 w-4" />
        </PremiumButton>
      </div>
    </form>
  );
}

function PractitionerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PractitionerFormValues>({
    resolver: zodResolver(practitionerSchema),
    defaultValues: practitionerDefaults,
    mode: "onSubmit",
  });

  const onSubmit = async (data: PractitionerFormValues) => {
    try {
      await submitLead("practitioner", data);
      toast.success("Your application has been submitted. We'll review it shortly.");
      reset(practitionerDefaults);
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="First Name"
            name="firstName"
            registration={register("firstName")}
            error={errors.firstName?.message}
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            registration={register("lastName")}
            error={errors.lastName?.message}
            required
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            registration={register("email")}
            error={errors.email?.message}
            required
            className="md:col-span-2"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">Practice Information</h3>
        <div className="space-y-3">
          <FormField
            label="Practice Name"
            name="practiceName"
            registration={register("practiceName")}
            error={errors.practiceName?.message}
          />
          <FormField
            label="Practice Address"
            name="practiceAddress"
            registration={register("practiceAddress")}
            error={errors.practiceAddress?.message}
            textarea
          />
          <FormSelect
            label="Your Profession"
            name="profession"
            registration={register("profession")}
            error={errors.profession?.message}
            options={[
              { value: "", label: "Select your profession" },
              { value: "ophthalmologist", label: "Ophthalmologist" },
              { value: "optometrist", label: "Optometrist" },
              { value: "optician", label: "Optician" },
            ]}
            required
          />
          <FormField
            label="Your Country"
            name="country"
            placeholder="e.g. Singapore"
            registration={register("country")}
            error={errors.country?.message}
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <PremiumButton type="submit" disabled={isSubmitting} className="w-full">
          <span>{isSubmitting ? "Submitting" : "Register & Submit"}</span>
          <ArrowRight className="h-4 w-4" />
        </PremiumButton>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
}

function FormField({
  label,
  name,
  registration,
  type = "text",
  placeholder = "",
  textarea = false,
  required = false,
  className = "",
  error,
}: FormFieldProps) {
  const inputClasses =
    "peer w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 pt-5 pb-1.5 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.1)] hover:border-white/15 h-10";
  const errorId = `${name}-error`;

  return (
    <div className={cn("relative group", className)}>
      {textarea ? (
        <textarea
          id={name}
          placeholder={placeholder || label}
          rows={3}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClasses, "h-auto pt-5 pb-3")}
          {...registration}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder || label}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses}
          {...registration}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3.5 top-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-[9px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-focus:text-primary"
      >
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  registration: UseFormRegisterReturn;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

function FormSelect({ label, name, registration, options, required = false, error }: FormSelectProps) {
  const errorId = `${name}-error`;

  return (
    <div className="relative group">
      <select
        id={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="peer w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 pr-10 text-sm text-white outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.1)] hover:border-white/15 appearance-none cursor-pointer h-10"
        style={{
          lineHeight: "2.5rem",
          paddingTop: "1.25rem",
          paddingBottom: "0.375rem",
          verticalAlign: "middle",
        }}
        {...registration}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-background text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3.5 top-0.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground transition-all duration-300 z-10 bg-background px-0.5 py-0"
      >
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-primary/70 transition-all peer-focus:text-primary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
