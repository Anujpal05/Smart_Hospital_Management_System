export const patients = [
  {
    id: "0220092020001",
    name: "Sanath Deo",
    checkup: "Health Checkup",
    appointment: "09:30 AM",
    status: "On Going",
    dob: "15 January 1989",
    sex: "Male",
    weight: "59 Kg",
    height: "172 cm",
    history: ["Asthma", "Hypertension", "Fever"]
  },
  {
    id: "0220092020002",
    name: "Alexa Smith",
    checkup: "Dental Checkup",
    appointment: "10:00 AM",
    status: "Completed",
    dob: "22 March 1992",
    sex: "Female",
    weight: "54 Kg",
    height: "165 cm",
    history: ["Tooth Pain", "Cavity"]
  },
  {
    id: "0220092020003",
    name: "Michael Brown",
    checkup: "Cardiology",
    appointment: "10:30 AM",
    status: "Completed",
    dob: "03 August 1985",
    sex: "Male",
    weight: "72 Kg",
    height: "178 cm",
    history: ["Hypertension", "Chest Pain"]
  },
  {
    id: "0220092020004",
    name: "Sophia Lee",
    checkup: "Eye Checkup",
    appointment: "11:00 AM",
    status: "Completed",
    dob: "10 December 1995",
    sex: "Female",
    weight: "50 Kg",
    height: "160 cm",
    history: ["Blur Vision", "Headache"]
  },
  {
    id: "0220092020005",
    name: "Daniel Wilson",
    checkup: "General Checkup",
    appointment: "12:00 PM",
    status: "Completed",
    dob: "28 February 1988",
    sex: "Male",
    weight: "68 Kg",
    height: "174 cm",
    history: ["Fever", "Cold"]
  },
  {
    id: "0220092020006",
    name: "Emma Johnson",
    checkup: "Dermatology",
    appointment: "12:30 PM",
    status: "Upcoming",
    dob: "11 July 1993",
    sex: "Female",
    weight: "56 Kg",
    height: "167 cm",
    history: ["Skin Allergy"]
  },
  {
    id: "0220092020007",
    name: "James Anderson",
    checkup: "Orthopedic",
    appointment: "01:00 PM",
    status: "Upcoming",
    dob: "19 September 1981",
    sex: "Male",
    weight: "80 Kg",
    height: "180 cm",
    history: ["Knee Pain", "Back Pain"]
  },
  {
    id: "0220092020008",
    name: "Olivia Martin",
    checkup: "ENT Checkup",
    appointment: "01:30 PM",
    status: "Upcoming",
    dob: "05 May 1997",
    sex: "Female",
    weight: "52 Kg",
    height: "162 cm",
    history: ["Ear Pain", "Cold"]
  },
  {
    id: "0220092020009",
    name: "William Clark",
    checkup: "Cardiology",
    appointment: "03:00 PM",
    status: "Upcoming",
    dob: "14 April 1979",
    sex: "Male",
    weight: "75 Kg",
    height: "176 cm",
    history: ["Hypertension", "Heart Disease"]
  },
  {
    id: "0220092020010",
    name: "Isabella Garcia",
    checkup: "Gynecology",
    appointment: "04:00 PM",
    status: "Upcoming",
    dob: "30 January 1994",
    sex: "Female",
    weight: "58 Kg",
    height: "168 cm",
    history: ["Hormonal Issue"]
  }
];

export const INITIAL_RECORD = {
  patientId: "PAT-2026-001",
  labId: "LAB-02232160XXXX",
  firstName: "Lyubochka",
  middleName: "",
  lastName: "Svetka",
  fullName: "Lyubochka Svetka",
  gender: "Male",
  age: 41,
  dateOfBirth: "1984-02-15",
  maritalStatus: "Married",
  bloodGroup: "O+",
  nationality: "Indian",
  profilePhoto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
  contact: {
    mobileNumber: "+91 9876543210",
    alternatePhone: "+91 9876543211",
    email: "lyubochka.svetka@example.com",
    addressLine1: "12 Park Street",
    addressLine2: "Apartment 4B",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    postalCode: "395007"
  },
  identification: {
    governmentIdType: "Aadhaar",
    governmentIdNumber: "XXXX-XXXX-1234",
    passportNumber: "N1234567",
    panNumber: "ABCDE1234F",
    insuranceId: "INS-88422",
    insuranceProvider: "Star Health Insurance",
    insurancePolicyNumber: "POL-55883921"
  },
  emergencyContact: {
    name: "Priya Svetka",
    relationship: "Wife",
    phone: "+91 9876543000",
    address: "Same as patient address"
  },
  doctorReferral: {
    referringDoctorName: "Dr. Mehta",
    department: "General Medicine",
    doctorContact: "+91 9898989898",
    hospitalName: "City Care Hospital",
    hospitalAddress: "Ring Road, Surat"
  },
  sampleDetails: {
    sampleId: "SMP-2026-554",
    sampleType: "Blood",
    sampleCondition: "Good",
    collectionDate: "2026-03-09",
    collectionTime: "09:30 AM",
    collectedBy: "Lab Technician Rahul",
    collectionLocation: "Sterling Accuris Lab",
    sampleNotes: "Fasting sample"
  },
  clinicalInformation: {
    symptoms: 'Fatigue, increased thirst',
    provisionalDiagnosis: 'Suspected Diabetes',
     clinicalHistory: "Family history of diabetes",
    allergies: 'None',
    currentMedications: 'Metformin',
    pastMedicalHistory: 'Hypertension',
    familyHistory: '',
    doctorNotes: 'Recommend follow-up in 1 month',
    medicalAlerts: {
      diabetic: false,
      hypertension: false,
      heartDisease: false,
      asthma: false
    }
  },
  billing: {
    invoiceNumber: "INV-2026-883",
    testCost: 1500,
    discount: 200,
    tax: 50,
    totalAmount: 1350,
    paidAmount: 1350,
    balanceAmount: 0,
    paymentMode: "UPI",
    paymentStatus: "Paid"
  },
  patientStatus: {
    patientType: 'OPD',
    admissionStatus: 'Under Treatment',
    priority: 'Normal'
  },visitInfo: {
    visitType: 'OPD',
    chiefComplaint: '',
    duration: '',
    severity: 'Normal',
    department: 'General Medicine',
    consultingDoctor: '',
    visitDate: new Date().toISOString().split('T')[0],
  },
};

// --- Initial Data ---

export const INITIAL_APPOINTMENT = {
  patientId: "PAT-2026-045",
  patientName: "Lyubochka Svetka",
  profilePhoto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
  basic: {
    age: 41,
    gender: "Male",
    phone: "+91 98765 43210",
  },
  logistics: {
    department: "General Medicine",
    doctor: "Dr. Mehta",
    date: "2026-03-15",
    time: "10:30",
    visitType: "Consultation",
  },
  medical: {
    symptoms: "Occasional dizziness and high blood pressure readings.",
    existingConditions: "Hypertension",
    allergies: "Penicillin",
  },
  admin: {
    priority: "Normal",
    paymentType: "Insurance",
    notes: "Patient prefers morning slots."
  }
};

export const patientData = {
    name: "Alex Thompson",
    id: "PT-88293",
    age: 32,
    bloodType: "O+",
    vitals: {
      heartRate: "72 bpm",
      bloodPressure: "120/80",
      temp: "98.6°F",
      weight: "74 kg"
    },
    upcomingAppointments: [
      { id: 1, doctor: "Dr. Sarah Jenkins", specialty: "Cardiology", date: "Oct 24, 2023", time: "10:30 AM", status: "Confirmed" },
      { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatology", date: "Nov 02, 2023", time: "02:15 PM", status: "Pending" }
    ],
    recentRecords: [
      { id: 1, type: "Lab Result", title: "Blood Chemistry Profile", date: "Oct 12, 2023", doctor: "Dr. Sarah Jenkins" },
      { id: 2, type: "Prescription", title: "Amoxicillin 500mg", date: "Oct 10, 2023", doctor: "Dr. Robert Wilson" },
      { id: 3, type: "Imaging", title: "Chest X-Ray", date: "Sep 28, 2023", doctor: "Dr. Lisa Ray" }
    ],
    aiInsights: {
      analysis: "Based on your 'Blood Chemistry Profile' from Oct 12, your glucose levels are within the optimal range. However, your Vitamin D levels are slightly lower than the recommended 30 ng/mL.",
      suggestions: [
        "Increase sun exposure (15 mins daily)",
        "Incorporate Vitamin D-rich foods like salmon or egg yolks",
        "Maintain current cardiovascular exercise routine"
      ],
      warning: "Your Blood Pressure (120/80) is perfect. No immediate action required."
    }
  };

  export const INITIAL_PATIENT = {
    name: "anuj mazari",
    age: "41",
    sex: "Male",
    userId:"USER-00034",
    labId: "02232160XXXX",
    regDate: "20-Feb-2023 09:10",
    collectedOn: "20-Feb-2023 08:53",
    sampleType: "EDTA Blood, Serum",
    reportName: "Complete Blood Count (CBC)",
    refBy: "Dr. Michael Johnson",
    passportNo: "N/A",
    remarks: "RBC Morphology: Normochromic Normocytic. WBCs Series shows normal morphology. Platelets are adequate with normal morphology. Malarial parasite is not detected."
  };
  
  export const INITIAL_TESTS = [
    { id: 1, name: "Hemoglobin", result: "14.5", unit: "g/dL", ref: "13.0-16.5", flag: "" },
    { id: 2, name: "Fasting Blood Sugar", result: "141.0", unit: "mg/dL", ref: "74-106", flag: "H" },
    { id: 3, name: "HbA1c", result: "7.10", unit: "%", ref: "4.0-5.6", flag: "H" },
    { id: 4, name: "Cholesterol", result: "189.0", unit: "mg/dL", ref: "< 200", flag: "" },
  ];