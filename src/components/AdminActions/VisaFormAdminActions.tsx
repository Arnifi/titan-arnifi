import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyApplication,
  ICompanyStatus,
  setUpdatedCompanyApplicationInfo,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { Paper } from "@mui/material";
import React from "react";
import StatusNotFound from "./Actions/StatusNotFound";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import InreviewAction from "./Actions/InreviewAction";
import {
  IVisaApplication,
  IVisaApplicationStatus,
  VisaStatusType,
  VisaStepsTypes,
  setUpdatedVisaApplicationInfo,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import RejectAction from "./Actions/RejectAction";
import IsApplyGA from "./Actions/IsApplyGA";
import IsPaymentSuccess from "./Actions/IsPaymentSuccess";
import IsPaymentVerified from "./Actions/IsPaymentVerified";
import IsGAReactAction from "./Actions/IsGAReactAction";
import WaitGARejection from "./Actions/WaitGARejection";
import ResolutionEsignature from "./Actions/ResolutionEsignature";
import WaitingLicenseApproval from "./Actions/WaitingLicenseApproval";
import MOAEsignature from "./Actions/MOAEsignature";
import WaitingLicense from "./Actions/WaitingLicense";
import WaitingEstablishmentCard from "./Actions/WaitingEstablishmentCard";
import CompletedStatus from "./Actions/CompletedStatus";
import {
  useCreateVisaStatusMutation,
  useUpdateVisaStatusMutation,
} from "@/lib/Redux/features/visaStatus/visaStatusApi";

interface IProps {
  data: IVisaApplication;
}

const VisaFormAdminActions: React.FC<IProps> = ({ data }) => {
  const [createVisaStatus, { isLoading: createLoading }] =
    useCreateVisaStatusMutation();

  const [updateVisaStatus, { isLoading: updateLoading }] =
    useUpdateVisaStatusMutation();
  const dispatch = useAppDispatch();

  const statusCreateHandelar = (statusInfo: any) => {
    createVisaStatus({ visa_applicant: data?.id, ...statusInfo })
      .unwrap()
      .then(() => {
        const updatedVisaInfo = {
          ...data,
          visa_status: { ...statusInfo },
        };
        dispatch(setUpdatedVisaApplicationInfo(updatedVisaInfo));
        dispatch(
          openSnackbar({
            isOpen: true,
            message: "Visa Status Created",
            type: "success",
          })
        );
      });
  };

  console.log(data);

  const handleStatusChange = (
    updateStatus: Partial<ICompanyStatus | IVisaApplicationStatus>
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
        console.log(res);
        const updatedVisaInfo = {
          ...data,
          visa_status: { ...data?.visa_status, ...updateStatus },
        };
        dispatch(
          setUpdatedVisaApplicationInfo(updatedVisaInfo as IVisaApplication)
        );
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

  const isStatusNotCreated =
    (data?.status === "done" || data?.status === "inProgress") &&
    data?.visa_status === null;

  const isReviewAction =
    data?.visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI &&
    (data?.visa_status?.currentStep === VisaStepsTypes.INREVIEWARNIFI ||
      data?.visa_status?.currentStep === VisaStepsTypes.FORMSUBMITTED);

  const isRejectAction =
    data?.visa_status?.currentStatus === VisaStatusType.REJECTEDARNIFI &&
    data?.visa_status?.currentStep === VisaStepsTypes.REJECTEDARNIFI;

  const isApplyGA =
    data?.visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI &&
    data?.visa_status?.currentStep === VisaStepsTypes.APPLYGA;

  const isPaymentSuccess =
    data?.visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI &&
    data?.visa_status?.currentStep === VisaStepsTypes.MAKEPAYMENTTOGA;

  const isPaymentVerified =
    data?.visa_status?.currentStatus === VisaStatusType.INREVIEWARNIFI &&
    data?.visa_status?.currentStep ===
      VisaStepsTypes.WAITINGPAYMENTVERIFICATION;

  const isRejectGA =
    data?.visa_status?.currentStatus === VisaStatusType.REJECTEDGA &&
    (data?.visa_status?.currentStep === VisaStepsTypes.REJECTEDGA ||
      data?.visa_status?.currentStep === VisaStepsTypes.UPLOADRESPONSES);

  // const isWaitRejectResponse =
  //   data?.company_status?.currentStatus === CompanyStatusType.REJECTEDGA &&
  //   data?.company_status?.currentStep ===
  //     CompanyStepTypes.WAITINGUPDATEREJECTION;

  // const isResolutionSigned =
  //   data?.company_status?.currentStatus ===
  //     CompanyStatusType.RESOLUTIONSIGNED &&
  //   data?.company_status?.currentStep === CompanyStepTypes.RESOLUTIONSIGNED;

  // const isWaitingLicenseApproval =
  //   data?.company_status?.currentStatus === CompanyStatusType.WAITINGGA &&
  //   data?.company_status?.currentStep ===
  //     CompanyStepTypes.WAITINGLICENSEAPPROVAL;

  // const isMOAEsignature =
  //   data?.company_status?.currentStatus === CompanyStatusType.MOAAOASIGNED &&
  //   data?.company_status?.currentStep === CompanyStepTypes.MOAAOASIGNED;

  // const isWaitingLicense =
  //   data?.company_status?.currentStatus === CompanyStatusType.WAITINGGA &&
  //   data?.company_status?.currentStep === CompanyStepTypes.WAITINGLICENSE;

  // const isWaitingEstablishmentCard =
  //   data?.company_status?.currentStatus === CompanyStatusType.WAITINGGA &&
  //   data?.company_status?.currentStep ===
  //     CompanyStepTypes.WAITINGFORESTABLISHMENTCARD;

  // const isCompanyCreated =
  //   data?.company_status?.currentStatus === CompanyStatusType.COMPLETED &&
  //   data?.company_status?.currentStep === CompanyStepTypes.COMPLETED;

  return (
    <Paper variant="outlined" sx={{ padding: "20px", height: "70vh" }}>
      {isStatusNotCreated ? (
        <StatusNotFound
          loading={createLoading}
          formStatus={data?.status as string}
          createHandler={statusCreateHandelar}
        />
      ) : isReviewAction ? (
        <InreviewAction
          agentComment={data?.visa_status?.agentComment as string}
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: VisaStepsTypes?.APPLYGA,
            status: VisaStatusType?.INREVIEWARNIFI,
          }}
          reject={{
            step: VisaStepsTypes?.REJECTEDARNIFI,
            status: VisaStatusType?.REJECTEDARNIFI,
          }}
        />
      ) : isRejectAction ? (
        <RejectAction message={data?.visa_status?.message as string} />
      ) : isApplyGA ? (
        <IsApplyGA
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: VisaStepsTypes?.MAKEPAYMENTTOGA,
            status: VisaStatusType?.INREVIEWARNIFI,
          }}
        />
      ) : isPaymentSuccess ? (
        <IsPaymentSuccess
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            status: VisaStatusType.INREVIEWARNIFI,
            step: VisaStepsTypes.WAITINGPAYMENTVERIFICATION,
          }}
        />
      ) : isPaymentVerified ? (
        <IsPaymentVerified
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: VisaStepsTypes?.EMPLOYMENTCONTRACTSIGNED,
            status: VisaStatusType?.REJECTEDEMPLOYEEAGREEMENT,
          }}
          reject={{
            step: VisaStepsTypes?.REJECTEDGA,
            status: VisaStatusType?.REJECTEDGA,
          }}
        />
      ) : isRejectGA ? (
        <IsGAReactAction
          approve={{
            step: VisaStepsTypes?.EMPLOYMENTCONTRACTSIGNED,
            status: VisaStatusType?.REJECTEDEMPLOYEEAGREEMENT,
          }}
          loading={updateLoading}
          message={data?.visa_status?.message as string}
          userComment={data?.visa_status?.userComment as string}
          statusHandlar={handleStatusChange}
        />
      ) : // isWaitRejectResponse ? (
      //   <WaitGARejection
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //     message={data?.company_status?.message as string}
      //     userComment={data?.company_status?.userComment as string}
      //   />
      // ) : isResolutionSigned ? (
      //   <ResolutionEsignature
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //   />
      // ) : isWaitingLicenseApproval ? (
      //   <WaitingLicenseApproval
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //   />
      // ) : isMOAEsignature ? (
      //   <MOAEsignature
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //   />
      // ) : isWaitingLicense ? (
      //   <WaitingLicense
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //   />
      // ) : isWaitingEstablishmentCard ? (
      //   <WaitingEstablishmentCard
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //   />
      // ) : isCompanyCreated ? (
      //   <CompletedStatus message="This Company Create Successfully!" />
      // )

      null}
    </Paper>
  );
};

export default VisaFormAdminActions;
