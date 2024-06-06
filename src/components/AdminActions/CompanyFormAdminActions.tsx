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
import {
  useCreateCompanyStatusMutation,
  useUpdateCompanyStatusMutation,
} from "@/lib/Redux/features/companyStatus/companyStatusApi";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import InreviewAction from "./Actions/InreviewAction";
import { IVisaApplicationStatus } from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
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
import IsFormOpen from "./Actions/IsFormOpen";
import IsWaitingForUpdateFormGA from "./Actions/IsWaitingForUpdateFormGA";

interface IProps {
  data: ICompanyApplication;
}

const CompanyFormAdminActions: React.FC<IProps> = ({ data }) => {
  const [createCompanyStatus, { isLoading: createLoading }] =
    useCreateCompanyStatusMutation();

  const [updateCompanyStatus, { isLoading: updateLoading }] =
    useUpdateCompanyStatusMutation();
  const dispatch = useAppDispatch();

  const statusCreateHandelar = (statusInfo: any) => {
    console.log(statusInfo);

    const updatedCompanyInfo = {
      ...data,
      company_status: { ...statusInfo },
    };

    dispatch(setUpdatedCompanyApplicationInfo(updatedCompanyInfo));
    dispatch(
      openSnackbar({
        isOpen: true,
        message: "Company Status Created",
        type: "success",
      })
    );

    // createCompanyStatus({ user_form: data?.id, ...statusInfo })
    //   .unwrap()
    //   .then((res) => {
    //     console.log(res);

    //     const updatedCompanyInfo = {
    //       ...data,
    //       company_status: { ...statusInfo },
    //     };
    // dispatch(setUpdatedCompanyApplicationInfo(updatedCompanyInfo));
    // dispatch(
    //   openSnackbar({
    //     isOpen: true,
    //     message: "Company Status Created",
    //     type: "success",
    //   })
    // );
    //   });
  };

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

    const updatedCompanyInfo = {
      ...data,
      company_status: { ...data?.company_status, ...updateStatus },
    };
    dispatch(
      setUpdatedCompanyApplicationInfo(
        updatedCompanyInfo as ICompanyApplication
      )
    );
    dispatch(
      openSnackbar({
        isOpen: true,
        message: "Company Status Updated",
        type: "success",
      })
    );

    // formData.append(
    //   "currentStatus",
    //   currentStatus ?? data?.company_status?.currentStatus
    // );
    // formData.append(
    //   "currentStep",
    //   currentStep ?? data?.company_status?.currentStep
    // );

    // formData.append("message", message ?? data?.company_status?.message);

    // formData.append(
    //   "agentComment",
    //   agentComment ?? (data?.company_status?.agentComment as string)
    // );

    // formData.append(
    //   "commentsFormGA",
    //   commentsFormGA ?? (data?.company_status?.commentsFormGA as string)
    // );

    // updateCompanyStatus({ id: data?.company_status?.id, data: formData })
    //   .then((res) => {
    //     const updatedCompanyInfo = {
    //       ...data,
    //       company_status: { ...data?.company_status, ...updateStatus },
    //     };
    //     dispatch(
    //       setUpdatedCompanyApplicationInfo(
    //         updatedCompanyInfo as ICompanyApplication
    //       )
    //     );
    //     dispatch(
    //       openSnackbar({
    //         isOpen: true,
    //         message: "Company Status Updated",
    //         type: "success",
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const isStatusNotCreated =
    (data?.status === "done" || data?.status === "inProgress") &&
    data?.company_status === null;

  const isFormOpen =
    data?.company_status?.currentStatus === CompanyStatusType.Open &&
    data?.company_status?.currentStep === CompanyStepTypes.Open;

  const isReviewAction =
    data?.company_status?.currentStatus === CompanyStatusType.ReviewAtArnifi &&
    data?.company_status?.currentStep === CompanyStepTypes.ReviewAtArnifi;

  const isRejectAction =
    data?.company_status?.currentStatus ===
      CompanyStatusType.RejectedAtArnifi &&
    data?.company_status?.currentStep === CompanyStepTypes.RejectedAtArnifi;

  const isApplyGA =
    data?.company_status?.currentStatus === CompanyStatusType.ReviewAtArnifi &&
    data?.company_status?.currentStep === CompanyStepTypes.ApplyOnPortal;

  const isPaymentSuccess =
    data?.company_status?.currentStatus === CompanyStatusType.ReviewAtArnifi &&
    data?.company_status?.currentStep === CompanyStepTypes.MakePaymentToGA;

  const isWaitingForUpdateGA =
    data?.company_status?.currentStatus === CompanyStatusType.ReviewAtArnifi &&
    data?.company_status?.currentStep ===
      CompanyStepTypes.WaitingForUpdateFromGA;

  const isPaymentVerified =
    data?.company_status?.currentStatus === CompanyStatusType.INREVIEWARNIFI &&
    data?.company_status?.currentStep ===
      CompanyStepTypes.WAITINGPAYMENTVERIFICATION;

  const isRejectGA =
    data?.company_status?.currentStatus === CompanyStatusType.RejectedByGA &&
    (data?.company_status?.currentStep === CompanyStepTypes.RejectedByGA ||
      data?.company_status?.currentStep ===
        CompanyStepTypes.UploadRejectionComments);

  const isWaitRejectResponse =
    data?.company_status?.currentStatus === CompanyStatusType.REJECTEDGA &&
    data?.company_status?.currentStep ===
      CompanyStepTypes.WAITINGUPDATEREJECTION;

  const isResolutionSigned =
    data?.company_status?.currentStatus ===
      CompanyStatusType.ResolutionEsignRequired &&
    data?.company_status?.currentStep === CompanyStepTypes.ResolutionSigning;

  const isMOAEsignature =
    data?.company_status?.currentStatus ===
      CompanyStatusType.MOAAOAEsignRequired &&
    data?.company_status?.currentStep === CompanyStepTypes.MOAAOASigning;

  const isWaitingLicenseApproval =
    data?.company_status?.currentStatus ===
      CompanyStatusType.WaitingOnGovernmentAuthority &&
    data?.company_status?.currentStep === CompanyStepTypes.LicenseIssued;

  const isWaitingLicense =
    data?.company_status?.currentStatus === CompanyStatusType.WAITINGGA &&
    data?.company_status?.currentStep === CompanyStepTypes.WAITINGLICENSE;

  const isWaitingEstablishmentCard =
    data?.company_status?.currentStatus ===
      CompanyStatusType.WaitingOnGovernmentAuthority &&
    data?.company_status?.currentStep ===
      CompanyStepTypes.WaitingEstablishmentCard;

  const isCompanyCreated =
    data?.company_status?.currentStatus === CompanyStatusType.Completed &&
    data?.company_status?.currentStep === CompanyStepTypes.Completed;

  return (
    <Paper variant="outlined" sx={{ padding: "20px", height: "70vh" }}>
      {isStatusNotCreated ? (
        <StatusNotFound
          loading={createLoading}
          formStatus={data?.status as string}
          createHandler={statusCreateHandelar}
        />
      ) : isFormOpen ? (
        <IsFormOpen />
      ) : isReviewAction ? (
        <InreviewAction
          agentComment={data?.company_status?.agentComment as string}
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: CompanyStepTypes.ApplyOnPortal,
            status: CompanyStatusType.ReviewAtArnifi,
          }}
          reject={{
            step: CompanyStepTypes.RejectedAtArnifi,
            status: CompanyStatusType.RejectedAtArnifi,
          }}
        />
      ) : isRejectAction ? (
        <RejectAction message={data?.company_status?.message as string} />
      ) : isApplyGA ? (
        <IsApplyGA
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: CompanyStepTypes?.MakePaymentToGA,
            status: CompanyStatusType?.ReviewAtArnifi,
          }}
        />
      ) : isPaymentSuccess ? (
        <IsPaymentSuccess
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            status: CompanyStatusType.ReviewAtArnifi,
            step: CompanyStepTypes.WaitingForUpdateFromGA,
          }}
        />
      ) : isWaitingForUpdateGA ? (
        <IsWaitingForUpdateFormGA
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            status: CompanyStatusType?.ResolutionEsignRequired,
            step: CompanyStepTypes?.ResolutionSigning,
          }}
          reject={{
            status: CompanyStatusType?.RejectedByGA,
            step: CompanyStepTypes?.RejectedByGA,
          }}
        />
      ) : isRejectGA ? (
        <IsGAReactAction
          loading={updateLoading}
          message={data?.company_status?.message as string}
          userComment={data?.company_status?.userComment as string}
          statusHandlar={handleStatusChange}
          approve={{
            status: CompanyStatusType?.ResolutionEsignRequired,
            step: CompanyStepTypes?.ResolutionSigning,
          }}
        />
      ) : // : isWaitRejectResponse ? (
      //   <WaitGARejection
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //     message={data?.company_status?.message as string}
      //     userComment={data?.company_status?.userComment as string}
      //   />
      // )
      isResolutionSigned ? (
        <ResolutionEsignature
          loading={updateLoading}
          statusHandlar={handleStatusChange}
        />
      ) : isWaitingLicenseApproval ? (
        <WaitingLicenseApproval
          loading={updateLoading}
          statusHandlar={handleStatusChange}
        />
      ) : isMOAEsignature ? (
        <MOAEsignature
          loading={updateLoading}
          statusHandlar={handleStatusChange}
        />
      ) : // : isWaitingLicense ? (
      //   <WaitingLicense
      //     loading={updateLoading}
      //     statusHandlar={handleStatusChange}
      //   />
      // )
      isWaitingEstablishmentCard ? (
        <WaitingEstablishmentCard
          loading={updateLoading}
          statusHandlar={handleStatusChange}
        />
      ) : isCompanyCreated ? (
        <CompletedStatus
          title={"Client company action is Completed"}
          message="The client can see the output documents in their client dashboard under My Companies"
        />
      ) : null}
    </Paper>
  );
};

export default CompanyFormAdminActions;
