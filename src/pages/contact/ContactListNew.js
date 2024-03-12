import React, { useState } from "react";
import { Badge, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useApiHook } from "utils/api";
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
import ViewNewsModal from "./ViewContactModal";

const ContactListNew = () => {
    const { useApi, isLoading } = useApiHook();
    const [branchModalData, setBranchModalData] = useState([]);
    const [apiData, setApiData] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const navigate = useNavigate();
  
    const openEditModal = (branch) => {
      setBranchModalData(branch);
      setEditModalOpen(true);
    };
  
    const openViewModal = (row) => {
      setSelectedNews(row);
      setViewModalOpen(true);
    };
  
    useEffect(() => {
      useApi.get("api/contact/get-all").then((response) => {
        setApiData(response);
      });
    }, []);

    const dataTableColumns = [
      {
        name: "Time",
        selector: (row) => row.time,
        sortable: true,
        wrap: true,
        compact: true,
        cell: (row) => <span className="m-2">{row.time}</span>, 
      },
      {
        name: "Title",
        selector: (row) => row.title,
        wrap: true,
        width: "130px",
        sortable: true,
        cell: (row) => (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {row.content}
          </div>
        ),
      },
      {
        name: "Content",
        selector: (row) => row.content,
        wrap: true,
        width: "130px",
        sortable: true,
        cell: (row) => (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {row.content}
          </div>
        ),
      },
      {
        name: "Actions",
        width: "150px",
        cell: (row) => (
          <div className="tb-odr-btns">
            {/* <Button
              color="primary"
              size="sm"
              className="btn-icon btn-dim text-stone-500"
              onClick={() => openEditModal(row)}
            >
              <Icon name="edit" />
            </Button> */}
            <Button
              color="info"
              size="sm"
              className="btn-icon btn-dim text-stone-500"
              onClick={() => openViewModal(row)}
            >
              <Icon name="eye" />
            </Button>
            {/* <Button
              color="danger"
              size="sm"
              className="btn-icon btn-dim text-stone-500"
              onClick={() => deleteModal("api/news/delete/", row._id, updateBranch)}
            >
              <Icon name="trash-fill" />
            </Button> */}
          </div>
        ),
      },
    ];
  
    return (
      <>
        <Head title="News List" />
        <Content>
          <PreviewCard>
            {apiData ? (
              <ReactDataTable
                data={apiData}
                columns={dataTableColumns}
                expandableRows
                progressPending={isLoading}
              />
            ) : (
              <div className="d-flex justify-content center">
                {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
              </div>
            )}
          </PreviewCard>
        </Content>
        <ViewNewsModal
          isOpen={isViewModalOpen}
          toggle={() => setViewModalOpen(!isViewModalOpen)} 
          newsData={selectedNews}
        />
      </>
    );
  };
  
  export default ContactListNew;
  