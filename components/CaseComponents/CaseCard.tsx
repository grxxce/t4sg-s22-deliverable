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
import { Box } from "@material-ui/core";
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
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              {/* Additional feature: delete with x */}
              <CardTitle tag="h3">{caseData.name}</CardTitle>
              <Button onClick={() => setDeleteCaseModalOpen(true)}>
                ❌
              </Button>
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
            {/* {TagData ? (
              <h3 className="font-weight-normal t4sg-color text-center">
                {TagData.name}
              </h3>
            ) : (
              <h3 className="font-weight-normal t4sg-color text-center">
                Something went wrong
              </h3>
            )} */}
            {/* END TODO */}
          </Card>
        </div>
      </Container>
    </>
  );
};
export default CaseCard;
