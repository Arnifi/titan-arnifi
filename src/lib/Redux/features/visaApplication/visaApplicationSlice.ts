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

export enum CompanyStatusType {
  OPEN = "Open",
  SUBMITTED = "Form Submitted",
  INREVIEWARNIFI = "In review - Arnifi",
  REJECTEDARNIFI = "Rejected - Arnifi",
  WAITINGGA = "Waiting on Government Authority",
  REJECTEDGA = "Rejected - Government Authority",
  RESOLUTIONSIGNED = "Resolution E-signature required",
  MOAAOASIGNED = "MOA/AOA E-signature required",
  COMPLETED = "Completed",
}

export enum CompanyStepTypes {
  OPEN = "Open",
  FORMSUBMITTED = "Form Submitted",
  INREVIEWARNIFI = "In review - Arnifi",
  APPLYGA = "Apply on GA portal",
  MAKEPAYMENT = "Make Payment",
  UPLOADPROOF = "Upload Payment Proof",
  REJECTEDARNIFI = "Rejected - Arnifi",
  WAITINGPAYMENTVERIFICATION = "Waiting for Payment Verification",
  REJECTEDGA = "Rejected at GA",
  UPLOADRESPONSES = "Upload Responses",
  WAITINGUPDATEREJECTION = "Waiting for update on Rejection",
  RESOLUTIONSIGNED = "Resolution to be signed",
  WAITINGLICENSEAPPROVAL = "Waiting for License Approval",
  MOAAOASIGNED = "MOA/AOA to be signed",
  WAITINGLICENSE = "Waiting on License",
  WAITINGFORESTABLISHMENTCARD = "Waiting for Establishment Card",
  COMPLETED = "Completed",
}

export interface IVisaApplicationtatus {
  id: number;
  currentStatus: CompanyStatusType;
  currentStep: CompanyStepTypes;
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
  visa_status: IVisaApplicationtatus;
  linkto: number;
  username: string;
}

const initialState = {
  applications: [] as IVisaApplication[],
  status: [] as IVisaApplicationtatus[],
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
      state.status = status;
    },
  },
});

export const { setVisaApplications } = visaApplicationSlice.actions;
export default visaApplicationSlice.reducer;
