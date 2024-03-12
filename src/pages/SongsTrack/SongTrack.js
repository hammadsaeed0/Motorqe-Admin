import React, { useState } from "react";
import { Badge, Spinner, Modal, ModalHeader, ModalBody  } from "reactstrap";
import { Link } from "react-router-dom";
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
import EditBranchModal from "./EditKaraokeModal";
import ReactPlayer from "react-player";

// import EditBranchModal from "./EditUserModal";

const SongTrack = () => {
  const { useApi, isLoading } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [playingAudios, setPlayingAudios] = useState({});
  const [playingPlayback, setPlayingPlayback] = useState({});
  const [playingKaraoke, setPlayingKaraoke] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  


  const [audioUrl, setAudioUrl] = useState("");
  const [isModalOpenPlayer, setModalOpenPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlay = (url) => {
    setAudioUrl(url);
    setIsPlaying(true);
    setModalOpenPlayer(true);
  };

  const handleCloseModal = () => {
    setModalOpenPlayer(false);
    setAudioUrl("");
    setIsPlaying(false);
  };


  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/song-track/get-all").then((response) => {
      setApiData(response);
    });
  }, []);

  const playAudio = (audioUrl, row, type) => {
    const playingState = type === "playback" ? playingPlayback : playingKaraoke;
    const setPlayingState = type === "playback" ? setPlayingPlayback : setPlayingKaraoke;

    setPlayingState((prev) => {
      const isPlaying = prev[row._id];

      // Pause the currently playing audio
      if (currentlyPlaying && currentlyPlaying !== prev[row._id]) {
        currentlyPlaying.pause();
        setCurrentlyPlaying(null);
      }

      if (isPlaying) {
        prev[row._id].pause();
        prev[row._id] = null;
      } else {
        const audio = new Audio(audioUrl);
        audio.play();
        prev[row._id] = audio;

        audio.addEventListener("ended", () => {
          setPlayingState((prev) => {
            prev[row._id] = null;
            return { ...prev };
          });
        });
      }

      setCurrentlyPlaying(isPlaying ? null : prev[row._id]);

      // Reset the state of other audio icons to "play"
      Object.keys(prev).forEach((key) => {
        if (key !== row._id && prev[key]) {
          prev[key].pause();
          prev[key] = null;
        }
      });

      return { ...prev };
    });
  };

  const updateSong = () => {
    // Refresh the branch data
    setApiData(null);
    useApi.get("api/song-track/get-all").then((response) => {
      setApiData(response);
    });
    // setReload(!reload)
  };

  const dataTableColumns = [
    {
      name: "Song Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },

    {
      name: "lyric",
      selector: (row) => row.lyric,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },

    {
      name: "Playback",
      selector: (row) => row.playbackUrl,
      sortable: true,
      center: true,
      width: "120px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button
            color={playingPlayback[row._id] ? "danger" : "info"}
            size="sm"
            className="btn-icon btn-dim text-stone-500 "
            onClick={()=>handlePlay(row.playbackUrl)}
            // onClick={() => {
            //   playAudio(row.playbackUrl, row, "playback");
            // }}
          >
            <Icon name={playingPlayback[row._id] ? "stop-circle" : "play-circle"}></Icon>
          </Button>
        </div>
      ),
    },

    {
      name: "karaoke",
      selector: (row) => row.karaokeUrl,
      sortable: true,
      center: true,
      width: "120px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button
           color={playingKaraoke[row._id] ? "danger" : "info"}
            size="sm"
            className="btn-icon btn-dim  text-stone-500"
            onClick={()=>handlePlay(row.karaokeUrl)}
            // onClick={() => {
            //   playAudio(row.karaokeUrl, row, "karaoke");
            // }}
          >
            <Icon name={playingKaraoke[row._id] ? "stop-circle" : "play-circle"}></Icon>
          </Button>
        </div>
      ),
    },

  
    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button color="primary" size="sm" className="btn-icon btn-dim " onClick={() => openModal(row)}>
            <Icon name="edit"></Icon>
          </Button>

          <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim text-stone-500"
            onClick={() => deleteModal("api/song-track/delete/", row._id, updateSong)}
          >
            <Icon name="trash-fill"></Icon>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head title="Karaoke" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Karaoke</BlockTitle>
              <BlockDes className="text-soft">Manage your Karaoke</BlockDes>
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


        {isModalOpenPlayer && (
          <Modal isOpen={isModalOpenPlayer} toggle={handleCloseModal}>
            <ModalHeader toggle={handleCloseModal}>Audio Player</ModalHeader>
            <ModalBody>
              <ReactPlayer
                url={audioUrl}
                playing={isModalOpenPlayer}
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
              progressPending={isLoading}
              pagination
              actions
              searchBy={"name"}
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
        updateBranch={updateSong}
      />
    </>
  );
};
export default SongTrack;
