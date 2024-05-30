import { Box, Paper } from "@mui/material";
import React from "react";
import OpenStatusAction from "./OpenStatusAction";
import FormSubmitAction from "./FormSubmitAction";
import InreviewAction from "./InreviewAction";
import RejectAgentAction from "./RejectAgentAction";
import ApplyGAPortal from "./ApplyGAPortal";
import UploadPaymentProof from "./UploadPaymentProof";
import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyApplication,
  ICompanyStatus,
  setUpdatedCompanyApplicationInfo,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { useUpdateCompanyStatusMutation } from "@/lib/Redux/features/companyStatus/companyStatusApi";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import RejectGAAction from "./RejectGAAction";
import WaitGARejection from "./WaitGARejection";
import ResolutionEsignature from "./ResolutionEsignature";
import MOAEsignature from "./MOAEsignature";
import WaitingLicense from "./WaitingLicense";
import WaitingPaymentResponse from "./WaitingPaymentResponse";
import PaymentSuccessfull from "./PaymentSuccessfull";
import WaitingPaymentVerification from "./WaitingPaymentVerification";
import WaitingLicenseApproval from "./WaitingLicenseApproval";
import WaitingEstablishmentCard from "./WaitingEstablishmentCard";
import CompletedStatus from "./CompletedStatus";

interface IProps {
  data: ICompanyApplication;
}
const CompanyFormActions: React.FC<IProps> = ({ data }) => {
  const currentStatus = data?.company_status?.currentStatus;
  const currentStep = data?.company_status?.currentStep;

  const [updateCompanyStatus, { isLoading }] = useUpdateCompanyStatusMutation();
  const dispatch = useAppDispatch();
  const handleStatusChange = (updateStatus: Partial<ICompanyStatus>): void => {
    const formData = new FormData();

    const {
      agentComment,
      commentsFormGA,
      currentStatus,
      currentStep,
      message,
    } = updateStatus;

    formData.append(
      "currentStatus",
      currentStatus ?? data?.company_status?.currentStatus
    );
    formData.append(
      "currentStep",
      currentStep ?? data?.company_status?.currentStep
    );

    formData.append("message", message ?? data?.company_status?.message);

    formData.append(
      "agentComment",
      agentComment ?? (data?.company_status?.agentComment as string)
    );

    formData.append(
      "commentsFormGA",
      commentsFormGA ?? (data?.company_status?.commentsFormGA as string)
    );

    updateCompanyStatus({ id: data?.company_status?.id, data: formData })
      .then((res) => {
        const updatedCompanyInfo = {
          ...data,
          company_status: { ...data?.company_status, ...updateStatus },
        };
        dispatch(setUpdatedCompanyApplicationInfo(updatedCompanyInfo));
        dispatch(
          openSnackbar({
            isOpen: true,
            message: "Company Status Updated",
            type: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper variant="outlined" sx={{ padding: "20px", height: "70vh" }}>
      {/* company admin actions */}
      {currentStatus === CompanyStatusType.OPEN &&
      currentStep === CompanyStepTypes.OPEN ? (
        <OpenStatusAction />
      ) : currentStatus === CompanyStatusType.SUBMITTED &&
        currentStep === CompanyStepTypes.FORMSUBMITTED ? (
        <FormSubmitAction
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : (currentStatus === CompanyStatusType.INREVIEWARNIFI &&
          currentStep === CompanyStepTypes.INREVIEWARNIFI) ||
        currentStep === CompanyStepTypes.FORMSUBMITTED ? (
        <InreviewAction
          agentComment={data?.company_status?.agentComment as string}
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.REJECTEDARNIFI &&
        currentStep === CompanyStepTypes.REJECTEDARNIFI ? (
        <RejectAgentAction message={data?.company_status?.message as string} />
      ) : currentStatus === CompanyStatusType.INREVIEWARNIFI &&
        currentStep === CompanyStepTypes.APPLYGA ? (
        <ApplyGAPortal
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.INREVIEWARNIFI &&
        currentStep === CompanyStepTypes.MAKEPAYMENT ? (
        <PaymentSuccessfull
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.INREVIEWARNIFI &&
        currentStep === CompanyStepTypes.UPLOADPROOF ? (
        <UploadPaymentProof
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.INREVIEWARNIFI &&
        currentStep === CompanyStepTypes.UPLOADPROOF ? (
        <WaitingPaymentResponse
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.WAITINGGA &&
        currentStep === CompanyStepTypes.WAITINGPAYMENTVERIFICATION ? (
        <WaitingPaymentVerification
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.REJECTEDGA &&
        (currentStep === CompanyStepTypes.REJECTEDGA ||
          currentStep === CompanyStepTypes.UPLOADRESPONSES) ? (
        <RejectGAAction
          message={data?.company_status?.commentsFormGA as string}
          userComment={data?.company_status?.userComment as string}
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.REJECTEDGA &&
        currentStep === CompanyStepTypes.WAITINGUPDATEREJECTION ? (
        <WaitGARejection
          message={data?.company_status?.commentsFormGA as string}
          userComment={data?.company_status?.userComment as string}
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.RESOLUTIONSIGNED &&
        currentStep === CompanyStepTypes.RESOLUTIONSIGNED ? (
        <ResolutionEsignature
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.WAITINGGA &&
        currentStep === CompanyStepTypes.WAITINGLICENSEAPPROVAL ? (
        <WaitingLicenseApproval
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.MOAAOASIGNED &&
        currentStep === CompanyStepTypes.MOAAOASIGNED ? (
        <MOAEsignature
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.WAITINGGA &&
        currentStep === CompanyStepTypes.WAITINGLICENSE ? (
        <WaitingLicense
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.WAITINGGA &&
        currentStep === CompanyStepTypes.WAITINGFORESTABLISHMENTCARD ? (
        <WaitingEstablishmentCard
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === CompanyStatusType.COMPLETED &&
        currentStep === CompanyStepTypes.COMPLETED ? (
        <CompletedStatus />
      ) : null}
    </Paper>
  );
};

export default CompanyFormActions;
