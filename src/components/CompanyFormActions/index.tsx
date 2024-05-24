import theme from "@/theme";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import OpenStatusAction from "./OpenStatusAction";
import FormSubmitAction from "./FormSubmitAction";
import InreviewAction from "./InreviewAction";
import RejectAgentAction from "./RejectAgentAction";
import ApplyGAPortal from "./ApplyGAPortal";
import UploadPaymentProof from "./UploadPaymentProof";
import WaitingOnGA from "./WaitingOnGA";

const CompanyFormActions = () => {
  return (
    <Box>
      {/* <OpenStatusAction /> */}
      {/* <FormSubmitAction /> */}
      {/* <InreviewAction /> */}
      {/* <RejectAgentAction /> */}
      {/* <ApplyGAPortal /> */}
      {/* <UploadPaymentProof /> */}
      <WaitingOnGA />
    </Box>
  );
};

export default CompanyFormActions;
