import theme from "@/theme";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useState } from "react";
import GlobalButton from "../Buttons/GlobalButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.colorConstants.darkBlue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
    fontWeight: 500,
  },
}));

const AMLResponseTable = () => {
  return (
    <TableContainer sx={{ border: "1px solid #e0e0e0", marginY: "16px" }}>
      <Table aria-labelledby="legal-table" size="small">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontSize: "14px" }}>Name</TableCell>
            <TableCell sx={{ fontSize: "14px" }}>Action</TableCell>
            <TableCell sx={{ fontSize: "14px" }}>Message</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
            <StyledTableCell>Message</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface IProps {
  agentComment: string;
  loading: boolean;
  statusHandlar: (updateStatus: any) => void;
  approve: {
    step: string;
    status: string;
  };
  reject: {
    step: string;
    status: string;
  };
}

const InreviewAction: React.FC<IProps> = ({
  loading,
  statusHandlar,
  agentComment,
  approve,
  reject,
}) => {
  const [isApprove, setIsApprove] = useState("approve");
  const [rejectText, setRejectText] = useState<string>("");
  const [isAMLChecked, setIsAMLChecked] = useState<boolean>(false);

  const rejectHandler = () => {
    const data = {
      currentStatus: reject.status,
      currentStep: reject.step,
      message: `Your application has been rejected by Arnifi agent due to '${rejectText}'. Resubmit the application form.
      `,
      agentComment: rejectText,
    };
    statusHandlar(data);
  };

  const approveHandler = () => {
    const data = {
      currentStep: approve.step,
      currentStatus: approve.status,
    };

    statusHandlar(data);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box>
        <Box>
          <Typography
            gutterBottom
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: theme.colorConstants?.darkGray,
            }}
          >
            {agentComment !== "" &&
            agentComment !== null &&
            agentComment !== undefined
              ? "Resubmitted Application"
              : "Please review the application"}
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              marginY: "10px",
              fontWeight: 500,
              color: theme.colorConstants?.darkBlue,
            }}
          >
            Below are the important points to check
          </Typography>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: theme.colorConstants?.mediumGray,
                  mr: "50px",
                }}
              >
                1. Check AML for Shareholders
              </Typography>

              <Button
                onClick={() => setIsAMLChecked(true)}
                size={"small"}
                sx={{ textTransform: "none" }}
                variant="contained"
              >
                Check
              </Button>
            </Box>

            {isAMLChecked && <AMLResponseTable />}
          </Box>
          {[
            "Documents",
            "Name across application and documents",
            "Validity of documents",
          ].map((item, i) => (
            <Typography
              key={item}
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: theme.colorConstants?.mediumGray,
              }}
            >
              {i + 2}. {item}
            </Typography>
          ))}
        </Box>

        {isApprove !== "isReject" && (
          <Box
            sx={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: theme.colorConstants?.mediumGray,
                marginRight: "16px",
              }}
            >
              Do you want to reject or approve the application?
            </Typography>

            <RadioGroup
              row
              value={isApprove}
              onChange={(e) => {
                setIsApprove(e?.target?.value);
              }}
            >
              {["approve", "reject"].map((item) => (
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
                        textTransform: "capitalize",
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
      </Box>

      {
        <Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            {isApprove === "approve" ? (
              <GlobalButton
                title="Move to Next Step"
                loading={loading}
                onClick={approveHandler}
              />
            ) : isApprove === "reject" ? (
              <GlobalButton
                title="Move to Reject"
                loading={false}
                onClick={() => setIsApprove("isReject")}
                color="error"
              />
            ) : (
              <Box sx={{ width: "100%" }}>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: theme.colorConstants?.mediumGray,
                    marginLeft: "16px",
                  }}
                >
                  Reason for reject
                </Typography>
                <textarea
                  style={{ width: "100%", padding: "5px", fontFamily: "Inter" }}
                  rows={4}
                  placeholder="Write reason for reject"
                  onChange={(e) => setRejectText(e.target.value)}
                  value={rejectText}
                ></textarea>

                <Stack
                  spacing={2}
                  direction="row"
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <GlobalButton
                    title="Reject"
                    loading={loading}
                    onClick={rejectHandler}
                    color="error"
                    disabled={!rejectText}
                  />
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      }
    </Box>
  );
};

export default InreviewAction;
