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
              <CardTitle tag="h3">{caseData.name}</CardTitle>
              <Button variant="outlined" onClick={() => setDeleteCaseModalOpen(true)}>
                X
              </Button>
            </Box>

            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {caseData.status}
            </CardSubtitle>
            <CardText>{caseData.description}</CardText>
          </Card>
        </div>
      </Container>
    </>
  );
};
export default CaseCard;
