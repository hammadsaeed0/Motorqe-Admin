import React, { useState } from "react";
import { Badge, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useApiHook } from "utils/api";
import {  ViewNewsModal } from "./ViewNewsModal";

import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
  ReactDataTable,
} from "components/Component";
import deleteModal from "utils/deleteModal";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import EditBranchModal from "./EditNewsModal";

const UserList = () => {
  const { useApi, isLoading } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()

  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/news/get-all").then((response) => {
      setApiData(response);
      console.log("apiData:",apiData)
    });
  }, []);

  const updateBranch = () => {
    // Refresh the branch data
    setApiData(null);
    useApi.get("api/news/get-all").then((response) => {
      setApiData(response);
    });
    // setReload(!reload)
  };

  const dataTableColumns = [
    // {
    //   name: "#",
    //   selector: (row) => row.id,
    //   width: "55px",
    //   sortable: true,
    //   cell: (row, index) => index + 1,
    // },
    {
      name: "title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      compact: true,
      cell:(row)=>(
        <span className=" m-2">{row.title}</span>
      )
    },

    {
      name: "content",
      selector: (row) => row.content,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
 

    {
      name: "Created At",
      selector: (row) => row.createdAt,
      wrap: true,
      width: "130px",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.createdAt);
        
        // Month abbreviation mapping
        const monthAbbreviations = [
          "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" 
        ];
        const formattedDate = `${date.getDate()}-${monthAbbreviations[date.getMonth()]}-${date.getFullYear()}`;
        return <span>{formattedDate}</span>;
      }
    }
    
    ,    
    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button color="primary" size="sm" className="btn-icon btn-dim text-stone-500" onClick={() => openModal(row)}>
            <Icon name="edit"></Icon>
          </Button>

          <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim text-stone-500"
            onClick={() => deleteModal("api/news/delete/", row._id, updateBranch)}
          >
            <Icon name="trash-fill"></Icon>
          </Button>
        </div>
      ),

    },
  ];

  return (
    <>
      <Head title="News List" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>News</BlockTitle>
              <BlockDes className="text-soft">Manage your News</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              {/* <Link to={"/add-branch"}>
                <Button color="primary">
                  <span>Add Branch</span>
                </Button>
              </Link> */}
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
          {apiData ? (
            <ReactDataTable
              data={apiData}
              columns={dataTableColumns}
              expandableRows
              progressPending={isLoading}
              pagination
              actions
              searchBy={"username"}
            />
          ) : (
            <div className="d-flex justify-content center">
              {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
            </div>
          )}
        </PreviewCard>

        {/* <Card className="card-stretch border">
          <ReactDataTableAlt data={DataTableData} columns={dataTableColumns} expandableRows pagination actions />
        </Card> */}
      </Content>
      <EditBranchModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        branchData={branchModalData}
        updateBranch={updateBranch}
      />
    </>
  );
};
export default UserList;
