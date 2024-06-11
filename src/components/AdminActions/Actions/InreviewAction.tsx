import theme from "@/theme";
import {
  Box,
  Button,
  CircularProgress,
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
import { useGetAMLResponseMutation } from "@/lib/Redux/features/AML/AMLApi";
import { ICompanyApplication } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";
import envConfig from "@/Configs/envConfig";

interface IAMLResponse {
  message: string;
  data: {
    summary: {
      action: string;
    };
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.colorConstants.darkBlue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

const AMLResponseTable = ({ data }: { data: IAMLResponse[] }) => {
  return (
    <TableContainer sx={{ border: "1px solid #e0e0e0", marginY: "16px" }}>
      <Table aria-labelledby="legal-table" size="small">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontSize: "14px" }}>SL</TableCell>
            <TableCell sx={{ fontSize: "14px" }}>Action</TableCell>
            <TableCell sx={{ fontSize: "14px" }}>Message</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((item, i) => {
            return (
              <TableRow key={i}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>{item?.data?.summary?.action}</StyledTableCell>
                <StyledTableCell>{item?.message}</StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface IProps {
  data: ICompanyApplication;
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
  data: applicationData,
  loading,
  statusHandlar,
  agentComment,
  approve,
  reject,
}) => {
  const [isApprove, setIsApprove] = useState("approve");
  const [rejectText, setRejectText] = useState<string>("");
  const [amlResponse, setAmlResponse] = useState<IAMLResponse[] | null>(null);

  const [getAMLResponse, { isLoading: amlLoading }] =
    useGetAMLResponseMutation();

  const rejectHandler = () => {
    const data = {
      currentStatus: reject.status,
      currentStep: reject.step,
      remarks: rejectText,
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

  const amlResponseHandler = () => {
    const amlInfoPromises = applicationData?.shareholders?.map(async (item) => {
      return await getAMLResponse({
        type: "share-holder",
        id: item.id,
        custom_api_key: `Bearer ${envConfig.custom_api_key}`,
      }).unwrap();
    });

    Promise.all(amlInfoPromises)
      .then((res) => {
        setAmlResponse(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
                onClick={amlResponseHandler}
                size={"small"}
                sx={{ textTransform: "none" }}
                variant="contained"
                disabled={amlLoading}
              >
                {amlLoading ? <CircularProgress size={20} /> : "Check"}
              </Button>
            </Box>

            {/* {isAMLChecked && <AMLResponseTable />} */}

            {amlResponse?.length && <AMLResponseTable data={amlResponse} />}
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
