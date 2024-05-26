import { createSlice } from "@reduxjs/toolkit";

export enum ApplicationStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "inProgress",
  COMPLETED = "done",
}

export interface IDocument {
  data: {
    id?: number;
    attributes: {
      name: string;
      url: string;
    };
  };
}

export enum VisaStatusType {
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

  photograph: {
    data: {
      id?: number;
      attributes: {
        name: string;
        url: string;
      };
    };
  };
  oldVisa: {
    data: {
      id?: number;
      attributes: {
        name: string;
        url: string;
      };
    };
  };
  emiratesID: {
    data: {
      id?: number;
      attributes: {
        name: string;
        url: string;
      };
    };
  };
  otherDocuments: {
    data: {
      id?: number;
      attributes: {
        name: string;
        url: string;
      };
    };
  };
  isCurrentlyResidingCountry: string;
  isLegalResident: string;
  isOtherDocument: string;
  visa_status: IVisaApplicationStatus;
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
      const status = payload.map((application) => {
        return application?.visa_status;
      });
      state.applications = payload;
    },
  },
});

export const { setVisaApplications } = visaApplicationSlice.actions;
export default visaApplicationSlice.reducer;
