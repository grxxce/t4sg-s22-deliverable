import React from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { Box, MenuItem } from "@material-ui/core";
import { useMutation, useQuery } from "urql";
import CloseIcon from "@material-ui/icons/Close";
import DeleteCaseModal from "./Modals/DeleteCaseModal";

type CaseCardProps = {
  data: CaseData;
};

export type TagData = {
  name: string;
  id?: number;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
  cases_tags?: [TagData];
};

const DeleteCaseMutation = `
mutation DeleteCaseMutation($id: bigint!) {
  delete_cases(where: {id: {_eq: $id}}) {
    affected_rows
  }
} 
`;

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;
  const [result, executeMutation] = useMutation(DeleteCaseMutation);
  const [addDeleteCaseModalOpen, setDeleteCaseModalOpen] = 
    React.useState<boolean>(false);

  return (
    <>
      <DeleteCaseModal
          onClose={() => setDeleteCaseModalOpen(false)}
          open={addDeleteCaseModalOpen}
      />
      <Container>
        <div style={{ width: "100%", padding: "5px" }}>
          <Card body style={{ backgroundColor: "#e4ebf5" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              {/* Additional feature: delete with x */}
              <CardTitle className="padding" tag="h3">{caseData.name}</CardTitle>
              <h5
              onClick={() => setDeleteCaseModalOpen(true)}>
                🆇
              </h5>
            </Box>
            <CardSubtitle tag="h5" className="mb-2 text-muted">
              ⏳ {caseData.status}
            </CardSubtitle>
            <CardText> ✏️ {caseData.description}</CardText>
            {/*
            ALTERNATE FEATURE 1 TODO:
            Use the data on tags found in props to render out all
            of the tags associated with every case.
            */}
            {/* {caseData
                ? caseData.data.map((category: ManagementCategory, index: number) => {
              return <MenuItem key={index} value={category.id}> {caseData.cases_tags.name} </MenuItem>;
              })
              : "Something went wrong"} */}
            {/* END TODO */}
          </Card>
        </div>
      </Container>
    </>
  );
};
export default CaseCard;
