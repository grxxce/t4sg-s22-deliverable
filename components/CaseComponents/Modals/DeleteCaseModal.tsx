import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCases,
  ManagementContainerQuery,
} from "../CaseManagementContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type DeleteCaseModalProps = {
    open: boolean;
    onClose: () => void;
  };


{/*
  EXTRA FEATURE:
  Created a mutation that takes id number as input and deletes corresponding case
*/} 
const DeleteCaseMutation = `
mutation DeleteOneCaseMutation($id: bigint = "") {
  delete_cases_by_pk(id: $id) {
    id
  }
}
`;


const DeleteCaseModal: React.FC<DeleteCaseModalProps> = (props) => {
  const classes = useStyles();
  const [id, setId] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });
  const [result, executeMutation] = useMutation(DeleteCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete Case 🗑
      </Typography>
      <Box>
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="case-select-label">Case Name</InputLabel>
            <Select
              labelId="case-select-label"
              fullWidth
              value={id}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setId(event.target.value as number);
              }}
            >

              {/* Query the data to display case names and return case id */}
              {data
                ? data.cases.map((cases: ManagementCases, index: number) => {
              return <MenuItem key={index} value={cases.id}> {cases.name} </MenuItem>;
              })
              : "Something went wrong"}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Categories"
        ) : null}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({id});
            props.onClose();
          }}
        >
          Delete 🆇
        </Button>
      </Box>
    </StyledModal>
  );
};

export default DeleteCaseModal;