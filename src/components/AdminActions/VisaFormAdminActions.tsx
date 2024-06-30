import { Paper } from "@mui/material";
import React from "react";
import { useAppDispatch } from "@/lib/Redux/store";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import InreviewAction from "./Actions/InreviewAction";
import {
  IVisaApplication,
  VisaStatusType,
  VisaStepsTypes,
  setUpdatedVisaApplicationInfo,
} from "@/lib/Redux/features/visaApplication/visaApplicationSlice";
import RejectAction from "./Actions/RejectAction";
import IsApplyGA from "./Actions/IsApplyGA";
import IsPaymentSuccess from "./Actions/IsPaymentSuccess";
import IsGARejectAction from "./Actions/IsGARejectAction";
import { useUpdateVisaStatusMutation } from "@/lib/Redux/features/visaStatus/visaStatusApi";
import IsFormOpen from "./Actions/IsFormOpen";
import IsWaitingForUpdateFormGA from "./Actions/IsWaitingForUpdateFormGA";
import IsAgreementEsign from "./Actions/IsAgreementEsign";
import IsEvisaIssued from "./Actions/IsEvisaIssued";
import IsMedicalAppointBooked from "./Actions/IsMedicalAppointBooked";
import IsMedicalReportsUpload from "./Actions/IsMedicalReportsUpload";
import IsEmiratesIdAppointment from "./Actions/IsEmiratesIdAppointment";
import IsEmiratesIdFormUpload from "./Actions/IsEmiratesIdFormUpload";
import IsVisaStamping from "./Actions/IsVisaStamping";
import IsResidenceVisaUpload from "./Actions/ResidenceVisaUpload";
import CompletedStatus from "./Actions/CompletedStatus";
import { useUpdateVisaApplicationDataMutation } from "@/lib/Redux/features/visaApplication/visaApplicationApi";

interface IProps {
  data: IVisaApplication;
}

const VisaFormAdminActions: React.FC<IProps> = ({ data }) => {
  const step = data?.applicationStatus?.step ?? "";
  const status = data?.applicationStatus?.status ?? "";

  const dispatch = useAppDispatch();

  const isFormOpen =
    status === VisaStatusType.Open && step === VisaStepsTypes.Open;

  const isReviewAction =
    status === VisaStatusType.ReviewAtArnifi &&
    step === VisaStepsTypes.ReviewAtArnifi;

  const isRejectAction =
    status === VisaStatusType.RejectedAtArnifi &&
    step === VisaStepsTypes.RejectedAtArnifi;

  const isApplyGA =
    status === VisaStatusType.ReviewAtArnifi &&
    step === VisaStepsTypes.ApplyOnPortal;

  const isPaymentSuccess =
    status === VisaStatusType.ReviewAtArnifi &&
    step === VisaStepsTypes.MakePaymentGA;

  const isWaitingForUpdateGA =
    status === VisaStatusType.WaitingOnGA &&
    step === VisaStepsTypes.WaitingForUpdateFromGA;

  const isRejectGA =
    (status === VisaStatusType.RejectedByGA ||
      status === VisaStatusType.WaitingOnGA) &&
    (step === VisaStepsTypes.RejectedByGA ||
      step === VisaStepsTypes.UploadRejectionComments);

  const isEmploymentAgreementEsign =
    status === VisaStatusType?.EmploymentAgreementEsignRequired &&
    VisaStepsTypes?.EmploymentAgreementSigning;

  const isEvisaIssued =
    status === VisaStatusType?.WaitingOnGA &&
    step === VisaStepsTypes?.WaitingForEvisa;

  const isMedicalAppointmentBooking =
    status === VisaStatusType?.EvisaIssued &&
    step === VisaStepsTypes?.EvisaIssued;

  const isMedicalAppointmentBooked =
    status === VisaStatusType?.MedicalAppointment &&
    step === VisaStepsTypes.WaitingForMedicalReports;

  const isEmiratesIdAppointmentBooking =
    status === VisaStatusType?.WaitingOnGA &&
    step === VisaStepsTypes.EmiratesIDAppointmentBooking;

  const isEmiratesIdAppointmentBooked =
    status === VisaStatusType?.EmiratesIDAppointment &&
    step === VisaStepsTypes.WaitingForEmiratesIDForm;

  const isVisaStamping =
    status === VisaStatusType?.WaitingOnGA &&
    step === VisaStepsTypes.ApplyForVisaStamping;

  const isResidenceVisaIssued =
    status === VisaStatusType?.WaitingOnGA &&
    step === VisaStepsTypes.WaitingForResidenceVisa;

  const isApplicationComplited =
    status === VisaStatusType.ResidenceVisaIssued &&
    step === VisaStepsTypes.ResidenceVisaIssued;

  const [updateVisaStatus, { isLoading: statusUpdateLoading }] =
    useUpdateVisaStatusMutation();

  const [updateVisaApplication, { isLoading: dataUpdateLoading }] =
    useUpdateVisaApplicationDataMutation();

  const updateLoading = dataUpdateLoading || statusUpdateLoading;

  const handleStatusChange = (updateStatus: any): void => {
    const {
      remarks,
      currentStatus,
      currentStep,
      paymentSlip,
      paymentInvoice,
      eVisa,
      medicalInstruction,
      idInstruction,
      medicalReport,
      emirateIdForm,
      fileNo,
      uIdNo,
      visaFiles,
      issueDate,
      expiryDate,
    } = updateStatus;

    const applicationStatus = {
      Remarks: remarks,
      step: currentStep,
      status: currentStatus,
      medicalInstruction,
      uIdInstruction: idInstruction,
      emirateIdAcForm: {
        uIdNumber:
          uIdNo ?? data?.applicationStatus?.emirateIdAcForm?.uIdNumber ?? "",
        fileNumber:
          fileNo ?? data?.applicationStatus?.emirateIdAcForm?.fileNumber ?? "",
      },

      residenceVisa: {
        visaIssueDate: issueDate,
        visaExpiryDate: expiryDate,
      },
    };

    // const updatedApplications = {
    //   ...data,
    //   applicationStatus: {
    //     ...data?.applicationStatus,
    //     ...applicationStatus,
    //     paymentInvoice: paymentInvoice
    //       ? [paymentInvoice]
    //       : data?.applicationStatus.paymentInvoice?.length
    //       ? [...data?.applicationStatus.paymentInvoice]
    //       : [],
    //     paymentProof: paymentSlip
    //       ? [paymentSlip]
    //       : data?.applicationStatus.paymentProof?.length
    //       ? [...data?.applicationStatus.paymentProof]
    //       : [],
    //   },
    //   eVisa: eVisa
    //     ? [eVisa]
    //     : data?.applicationStatus?.eVisa?.length
    //     ? [...data.applicationStatus?.eVisa]
    //     : [],

    //   medicalReports: medicalReport
    //     ? [medicalReport]
    //     : data?.applicationStatus?.medicalReports?.length
    //     ? [...data.applicationStatus?.medicalReports]
    //     : [],
    // };

    const formData = new FormData();
    formData.append("id", `${data?.id}`);
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

    if (eVisa) {
      formData.append("files.applicationStatus.eVisa", eVisa);
    }

    if (medicalReport) {
      formData.append("files.applicationStatus.medicalReports", medicalReport);
    }

    if (emirateIdForm) {
      formData.append(
        "files.applicationStatus.emirateIdAcForm.0",
        emirateIdForm
      );
    }

    visaFiles?.length > 0 &&
      visaFiles?.forEach((file: File, i: number) => {
        formData.append(`files.applicationStatus.residenceVisa.${i}`, file);
      });

    updateVisaApplication(formData)
      .unwrap()
      .then((updatedData: { data: IVisaApplication } | { error: unknown }) => {
        if ("data" in updatedData && updatedData.data.id) {
          const nextFormData = new FormData();

          nextFormData.append("id", `${updatedData?.data?.id}`);
          nextFormData.append(
            "data",
            JSON.stringify({
              applicationStatus: {
                status: applicationStatus?.status,
                step: applicationStatus?.step,
              },
            })
          );

          updateVisaStatus(nextFormData)
            .unwrap()
            .then((res: { data: IVisaApplication }) => {
              if (res?.data?.id) {
                dispatch(setUpdatedVisaApplicationInfo(updatedData?.data));
                dispatch(
                  openSnackbar({
                    isOpen: true,
                    message: "Visa Application Status Updated",
                    type: "success",
                  })
                );
              } else {
                dispatch(
                  openSnackbar({
                    isOpen: true,
                    message: "Something went wrong",
                    type: "error",
                  })
                );
              }
            });
        } else if ("error" in updatedData) {
          dispatch(
            openSnackbar({
              isOpen: true,
              message: "Something went wrong",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper
      variant="outlined"
      sx={{ padding: "20px", height: "70vh", overflowY: "scroll" }}
    >
      {isFormOpen ? (
        <IsFormOpen />
      ) : isReviewAction ? (
        <InreviewAction
          data={data}
          agentComment={data?.applicationStatus?.Remarks}
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: VisaStepsTypes.ApplyOnPortal,
            status: VisaStatusType.ReviewAtArnifi,
          }}
          reject={{
            step: VisaStepsTypes.RejectedAtArnifi,
            status: VisaStatusType.RejectedAtArnifi,
          }}
        />
      ) : isRejectAction ? (
        <RejectAction message={data?.applicationStatus?.Remarks as string} />
      ) : isApplyGA ? (
        <IsApplyGA
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            step: VisaStepsTypes?.MakePaymentGA,
            status: VisaStatusType?.ReviewAtArnifi,
          }}
        />
      ) : isPaymentSuccess ? (
        <IsPaymentSuccess
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            status: VisaStatusType.WaitingOnGA,
            step: VisaStepsTypes.WaitingForUpdateFromGA,
          }}
        />
      ) : isWaitingForUpdateGA ? (
        <IsWaitingForUpdateFormGA
          loading={updateLoading}
          statusHandlar={handleStatusChange}
          approve={{
            status: VisaStatusType?.EmploymentAgreementEsignRequired,
            step: VisaStepsTypes?.EmploymentAgreementSigning,
          }}
          reject={{
            status: VisaStatusType?.RejectedByGA,
            step: VisaStepsTypes?.RejectedByGA,
          }}
        />
      ) : isRejectGA ? (
        <IsGARejectAction
          loading={updateLoading}
          message={data?.applicationStatus?.Remarks as string}
          userComment={data?.applicationStatus?.rejectionComments as string}
          statusHandlar={handleStatusChange}
          approve={{
            status: VisaStatusType?.WaitingOnGA,
            step: VisaStepsTypes?.WaitingForUpdateFromGA,
          }}
        />
      ) : isEmploymentAgreementEsign ? (
        <IsAgreementEsign
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isEvisaIssued ? (
        <IsEvisaIssued
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isMedicalAppointmentBooking ? (
        <IsMedicalAppointBooked
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isMedicalAppointmentBooked ? (
        <IsMedicalReportsUpload
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isEmiratesIdAppointmentBooking ? (
        <IsEmiratesIdAppointment
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isEmiratesIdAppointmentBooked ? (
        <IsEmiratesIdFormUpload
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isVisaStamping ? (
        <IsVisaStamping
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isResidenceVisaIssued ? (
        <IsResidenceVisaUpload
          statusHandlar={handleStatusChange}
          loading={updateLoading}
        />
      ) : isApplicationComplited ? (
        <CompletedStatus
          title={"Client Resident Visa is completed"}
          message="The Client can see the output documents in their client dashboard under My companies"
        />
      ) : null}
    </Paper>
  );
};

export default VisaFormAdminActions;
