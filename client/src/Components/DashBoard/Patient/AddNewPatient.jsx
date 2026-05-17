import React, { useCallback, useState } from "react";
import {
  User,
  Phone,
  Heart,
  Activity,
  Camera,
  Save,
  Trash2,
  ArrowRight,
} from "lucide-react";

import {
  InputField,
  SectionHeader,
} from "./InputField";
import { createPatientAction } from "../../../actions/patientAction";
import { useDispatch } from "react-redux";

// import { INITIAL_PATIENT } from "../../../Data/patientdata";
export const INITIAL_PATIENT = {
  userId: "USER-00034",

  age: 41,
  gender: "Male",
  dateOfBirth: "1984-02-15",

  weight: 72,
  height: 175,

  address: "12 Park Street, Apartment 4B",
  city: "Surat",
  state: "Gujarat",
  pincode: 395007,

  bloodGroup: "O+",
  maritalStatus: "Married",
  nationality: "Indian",
};

const sections = [
  { id: "basic", label: "Basic Info", icon: User },
  { id: "physical", label: "Physical Info", icon: Activity },
  { id: "address", label: "Address", icon: Phone },
  { id: "medical", label: "Medical Info", icon: Heart },
];

const AddNewPatient = () => {
  const [formData, setFormData] = useState(INITIAL_PATIENT);
  const [activeSection, setActiveSection] = useState("basic");
  const dispatch = useDispatch();

  const handleChange = useCallback((section, field, value) => {
    setFormData((prev) => {
      if (!section) {
        return { ...prev, [field]: value };
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  }, []);

  const handleSaveSection = async () => {
  const currentIndex = sections.findIndex(
    (s) => s.id === activeSection
  );

  const isLastSection = currentIndex === sections.length - 1;

  if (!isLastSection) {
    const next = sections[currentIndex + 1];
    setActiveSection(next.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // ✅ FINAL SUBMIT (LAST STEP ONLY)
  try {
    console.log("FINAL SUBMIT DATA:", formData);

    // example API call
    // await axios.post("/api/patients", formData);
    const result = await dispatch(createPatientAction(formData));
    console.log("Create patient result:", result);

    // alert("Patient created successfully!");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-8">

        {/* SIDEBAR */}
        <aside className="w-80 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow">
            <User
              className="w-24 h-24 rounded-xl"
            />
            <h1 className="font-bold mt-2">Patient Form</h1>
          </div>

          <nav className="bg-white p-4 rounded-2xl shadow space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl ${
                  activeSection === s.id ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <s.icon size={16} />
                {s.label}
                {activeSection === s.id && <ArrowRight className="ml-auto" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* FORM */}
        <main className="flex-1 bg-white p-10 rounded-2xl shadow">

          {/* BASIC */}
          {activeSection === "basic" && (
            <>
              <SectionHeader icon={User} title="Basic Info" />

              <InputField
                label="User ID"
                value={formData.userId}
                onChange={(v) => handleChange(null, "userId", v)}
              />

              <InputField
                label="Age"
                type="number"
                value={formData.age}
                onChange={(v) => handleChange(null, "age", v)}
              />

              <InputField
                label="Gender"
                value={formData.gender}
                onChange={(v) => handleChange(null, "gender", v)}
              />

              <InputField
                label="DOB"
                type="date"
                value={formData.dateOfBirth}
                onChange={(v) => handleChange(null, "dateOfBirth", v)}
              />
            </>
          )}

          {/* PHYSICAL */}
          {activeSection === "physical" && (
            <>
              <SectionHeader icon={Activity} title="Physical Info" />

              <InputField
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(v) => handleChange(null, "weight", v)}
              />

              <InputField
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={(v) => handleChange(null, "height", v)}
              />
            </>
          )}

          {/* ADDRESS */}
          {activeSection === "address" && (
            <>
              <SectionHeader icon={Phone} title="Address" />

              <InputField
                label="Address"
                value={formData.address}
                onChange={(v) => handleChange(null, "address", v)}
              />

              <InputField
                label="City"
                value={formData.city}
                onChange={(v) => handleChange(null, "city", v)}
              />

              <InputField
                label="State"
                value={formData.state}
                onChange={(v) => handleChange(null, "state", v)}
              />

              <InputField
                label="Pincode"
                type="number"
                value={formData.pincode}
                onChange={(v) => handleChange(null, "pincode", v)}
              />
            </>
          )}

          {/* MEDICAL */}
          {activeSection === "medical" && (
            <>
              <SectionHeader icon={Heart} title="Medical Info" />

              <InputField
                label="Blood Group"
                value={formData.bloodGroup}
                onChange={(v) => handleChange(null, "bloodGroup", v)}
              />

              <InputField
                label="Marital Status"
                value={formData.maritalStatus}
                onChange={(v) => handleChange(null, "maritalStatus", v)}
              />

              <InputField
                label="Nationality"
                value={formData.nationality}
                onChange={(v) => handleChange(null, "nationality", v)}
              />
            </>
          )}

          {/* PROFILE */}
          {activeSection === "profile" && (
            <>
              <SectionHeader icon={Camera} title="Profile Photo" />

              <InputField
                label="Image URL"
                value={formData.profilePhoto.url}
                onChange={(v) =>
                  handleChange("profilePhoto", "url", v)
                }
              />
            </>
          )}

          {/* ACTIONS */}
          <div className="mt-10 flex gap-4">
            <button
              onClick={handleSaveSection}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Save size={18} /> Save
            </button>

            <button className="bg-gray-200 px-6 py-3 rounded-xl flex items-center gap-2">
              <Trash2 size={18} /> Discard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddNewPatient;