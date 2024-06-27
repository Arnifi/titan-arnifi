import { createSlice } from "@reduxjs/toolkit";

export enum ApplicationStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "inProgress",
  COMPLETED = "done",
}

export interface IDocument {
  id?: number;
  name: string;
  url: string;
}

export enum VisaStatusType {
  Open = "Open",
  ReviewAtArnifi = "Review at Arnifi",
  RejectedAtArnifi = "Rejected at Arnifi",
  WaitingOnGA = "Waiting on Government Authority",
  RejectedByGA = "Rejected by Government Authority",
  EmploymentAgreementEsignRequired = "Employment Agreement E-sign Required",
  EvisaIssued = "Evisa issued",
  MedicalAppointment = "Medical Appointment",
  EmiratesIDAppointment = "Emirates ID Appointment",
  ResidenceVisaIssued = "Residence Visa issued",

  // olds
  OPEN = "Open",
  SUBMITTED = "Form Submitted",
  REJECTEDARNIFI = "Rejected - Arnifi",
  INREVIEWARNIFI = "In review - Arnifi",
  WAITINGGA = "Waiting on Government Authority",
  REJECTEDGA = "Rejected - Government Authority",
  REJECTEDEMPLOYEEAGREEMENT = "Rejected - Employee agreement signature required",
  REJECTEDEVISA = "Rejected - Evisa issued",
  MEDICALAPPOINTMENT = "Medical Appointment",
  EMIRATESIDAPPOINTMENT = "Emirates id Appointment",
  COMPLETED = "Completed",
}

export enum VisaStepsTypes {
  Open = "Open",
  ReviewAtArnifi = "Review at Arnifi",
  RejectedAtArnifi = "Rejected at Arnifi",
  ApplyOnPortal = "Apply on portal",
  MakePaymentGA = "Make Payment to Government Authority",
  WaitingForUpdateFromGA = "Waiting for update from Government Authority",
  RejectedByGA = "Rejected by Government Authority",
  UploadRejectionComments = "Upload Rejection comments",
  EmploymentAgreementSigning = "Employment Agreement signing",
  WaitingForEvisa = "Waiting for Evisa",
  EvisaIssued = "Evisa Issued",
  MedicalAppointmentBooking = "Medical Appointment booking",
  WaitingForMedicalReports = "Waiting for Medical Reports",
  EmiratesIDAppointmentBooking = "Emirates ID Appointment Booking",
  WaitingForEmiratesIDForm = "Waiting for Emirates ID form",
  ApplyForVisaStamping = "Apply for Visa Stamping",
  WaitingForResidenceVisa = "Waiting for Residence Visa",
  ResidenceVisaIssued = "Residence Visa issued",

  // olds
  OPEN = "Open",
  FORMSUBMITTED = "Form Submitted",
  INREVIEWARNIFI = "In review - Arnifi",
  REJECTEDARNIFI = "Rejected at Arnifi",
  APPLYGA = "Apply on GA portal",
  MAKEPAYMENTTOGA = "Make Payment to GA",
  UPLOADPROOF = "Upload Payment Proof",
  WAITINGPAYMENTVERIFICATION = "Waiting for Payment Verification",
  REJECTEDGA = "Rejected at GA",
  UPLOADRESPONSES = "Upload Responses",
  WAITINGUPDATEREJECTION = "Waiting for update on Rejection",
  EMPLOYMENTCONTRACTSIGNED = "Employment contract to be signed",
  WAITINGFOREVISA = "Waiting for Evisa",
  CLIENTVISITEDUAE = "Have client visited UAE",
  INITIATECHANGESTATUS = "Initiate Change Status",
  WAITINGCHANGESTATUSCONFIRM = "Waiting for Change status confirm",
  MEDICALAPPOINTMENT = "Medical Appointment",
  WAITINGMEDICALREPORT = "Waiting for Medical Report",
  APPLYEMIRATESID = "Apply for Emirates ID",
  EMIRATESIDAPPOINTMENT = "Emirates ID appointment",
  APPLYVISASTAMPING = "Apply for visa stamping",
  WAITRESIDENCEVISA = "Wait for Residence Visa",
  WAITEMIRATESID = "Wait for emirates ID",
  COMPLETED = "Completed",
}

export interface IVisaApplicationStatus {
  id: number;
  Remarks: string;
  paymentProof: IDocument[];
  paymentInvoice: IDocument[];
  eVisa: IDocument[];
  medicalReports: IDocument[];
  rejectionComments: string;
  rejectionFiles: IDocument[];
  location: string;
  step: VisaStepsTypes;
  status: VisaStatusType;
  clientMessage: string;
  residenceVisa: {
    visaIssueDate: Date;
    visaExpiryDate: Date;
    document: IDocument[];
  };
  emirateIdAcForm: {
    uIdNumber: string;
    fileNumber: string;
    document: IDocument[];
  };

  currentStatus: VisaStatusType;
  currentStep: VisaStepsTypes;
  message: string;
  userComment?: string;
  agentComment?: string;
  commentsFormGA?: string;
  updatedAt: Date;
}

export interface IVisaApplication {
  id?: number;
  status: ApplicationStatus;
  shareholderID: number;
  visaType: string;
  personalDetails: {
    title: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: {
      countryCode: string;
      number: string;
    };
    gender: string;
    dateOfBirth: {
      day: string;
      month: string;
      year: string;
    };
    cityOfBirth: string;
    nationality: string;
    countryOfBirth: string;
  };
  addressDetails: {
    isUAEAddress: string;
    address: {
      line1: string;
      line2: string;
    };
    uaeAddress: {
      line1: string;
      line2: string;
    };
  };
  otherDetails: {
    martialStatus: string;
    education: string;
    religion: string;
  };
  employmentDetails: {
    jobTitle: string;
    duration: string;
    startDate: string;
    probationPeriod: string;
    terminationNotice: string;
    annualReturnTicket: string;
    annualLeaveEntitlement: string;
    numberOfLeaves: string;
  };
  salaryDetails: {
    basicSalary: string;
    accommodationAllowance: string;
    transportationAllowance: string;
    otherAllowance: string;
    totalSalary: string;
  };
  passportDetails: {
    type: string;
    passportNumber: string;
    countryOfIssue: string;
    placeOfIssue: string;
    fatherName: string;
    motherName: string;
    issueDate: string;
    expiryDate: string;
  };
  documents: {
    isCurrentlyResidingCountry: string;
    isLegalResident: string;
    isOtherDocument: string;
  };
  passportFont: IDocument;
  passportBack: IDocument;

  photograph: IDocument;
  oldVisa: IDocument;
  emiratesID: IDocument;
  otherDocuments: IDocument[];
  isCurrentlyResidingCountry: string;
  isLegalResident: string;
  isOtherDocument: string;
  visa_status: IVisaApplicationStatus;
  applicationStatus: IVisaApplicationStatus;
  linkto: number;
  username: string;
  companyName: string;
  jurisdiction: string;
}

const initialState = {
  applications: [] as IVisaApplication[],
};

const visaApplicationSlice = createSlice({
  name: "visaApplications",
  initialState,
  reducers: {
    setVisaApplications: (
      state,
      { payload }: { payload: IVisaApplication[] }
    ) => {
      state.applications = payload;
    },
    setUpdatedVisaApplicationInfo: (
      state,
      { payload }: { payload: IVisaApplication }
    ) => {
      const updatedInfoId = payload?.id;

      const findIndex = state.applications?.findIndex(
        (application) => application?.id === updatedInfoId
      );

      if (findIndex !== -1) {
        state.applications[findIndex] = payload;
      }
    },
  },
});

export const { setVisaApplications, setUpdatedVisaApplicationInfo } =
  visaApplicationSlice.actions;
export default visaApplicationSlice.reducer;
