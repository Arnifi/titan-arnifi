import {
  CompanyStatusType,
  CompanyStepTypes,
  ICompanyStatus,
} from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import theme from "@/theme";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface IProps {
  isLoading: boolean;
  statusHandlar: (updateStatus: Partial<ICompanyStatus>) => void;
}
const WaitingEstablishmentCard: React.FC<IProps> = ({
  statusHandlar,
  isLoading,
}) => {
  const [isEstablishmentCard, setIsEstablishmentCard] = useState<string>("No");

  const handleStatusChange = () => {
    const data: Partial<ICompanyStatus> = {
      currentStatus: CompanyStatusType.COMPLETED,
      currentStep: CompanyStepTypes.COMPLETED,
      message:
        "Congratulations, your company has been incorporated. For associated documents, please refer to the document section on the dashboard.",
    };

    statusHandlar(data);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <Box>
        <Typography
          gutterBottom
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: theme.colorConstants?.darkGray,
          }}
        >
          Waiting for Establishment Card
        </Typography>

        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: theme.colorConstants.mediumGray,
            }}
          >
            Establishment card is signed?
          </Typography>

          <RadioGroup
            row
            value={isEstablishmentCard}
            onChange={(e) => {
              setIsEstablishmentCard(e?.target?.value);
            }}
          >
            {["Yes", "No"].map((item) => (
              <FormControlLabel
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

        {isEstablishmentCard === "Yes" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleStatusChange}
              disabled={isLoading}
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                paddingX: "20px",
              }}
            >
              {isLoading ? "Loading..." : "Move to Completed"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default WaitingEstablishmentCard;
