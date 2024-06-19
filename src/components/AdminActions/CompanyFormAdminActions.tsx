import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyApplication,
  setUpdatedCompanyApplicationInfo,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import { Paper } from "@mui/material";
import React from "react";
import StatusNotFound from "./Actions/StatusNotFound";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import InreviewAction from "./Actions/InreviewAction";
import RejectAction from "./Actions/RejectAction";
import IsApplyGA from "./Actions/IsApplyGA";
import IsPaymentSuccess from "./Actions/IsPaymentSuccess";
import IsGAReactAction from "./Actions/IsGAReactAction";
import ResolutionEsignature from "./Actions/ResolutionEsignature";
import WaitingLicenseApproval, {
  ILicenseFiles,
} from "./Actions/WaitingLicenseApproval";
import MOAEsignature from "./Actions/MOAEsignature";
import WaitingEstablishmentCard from "./Actions/WaitingEstablishmentCard";
import CompletedStatus from "./Actions/CompletedStatus";
import IsFormOpen from "./Actions/IsFormOpen";
import IsWaitingForUpdateFormGA from "./Actions/IsWaitingForUpdateFormGA";
import { useUpdateCompanyStatusMutation } from "@/lib/Redux/features/companyApplication/companyApplicationApi";
import envConfig from "@/Configs/envConfig";

interface IProps {
  data: ICompanyApplication;
}

const CompanyFormAdminActions: React.FC<IProps> = ({ data }) => {
  const step = data?.applicationStatus?.step ?? "";
  const status = data?.applicationStatus?.status ?? "";

  const [updateCompanyStatus, { isLoading: updateLoading }] =
    useUpdateCompanyStatusMutation();

  const dispatch = useAppDispatch();

  const statusCreateHandelar = (statusInfo: any) => {};

  const handleStatusChange = (updateStatus: any): void => {
    const formData = new FormData();

    const {
      remarks,
      currentStatus,
      currentStep,
      paymentSlip,
      paymentInvoice,
      licenseFiles,
      licenseNumber,
      licenseIssueDate,
      licenseExpiryDate,
      establishmentCardId,
      establishmentCardIssueDate,
      establishmentCardExpiryDate,
      establishmentCard,
    } = updateStatus;

    const applicationStatus = {
      Remarks: remarks,
      step: currentStep,
      status: currentStatus,
      licenseNumber,
      licenseIssueDate,
      licenseExpiryDate,
      establishmentCardId,
      establishmentCardIssueDate,
      establishmentCardExpiryDate,
      licenseDocuments: licenseFiles?.map((item: ILicenseFiles) => ({
        name: item.name,
      })),
    };

    const updatedApplications = {
      ...data,
      applicationStatus: {
        ...data?.applicationStatus,
        ...applicationStatus,
      },
    };

    formData.append("id", `${data?.id}`);
    formData.append("custom_api_key", envConfig.custom_api_key as string);
    formData.append(
      "data",
      JSON.stringify({
        applicationStatus,
      })
    );

    if (paymentInvoice) {
      formData.append("files.applicationStatus.paymentInvoice", paymentInvoice);
    }

    if (paymentSlip) {
      formData.append("files.applicationStatus.paymentProof", paymentSlip);
    }

    if (establishmentCard) {
      formData.append(
        "files.applicationStatus.establishmentCard",
        establishmentCard
      );
    }

    if (licenseFiles?.length) {
      licenseFiles?.map((item: ILicenseFiles, i: number) => {
        formData.append(
          `files.applicationStatus.licenseDocuments.${i}`,
          item?.document as File
        );
      });
    }

    updateCompanyStatus(formData)
      .then(() => {
        dispatch(setUpdatedCompanyApplicationInfo(updatedApplications));
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

  const isStatusNotCreated = "";
  // const isStatusNotCreated =
  //   (data?.status === "done" || data?.status === "inProgress") &&
  //   data?.company_status === null;

  const isFormOpen =
    status === CompanyStatusType.Open && step === CompanyStepTypes.Open;

  const isReviewAction =
    status === CompanyStatusType.ReviewAtArnifi &&
    step === CompanyStepTypes.ReviewAtArnifi;

  const isRejectAction =
    status === CompanyStatusType.RejectedAtArnifi &&
    step === CompanyStepTypes.RejectedAtArnifi;

  const isApplyGA =
    status === CompanyStatusType.ReviewAtArnifi &&
    step === CompanyStepTypes.ApplyOnPortal;

  const isPaymentSuccess =
    status === CompanyStatusType.ReviewAtArnifi &&
    step === CompanyStepTypes.MakePaymentToGA;

  const isWaitingForUpdateGA =
    status === CompanyStatusType.WaitingOnGovernmentAuthority &&
    step === CompanyStepTypes.WaitingForUpdateFromGA;

  const isRejectGA =
    (status === CompanyStatusType.RejectedByGA ||
      status === CompanyStatusType.WaitingOnGovernmentAuthority) &&
    (step === CompanyStepTypes.RejectedByGA ||
      step === CompanyStepTypes.UploadRejectionComments);

  const isResolutionSigned =
    status === CompanyStatusType.ResolutionEsignRequired &&
    step === CompanyStepTypes.ResolutionSigning;

  const isMOAEsignature =
    status === CompanyStatusType.MOAAOAEsignRequired &&
    step === CompanyStepTypes.MOAAOASigning;

  const isWaitingLicenseApproval =
    status === CompanyStatusType.WaitingOnGovernmentAuthority &&
    step === CompanyStepTypes.LicenseIssued;

  const isWaitingEstablishmentCard =
    status === CompanyStatusType.LicenseIssued &&
    step === CompanyStepTypes.WaitingEstablishmentCard;

  const isCompanyCreated =
    status === CompanyStatusType.Completed &&
    step === CompanyStepTypes.Completed;

  return (
    <Paper variant="outlined" sx={{ padding: "20px", height: "70vh" }}>
      {isStatusNotCreated ? (
        <StatusNotFound
          loading={false}
          formStatus={data?.status as string}
          createHandler={statusCreateHandelar}
        />
      ) : isFormOpen ? (
        <IsFormOpen />
      ) : isReviewAction ? (
        <InreviewAction
          data={data}
          agentComment={data?.applicationStatus?.Remarks}
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
        <RejectAction message={data?.applicationStatus?.Remarks as string} />
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
            status: CompanyStatusType.WaitingOnGovernmentAuthority,
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
          message={data?.applicationStatus?.Remarks as string}
          userComment={data?.applicationStatus?.rejectionComments as string}
          statusHandlar={handleStatusChange}
          approve={{
            status: CompanyStatusType?.WaitingOnGovernmentAuthority,
            step: CompanyStepTypes?.WaitingForUpdateFromGA,
          }}
        />
      ) : isResolutionSigned ? (
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
      ) : isWaitingEstablishmentCard ? (
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
