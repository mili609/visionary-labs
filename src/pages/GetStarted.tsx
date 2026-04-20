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
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />
      
      <main className="pt-28 md:pt-40 pb-24 md:pb-32 light-section">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-secondary/6 to-transparent rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Hero Section - Compact */}
        <section className={cn(
          "relative mb-12 md:mb-20 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="container-premium max-w-4xl">
            <div className="text-center space-y-4 md:space-y-6 pt-8 md:pt-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-display">
                Have access to<br className="hidden sm:inline" /> MyoPREVA™
              </h1>
              
              <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
                Complete your profile to begin ordering MyoPREVA™ or register as a provider
              </p>
            </div>
          </div>
        </section>

        {/* Form Section - Compact Layout */}
        <section className="relative">
          <div className="w-full max-w-[1080px] mx-auto px-4 md:px-8">
            {/* Premium Tab Switcher - Compact */}
            <div className={cn(
              "flex justify-center mb-12 transition-all duration-1000",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
              <div className="glass-light relative inline-flex rounded-full p-1 gap-0">
                <span
                  className={cn(
                    "absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-primary shadow-glow transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    tab === "patient" ? "left-1" : "right-1"
                  )}
                />
                {([
                  { id: "patient", label: "Order Details", icon: User },
                  { id: "practitioner", label: "Doctor Registration", icon: Stethoscope },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "relative z-10 flex-1 min-w-0 flex items-center justify-center gap-1.5 rounded-full py-2 px-3 md:px-4 text-xs md:text-sm font-semibold transition-colors duration-300 group h-10 whitespace-nowrap",
                      tab === t.id ? "text-primary-foreground" : "text-slate-700 hover:text-slate-900"
                    )}
                  >
                    <t.icon className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                    <span className="hidden sm:inline truncate">{t.label}</span>
                    <span className="sm:hidden text-xs truncate">{t.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Card - Premium Centered Width */}
            <div className={cn(
              "glass-card-light rounded-3xl p-8 md:p-12 shadow-light transition-all duration-1000 mx-auto",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div key={tab} className="animate-fade-in">
                {/* Form Header */}
                <div className="mb-10 space-y-1.5">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {tab === "patient" ? "Order MyoPREVA™" : "Become a Provider"}
                  </h2>
                  <p className="text-sm text-slate-700">
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Upload Fundus Photos */}
      <div className="space-y-4">
        <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80 block">
          Upload Fundus Photos
        </label>
        <div className="relative group">
          <input
            type="file"
            accept=".dcm,image/png,image/jpeg"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="relative border-2 border-dashed border-primary/25 rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/45 hover:bg-primary/[0.03] group-hover:shadow-lg hover:shadow-[0_0_30px_hsl(197_100%_50%/0.1)]">
            <div className="flex flex-col items-center gap-2.5 text-center">
              <div className="p-2.5 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-slate-900 font-medium text-sm">Drag and drop or click to browse</p>
                <p className="text-xs text-slate-600">DICOM, PNG, JPEG • Max 5MB</p>
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
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80">
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="Patient ID"
            name="patientId"
            value={formData.patientId}
            onChange={handleInputChange}
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Clinical Measurements Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80">
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
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80 block">
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
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-slate-300 bg-slate-100 text-slate-700 hover:border-primary/50 hover:text-slate-900"
                )}>
                  {option}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Treatment Plan Section */}
      <div className="space-y-4 mt-8">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80">
          Treatment Plan
        </h3>
        <div className="space-y-6">
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
      <div className="pt-8">
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Details Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80">
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
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80">
          Practice Information
        </h3>
        <div className="space-y-4">
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
          {/* Your Country Field - Exact FormSelect Match */}
          <div className="space-y-2">
            <label htmlFor="country" className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80 block">
              Your Country
              <span className="text-destructive ml-0.5">*</span>
            </label>
            <div className="relative group">
              <input
                id="country"
                name="country"
                type="text"
                placeholder="e.g. Singapore"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary focus:bg-blue-50 focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.12)] hover:border-slate-400 h-12"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
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
    "peer w-full rounded-lg border border-slate-300 bg-white px-3.5 pt-5 pb-1.5 text-sm text-slate-900 placeholder-transparent outline-none transition-all duration-300 focus:border-primary/60 focus:bg-blue-50 focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.12)] hover:border-slate-400 h-10";

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
        className="pointer-events-none absolute left-3.5 top-1 text-[9px] font-semibold uppercase tracking-widest text-slate-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 peer-focus:top-1 peer-focus:text-[9px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-focus:text-primary"
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
    <div className="space-y-2">
      <label htmlFor={name} className="text-xs font-semibold text-slate-900 uppercase tracking-wider opacity-80 block">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <div className="relative group">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary focus:bg-blue-50 focus:shadow-[0_0_0_3px_hsl(197_100%_50%/0.12)] hover:border-slate-400 appearance-none cursor-pointer h-12"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
