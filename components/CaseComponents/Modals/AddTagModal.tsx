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
  ManagementCategory,
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

type AddTagModalProps = {
  open: boolean;
  onClose: () => void;
};

// This query will get all of the cases and tags
const CasesAndTagsQuery = `
query QueryCasesAndTags {
    cases {
      name
      id
    }
    tags {
      name
      id
    }
  }
`;

/* 
  ALTERNATE FEATURE 2 TODO:
  Write a mutation that will insert (add) a new tag given the
  name, and case_id.
  
  Make sure to replace the string that is currently
  in this variable 
*/
const InsertTagMutation = `
query MyQuery {
  __typename # Placeholder value
}
`;
// END TODO

const AddTagModal: React.FC<AddTagModalProps> = (props) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [caseID, setCaseID] = useState<number | null>(null);
  const [tagID, setTagID] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: CasesAndTagsQuery,
  });

  const [result, executeMutation] = useMutation(InsertTagMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Add New Tag
      </Typography>
      <Box>
        {data ? (
          <>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Case</InputLabel>
              <Select
                labelId="category-select-label"
                fullWidth
                value={caseID}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setCaseID(event.target.value as number);
                }}
              >
                {/*
                ALTERNATE FEATURE 2 TODO:
                Use the data from the result of the query CasesAndTagsQuery
                to render a MenuItem with cases.id as the value, and 
                cases.name as the text.
                */}

                {/* END TODO */}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Tag</InputLabel>
              <Select
                labelId="category-select-label"
                fullWidth
                value={tagID}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setTagID(event.target.value as number);
                }}
              >
                {/*
                ALTERNATE FEATURE 2 TODO:
                Use the data from the result of the query CasesAndTagsQuery
                to render a MenuItem with tags.id as the value, and 
                tags.name as the text.
                */}
                {/* END TODO */}
              </Select>
            </FormControl>
          </>
        ) : fetching ? (
          "Loading Cases and Tags"
        ) : null}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              case_id: caseID,
              tag_id: tagID,
            });
            props.onClose();
          }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
};
export default AddTagModal;
