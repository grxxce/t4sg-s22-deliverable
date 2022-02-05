import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import AddTagModal from "./Modals/AddTagModal";
import DeleteCaseModal from "./Modals/DeleteCaseModal";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/
export const ManagementContainerQuery = `
query MyQuery {
  category {
    id
    name
  } 
  cases { 
    id
    name
  }
}
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

export type ManagementCases = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
  const [addTagModalOpen, setAddTagModalOpen] = 
    React.useState<boolean>(false);
  const [addDeleteCaseModalOpen, setDeleteCaseModalOpen] = 
    React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <div className="padding">
      <h1 className="subtitle">Introducing . . .</h1>
      <h5 className="title">Case 🧳 Track!</h5>

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <AddTagModal
        onClose={() => setAddTagModalOpen(false)}
        open={addTagModalOpen}
      />

      <DeleteCaseModal
        onClose={() => setDeleteCaseModalOpen(false)}
        open={addDeleteCaseModalOpen}
      />

      <Container
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "2 rem",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <ButtonGroup size="large" variant="outline">
          <Button variant="light" onClick={() => setAddCategoryModalOpen(true)}>
            + Category 🗂
          </Button>
          <Button variant="light" onClick={() => setAddTagModalOpen(true)}>
            Tag a Case 🏷 
          </Button>
          <Button variant="light" onClick={() => setAddCaseModalOpen(true)}>
            + Case 🧳
          </Button>
          <Button variant="light" onClick={() => setDeleteCaseModalOpen(true)}>
            ⓧ Case 🗑
          </Button>
        </ButtonGroup>
        {/* <Button variant="dark" onClick={() => "redirect"}>
          Edit Case
        </Button> */}
      </Container>
      
      <Grid container spacing={3}>
        {/*
          FEATURE 1 TODO:
          Use the data from the result of the query to render 
          a CaseCategory for every category in the response.
          Remember, the response is stored in the "data" variable!
        */}

        {data
          ? data.category.map((category: ManagementCategory, index: number) => {
            return <CaseCategory key={index} category_id={category.id}/>;
          })
          : "Something went wrong"}

        {/* END TODO */}
      </Grid>
    </div>
  );
};
export default CaseManagementContainer;
