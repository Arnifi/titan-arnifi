import theme from "@/theme";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";
import InputFile from "../InputFile/InputFile";
import FileUploadContainer from "../FileUploadContainer";

interface IProps {
  loading: boolean;
  statusHandlar: (data: any) => void;
  approve: {
    step: string;
    status: string;
  };
}

const IsPaymentSuccess: React.FC<IProps> = ({
  statusHandlar,
  loading,
  approve,
}) => {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<string>("No");
  const [isUpdatedProof, setIsUpdateProof] = useState<string>("No");

  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [paymentInvoice, setPaymentInvoice] = useState<File | null>(null);

  const handleStatusChange = () => {
    const data = {
      currentStatus: approve?.status,
      currentStep: approve?.step,
    };

    statusHandlar(data);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            Have you made the payment to Government Authority for the
            application?
          </Typography>

          <RadioGroup
            row
            value={isPaymentSuccess}
            onChange={(e) => {
              setIsPaymentSuccess(e?.target?.value);
            }}
          >
            {["Yes", "No"].map((item) => (
              <FormControlLabel
                disabled={isPaymentSuccess === "Yes"}
                key={item}
                value={item}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: theme.colorConstants.darkGray,
                    }}
                  >
                    {item}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Box>

        {isPaymentSuccess === "Yes" && (
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: theme.colorConstants.mediumGray,
              }}
            >
              Have you uploaded the payment proof to government protal?
            </Typography>

            <RadioGroup
              row
              value={isUpdatedProof}
              onChange={(e) => {
                setIsUpdateProof(e?.target?.value);
              }}
            >
              {["Yes", "No"].map((item) => (
                <FormControlLabel
                  disabled={isUpdatedProof === "Yes"}
                  key={item}
                  value={item}
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: theme.colorConstants.darkGray,
                      }}
                    >
                      {item}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </Box>
        )}

        {isUpdatedProof === "Yes" && (
          <Box marginTop={"16px"}>
            <Box sx={{ paddingY: "10px" }}>
              <FileUploadContainer
                file={paymentInvoice}
                setFile={setPaymentInvoice}
                title="Upload Payment Invoice"
              />
            </Box>

            <Box sx={{ paddingY: "10px" }}>
              <FileUploadContainer
                file={paymentSlip}
                setFile={setPaymentSlip}
                title="Upload Payment Proof"
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <GlobalButton
          disabled={!paymentInvoice || !paymentSlip}
          loading={loading}
          title="Move to Next Step"
          onClick={handleStatusChange}
        />
      </Box>
    </Box>
  );
};

export default IsPaymentSuccess;
