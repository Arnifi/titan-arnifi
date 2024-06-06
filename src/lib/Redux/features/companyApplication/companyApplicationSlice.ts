import { createSlice } from "@reduxjs/toolkit";

export interface IUploadImage {
  id: number;
  name: string;
  url: string;
}

export interface ICompanyDetails {
  companyNames: {
    option1: string;
    option2: string;
    option3: string;
  };
  licenseType: string;
  shareCapital: {
    totalShareholders: string;
    totalShareCapital: string;
    shareValue: string;
    totalNoOfShares: string;
    capitalPerShareholder: string;
  };
}

export interface IActivity {
  name: string;
  code: string;
}

export interface IActivityDetails {
  id?: number;
  activities: IActivity[] | null[];
}

export interface IDateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface IShareholder {
  id: number;
  passportFont: IUploadImage;
  passportBack: IUploadImage;
  emiratesID: IUploadImage;
  shareholderDetails: {
    name: {
      title: string;
      firstName: string;
      middleName: string;
      lastName: string;
    };
    email: string;
    phone: {
      countryCode: string;
      number: string;
    };
    address: {
      line1: string;
      line2: string;
    };
    shareNumber: string;
    gender: string;
    dateOfBirth: IDateOfBirth;
    cityOfBirth: string;
    passportDetails: {
      passportNumber: string;
      countryOfIssue: string;
      issueDate: string;
      expiryDate: string;
      address: string;
      fatherName: string;
      motherName: string;
      placeOfIssue: string;
    };
  };
}

export interface IUboDecleration {
  agreeStatement: boolean;
  decleration: string;
  confirmation: string;
  gmName: string;
  gmEmail: string;
}

export enum CompanyStatusType {
  Open = "Open",
  ReviewAtArnifi = "Review at Arnifi",
  RejectedAtArnifi = "Rejected at Arnifi",
  WaitingOnGovernmentAuthority = "Waiting on Government Authority",
  RejectedByGA = "Rejected by Government Authority",
  ResolutionEsignRequired = "Resolution E-sign Required",
  MOAAOAEsignRequired = "MOA/ AOA E-sign required",
  LicenseIssued = "License Issued",
  Completed = "Completed",

  // olds
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
  Open = "Open",
  ReviewAtArnifi = "Review at Arnifi",
  RejectedAtArnifi = "Rejected at Arnifi",
  ApplyOnPortal = "Apply on portal",
  MakePaymentToGA = "Make Payment to Government Authority",
  WaitingForUpdateFromGA = "Waiting for update from Government Authority",
  RejectedByGA = "Rejected by Government Authority",
  UploadRejectionComments = "Upload Rejection comments",
  ResolutionSigning = "Resolution signing",
  MOAAOASigning = "MOA/ AOA signing",
  LicenseIssued = "License Issued",
  WaitingEstablishmentCard = "Waiting for Establishment Card",
  Completed = "Completed",

  // olds
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

export interface ICompanyStatus {
  id: number;
  currentStatus: CompanyStatusType;
  currentStep: CompanyStepTypes;
  message: string;
  userComment?: string;
  agentComment?: string;
  commentsFormGA?: string;
  updatedAt: Date;
}

export interface ICompanyApplication {
  id: number | null;
  user: number | null;
  status?: string;
  companyDetails: ICompanyDetails;
  activityDetails: IActivityDetails;
  shareholders: IShareholder[];
  uboDecleration: IUboDecleration;
  company_status: ICompanyStatus;
  linkto: number | null;
  username: string;
  jurisdiction: string;
}

const initialState = {
  applications: [] as ICompanyApplication[],
};

const companyApplicationSlice = createSlice({
  name: "companyApplications",
  initialState,
  reducers: {
    setCompanyApplications: (
      state,
      { payload }: { payload: ICompanyApplication[] }
    ) => {
      state.applications = payload;
    },

    setUpdatedCompanyApplicationInfo: (
      state,
      { payload }: { payload: ICompanyApplication }
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

export const { setCompanyApplications, setUpdatedCompanyApplicationInfo } =
  companyApplicationSlice.actions;
export default companyApplicationSlice.reducer;
