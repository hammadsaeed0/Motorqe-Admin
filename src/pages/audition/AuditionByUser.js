import React, { useState } from "react";
import { Badge, Spinner, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useApiHook } from "utils/api";
import { useNavigate } from 'react-router-dom';
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
import ReactPlayer from "react-player";
// import EditBranchModal from "./EditUserModal";

const AuditionByUser = () => {
  const { useApi, isLoading } = useApiHook();
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();
  const [audioUrl, setAudioUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { userId } = useParams();

  const handlePlay = (url) => {
    setModalOpen(true);
    setAudioUrl(url);
    setIsPlaying(true);
    
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAudioUrl("");
    setIsPlaying(false);
  };

  const navigateToNews = () => {
    navigate('/user');
  };
  //   const openModal = (branch) => {
  //     setBranchModalData(branch);
  //     setModalOpen(true); // Function to open the modal
  //   };

  useEffect(() => {
    useApi.get(`api/admin/audition/get-by-user/${userId}`).then((response) => {
      setApiData(response);
    });
  }, []);

  //   const updateBranch = () => {
  //     // Refresh the branch data
  //     setApiData(null);
  //     useApi.get("api/admin/user/user-list").then((response) => {
  //       setApiData(response);
  //     });
  //     // setReload(!reload)
  //   };

  const dataTableColumns = [
    {
      name: "Karaoke Name",
      selector: (row) => row?.songTrack?.name,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },

    {
      name: "Audition Date",
      selector: (row) => row?.createdAt,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },

    {
      name: "play",
      selector: (row) => row.play,
      sortable: true,
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button color="danger" size="sm" className="btn-icon btn-dim " onClick={() => handlePlay(row.url)}>
            <Icon name="play-circle"></Icon>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head title="User" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Audition List</BlockTitle>
              <BlockDes className="text-soft">Manage your Audition</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              {/* <Link to={"/add-branch"}>
                <Button color="primary">
                  <span>Add Branch</span>
                </Button>
              </Link> */}
            </BlockHeadContent>
            
          </BlockBetween>
          {/* <Button  className="bg-blue" onClick={navigateToNews}>
      Go Back 
    </Button> */}
        </BlockHead>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} toggle={handleCloseModal}>
            <ModalHeader toggle={handleCloseModal}>Audio Player</ModalHeader>
            <ModalBody>
              <ReactPlayer
                url={audioUrl}
                playing={isModalOpen}
                controls
                width="100%"
                height="50px"
              />
            </ModalBody>
          </Modal>
        )}

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
      {/* <EditBranchModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        branchData={branchModalData}
        updateBranch={updateBranch}
      /> */}
    </>
  );
};
export default AuditionByUser;
