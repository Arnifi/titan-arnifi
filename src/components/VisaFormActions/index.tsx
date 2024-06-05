import { Box } from "@mui/material";
import React from "react";
import OpenStatusAction from "./OpenStatusAction";
import FormSubmitAction from "./FormSubmitAction";
import InreviewAction from "./InreviewAction";
import RejectAgentAction from "./RejectAgentAction";
import ApplyGAPortal from "./ApplyGAPortal";
import UploadPaymentProof from "./UploadPaymentProof";
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
import {
  IVisaApplication,
  IVisaApplicationStatus,
  VisaStatusType,
  VisaStepsTypes,
  setUpdatedVisaApplicationInfo,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import { useUpdateVisaStatusMutation } from "@/lib/Redux/features/visaStatus/visaStatusApi";

interface IProps {
  data: IVisaApplication;
}
const VisaFormActions: React.FC<IProps> = ({ data }) => {
  const currentStatus = data?.visa_status?.currentStatus;
  const currentStep = data?.visa_status?.currentStep;

  const [updateVisaStatus, { isLoading }] = useUpdateVisaStatusMutation();
  const dispatch = useAppDispatch();
  const handleStatusChange = (
    updateStatus: Partial<IVisaApplicationStatus>
  ): void => {
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
      currentStatus ?? data?.visa_status?.currentStatus
    );

    formData.append(
      "currentStep",
      currentStep ?? data?.visa_status?.currentStep
    );

    formData.append("message", message ?? data?.visa_status?.message);

    formData.append(
      "agentComment",
      agentComment ?? (data?.visa_status?.agentComment as string)
    );

    formData.append(
      "commentsFormGA",
      commentsFormGA ?? (data?.visa_status?.commentsFormGA as string)
    );

    updateVisaStatus({ id: data?.visa_status?.id, data: formData })
      .then((res) => {
        const updatedVisaInfo = {
          ...data,
          visa_status: { ...data?.visa_status, ...updateStatus },
        };
        dispatch(setUpdatedVisaApplicationInfo(updatedVisaInfo));
        dispatch(
          openSnackbar({
            isOpen: true,
            message: "Visa Status Updated",
            type: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      {currentStatus === VisaStatusType.OPEN &&
      currentStep === VisaStepsTypes.OPEN ? (
        <OpenStatusAction />
      ) : (currentStatus === VisaStatusType.INREVIEWARNIFI &&
          currentStep === VisaStepsTypes.INREVIEWARNIFI) ||
        currentStep === VisaStepsTypes.FORMSUBMITTED ? (
        <InreviewAction
          statusHandlar={handleStatusChange}
          agentComment={data?.visa_status?.agentComment as string}
          isLoading={isLoading}
        />
      ) : currentStatus === VisaStatusType.REJECTEDARNIFI &&
        currentStep === VisaStepsTypes.REJECTEDARNIFI ? (
        <RejectAgentAction message={data?.visa_status?.message as string} />
      ) : (currentStatus === VisaStatusType.INREVIEWARNIFI ||
          currentStatus === VisaStatusType.REJECTEDARNIFI) &&
        currentStep === VisaStepsTypes.APPLYGA ? (
        <ApplyGAPortal
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : currentStatus === VisaStatusType.INREVIEWARNIFI &&
        currentStep === VisaStepsTypes.MAKEPAYMENTTOGA ? (
        <PaymentSuccessfull
          statusHandlar={handleStatusChange}
          isLoading={isLoading}
        />
      ) : null}
    </Box>
    // <Box>
    //   {currentStatus === VisaStatusType.OPEN &&
    //   currentStep === VisaStepsTypes.OPEN ? (
    //     <OpenStatusAction />
    //   ) : currentStatus === VisaStatusType.SUBMITTED &&
    //     currentStep === VisaStepsTypes.FORMSUBMITTED ? (
    //     <FormSubmitAction
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : (currentStatus === VisaStatusType.INREVIEWARNIFI &&
    //       currentStep === VisaStepsTypes.INREVIEWARNIFI) ||
    //     currentStep === VisaStepsTypes.FORMSUBMITTED ? (
    //     <InreviewAction
    //       agentComment={data?.company_status?.agentComment as string}
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.REJECTEDARNIFI &&
    //     currentStep === VisaStepsTypes.REJECTEDARNIFI ? (
    //     <RejectAgentAction message={data?.company_status?.message as string} />
    //   ) : currentStatus === VisaStatusType.INREVIEWARNIFI &&
    //     currentStep === VisaStepsTypes.APPLYGA ? (
    //     <ApplyGAPortal
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.INREVIEWARNIFI &&
    //     currentStep === VisaStepsTypes.MAKEPAYMENT ? (
    //     <PaymentSuccessfull
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.INREVIEWARNIFI &&
    //     currentStep === VisaStepsTypes.UPLOADPROOF ? (
    //     <UploadPaymentProof
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.INREVIEWARNIFI &&
    //     currentStep === VisaStepsTypes.UPLOADPROOF ? (
    //     <WaitingPaymentResponse
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.WAITINGGA &&
    //     currentStep === VisaStepsTypes.WAITINGPAYMENTVERIFICATION ? (
    //     <WaitingPaymentVerification
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.REJECTEDGA &&
    //     (currentStep === VisaStepsTypes.REJECTEDGA ||
    //       currentStep === VisaStepsTypes.UPLOADRESPONSES) ? (
    //     <RejectGAAction
    //       message={data?.company_status?.commentsFormGA as string}
    //       userComment={data?.company_status?.userComment as string}
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.REJECTEDGA &&
    //     currentStep === VisaStepsTypes.WAITINGUPDATEREJECTION ? (
    //     <WaitGARejection
    //       message={data?.company_status?.commentsFormGA as string}
    //       userComment={data?.company_status?.userComment as string}
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.RESOLUTIONSIGNED &&
    //     currentStep === VisaStepsTypes.RESOLUTIONSIGNED ? (
    //     <ResolutionEsignature
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.WAITINGGA &&
    //     currentStep === VisaStepsTypes.WAITINGLICENSEAPPROVAL ? (
    //     <WaitingLicenseApproval
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.MOAAOASIGNED &&
    //     currentStep === VisaStepsTypes.MOAAOASIGNED ? (
    //     <MOAEsignature
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.WAITINGGA &&
    //     currentStep === VisaStepsTypes.WAITINGLICENSE ? (
    //     <WaitingLicense
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.WAITINGGA &&
    //     currentStep === VisaStepsTypes.WAITINGFORESTABLISHMENTCARD ? (
    //     <WaitingEstablishmentCard
    //       statusHandlar={handleStatusChange}
    //       isLoading={isLoading}
    //     />
    //   ) : currentStatus === VisaStatusType.COMPLETED &&
    //     currentStep === VisaStepsTypes.COMPLETED ? (
    //     <CompletedStatus />
    //   ) : null}
    // </Box>
  );
};

export default VisaFormActions;
