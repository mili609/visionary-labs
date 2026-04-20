import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumButton } from "@/components/PremiumButton";
import { useState, useEffect } from "react";
import { ArrowRight, User, Stethoscope, Upload, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GetStarted = () => {
  const [tab, setTab] = useState<"patient" | "practitioner">("patient");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      <main className="pt-28 md:pt-40 pb-24 md:pb-32">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-secondary/6 to-transparent rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Hero Section - Compact */}
        <section className={cn(
          "relative mb-12 md:mb-16 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="container-premium max-w-4xl">
            <div className="text-center space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Have access to<br className="hidden sm:inline" /> MyoPREVA
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Be part of the expert panel to fit MyoPREVA™
              </p>
            </div>
          </div>
        </section>

        {/* Form Section - Compact Layout */}
        <section className="relative">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
            {/* Premium Tab Switcher - Compact */}
            <div className={cn(
              "flex justify-center mb-9 transition-all duration-1000",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
              <div className="glass relative inline-flex rounded-full p-0.5">
                <span
                  className={cn(
                    "absolute inset-y-0.5 w-1/2 rounded-full bg-gradient-primary shadow-glow transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    tab === "patient" ? "left-0.5" : "left-[calc(50%+0.125rem)]"
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
                      "relative z-10 flex items-center justify-center gap-1.5 rounded-full py-2 px-4 md:px-5 text-xs md:text-sm font-semibold transition-colors duration-300 group whitespace-nowrap h-10",
                      tab === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    <t.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden text-xs">{t.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Card - Premium Centered Width */}
            <div className={cn(
              "glass-card rounded-3xl p-8 md:p-12 shadow-elevated transition-all duration-1000 max-w-4xl mx-auto",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div key={tab} className="animate-fade-in">
                {/* Form Header */}
                <div className="mb-7 space-y-1.5">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {tab === "patient" ? "Order MyoPREVA™" : "Become a Provider"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tab === "patient"
                      ? "Complete your assessment to get started"
                      : "Join our network of certified professionals"}
                  </p>
                </div>

                {/* Form Content */}
                {tab === "patient" ? <PatientForm /> : <PractitionerForm />}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

function PatientForm() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const validTypes = ["image/dicom", "image/png", "image/jpeg"];
      if (!validTypes.includes(file.type) && !file.name.endsWith(".dcm")) {
        toast.error("Only DICOM, PNG, and JPEG files are supported");
        return;
      }
      setUploadedFile(file.name);
      toast.success("File uploaded successfully");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientId || !formData.lastName || !formData.email || !formData.productOption) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Your assessment has been submitted. We'll be in touch shortly.");
    setFormData({
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
    });
    setUploadedFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Upload Fundus Photos */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-white uppercase tracking-wider opacity-70 block">
          Upload Fundus Photos
          <span className="text-destructive ml-1">*</span>
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
                <p className="text-xs text-muted-foreground">DICOM, PNG, JPEG • Max 5MB</p>
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

      {/* Patient Information Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="Patient ID"
            name="patientId"
            value={formData.patientId}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Clinical Measurements Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">
          Clinical Measurements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="R. Refraction (D)"
            name="rRefraction"
            placeholder="e.g. -2.50"
            value={formData.rRefraction}
            onChange={handleInputChange}
          />
          <FormField
            label="R. Axial Length (mm)"
            name="rAxialLength"
            placeholder="e.g. 24.5"
            value={formData.rAxialLength}
            onChange={handleInputChange}
          />
          <FormField
            label="L. Refraction (D)"
            name="lRefraction"
            placeholder="e.g. -2.25"
            value={formData.lRefraction}
            onChange={handleInputChange}
          />
          <FormField
            label="L. Axial Length (mm)"
            name="lAxialLength"
            placeholder="e.g. 24.3"
            value={formData.lAxialLength}
            onChange={handleInputChange}
          />
        </div>

        {/* Cycloplegia Applied */}
        <div className="space-y-2 pt-0.5">
          <label className="text-xs font-semibold text-white uppercase tracking-wider opacity-60 block">
            Cycloplegia Applied?
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {["Yes", "No"].map((option) => (
              <label key={option} className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="cycloplegia"
                  value={option}
                  checked={formData.cycloplegia === option}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={cn(
                  "px-3 py-2 rounded-lg border text-center font-medium text-sm transition-all duration-300 h-10 flex items-center justify-center",
                  formData.cycloplegia === option
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-primary/40 hover:text-white"
                )}>
                  {option}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Treatment Plan Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">
          Treatment Plan
        </h3>
        <div className="space-y-3">
          <FormSelect
            label="Select Product Option"
            name="productOption"
            value={formData.productOption}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Choose an option" },
              { value: "standard", label: "MyoPREVA Standard" },
              { value: "premium", label: "MyoPREVA Premium" },
            ]}
            required
          />
          <FormField
            label="Other Combination Treatment"
            name="otherTreatment"
            placeholder="Please indicate if applicable"
            value={formData.otherTreatment}
            onChange={handleInputChange}
            textarea
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <PremiumButton type="submit" className="w-full">
          <span>Continue to Order</span>
          <ArrowRight className="h-4 w-4" />
        </PremiumButton>
      </div>
    </form>
  );
}

function PractitionerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    practiceName: "",
    practiceAddress: "",
    profession: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.profession || !formData.country) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Your application has been submitted. We'll review it shortly.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      practiceName: "",
      practiceAddress: "",
      profession: "",
      country: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Personal Details Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Practice Information Section */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider opacity-60">
          Practice Information
        </h3>
        <div className="space-y-3">
          <FormField
            label="Practice Name"
            name="practiceName"
            value={formData.practiceName}
            onChange={handleInputChange}
          />
          <FormField
            label="Practice Address"
            name="practiceAddress"
            value={formData.practiceAddress}
            onChange={handleInputChange}
            textarea
          />
          <FormSelect
            label="Your Profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
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
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <PremiumButton type="submit" className="w-full">
          <span>Register & Submit</span>
          <ArrowRight className="h-4 w-4" />
        </PremiumButton>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  required?: boolean;
  className?: string;
}

function FormField({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  textarea = false,
  required = false,
  className = "",
}: FormFieldProps) {
  const inputClasses =
    "peer w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 pt-5 pb-1.5 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.1)] hover:border-white/15 h-10";

  return (
    <div className={cn("relative group", className)}>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          rows={3}
          className={cn(inputClasses, "h-auto pt-5 pb-3")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3.5 top-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-[9px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-focus:text-primary"
      >
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: FormSelectProps) {
  return (
    <div className="relative group">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="peer w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 pr-10 text-sm text-white outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.1)] hover:border-white/15 appearance-none cursor-pointer h-10"
        style={{
          lineHeight: "2.5rem",
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          verticalAlign: "middle",
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-background text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <label className="pointer-events-none absolute left-3.5 top-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground transition-all duration-300 z-10">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-primary/70 transition-all peer-focus:text-primary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

export default GetStarted;
