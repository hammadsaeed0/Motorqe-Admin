import React, { useEffect, useRef, useState } from "react";
import Content from "../../layout/content/Content";
import { PreviewCard, Progress } from "../../components/Component";
import { Button, Col, Row, Input, Label, Form, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AWS from "aws-sdk";
import api, { useApiHook } from "utils/api";
import { useNavigate } from "react-router-dom";

const Karaoke = ({ ...props }) => {
  const [karaokeFile, setKaraokeFile] = useState(null);
  const [playbackFile, setPlaybackFile] = useState(null);
  const [karaokeUploadProgress, setKaraokeUploadProgress] = useState(0);
  const [playbackUploadProgress, setPlaybackUploadProgress] = useState(0);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const navigate = useNavigate();
  const { useApi, data } = useApiHook();
  const schema = yup.object().shape({
    name: yup.string().required("Song Name is required"),
    lyric: yup.string().required("Lyric is Required"),
  });

  const getAwsS3 = async () => {
    useApi.get("api/aws-s3/get-aws-s3");
  };
  useEffect(() => {
    getAwsS3();
  }, []);

  const handleKaraokeFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if the selected file is a valid type for karaoke
    const supportedFormats = ["audio/mpeg", "audio/mp3",'audio/mp3','audio/wav','audio/aac','audio/flac','audio/wma','audio/oog','audio/m4a','audio/aiff','audio/amr',,'audio/mp2'];
    if (selectedFile && !supportedFormats.includes(selectedFile.type)) {
      toast.error("Please select a valid audio file for karaoke.");
      event.target.value = null;
    } else {
      setKaraokeFile(selectedFile);
    }
  };

  const handlePlaybackFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if the selected file is a valid type for playback
    const supportedFormats = ["audio/mpeg", "audio/mp3"];
    if (selectedFile && !supportedFormats.includes(selectedFile.type)) {
      toast.error("Please select a valid audio file for playback.");
      event.target.value = null;
    } else {
      setPlaybackFile(selectedFile);
    }
  };

  const s3 = new AWS.S3({
    accessKeyId: data?.accessKey,
    secretAccessKey: data?.secretAccessKey,
    region: data?.region,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadFileToS3 = async (file, setUploadProgress) => {
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileNameWithRandomString = `${randomString}_${file.name}`;
    const params = {
      Bucket: data?.bucket,
      Key: `karaoke/${fileNameWithRandomString}`,
      Body: file,
    };

    return new Promise((resolve, reject) => {
      const upload = s3.upload(params);

      upload.on("httpUploadProgress", (progress) => {
        const percentage = Math.round((progress.loaded / progress.total) * 100);
        setUploadProgress(percentage);
      });

      upload.send((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  };

  const onSubmit = async (data) => {
    console.log(data)
    setIsFileUploading(true);

    try {
      // Upload karaoke file
      const karaokeUrl = await uploadFileToS3(karaokeFile, setKaraokeUploadProgress);

      // Upload playback file
      const playbackUrl = await uploadFileToS3(playbackFile, setPlaybackUploadProgress);

      // Call API to save data with both URLs
      await api
        .post("api/song-track/add", { karaokeUrl, playbackUrl, name: data.name, lyric: data.lyric })
        .then((res) => {
          navigate("/songslist");
          toast.success("Successfully uploaded audio files.");
        })
        .catch((err) => {
          toast.error("Audio file uploading failed.");
        });
    } catch (error) {
      toast.error("Error uploading audio files.");
    } finally {
      setIsFileUploading(false);
      setKaraokeUploadProgress(0);
      setPlaybackUploadProgress(0);
    }
  };
  return (
    <React.Fragment>
      <Content>
        <PreviewCard>
          
          <div className="card-head">
            <h5 className="card-title">Upload Videos</h5>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-4">
              <Col lg="12">
                <div className="form-group">
                  <label className="form-label">Song Name</label>
                  <div className="form-control-wrap">
                    <input {...register("name")} type="text" className="form-control" placeholder="Enter Song Name" />
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                  </div>
                </div>
              </Col>

              <Col>
                <div className="form-group">
                  <label className="form-label">lyric</label>
                  <div className="form-control-wrap">
                    <textarea {...register("lyric")} type="text" className="form-control" placeholder="Enter lyric" />
                    {errors.lyric && <span className="invalid">{errors.lyric.message}</span>}
                  </div>
                </div>
              </Col>

              <Row className="g-4 mt-4">
                <Col sm="12">
                  <Label className="form-label">Upload karaoke </Label>
                  <div>
                    <input
                      {...register("karaokeUrl")}
                      className="form-control form-control-lg"
                      id="karaokeFile"
                      type="file"
                      onChange={handleKaraokeFileChange}
                    />
                    {errors.karaokeUrl && <span className="invalid">{errors.karaokeUrl.message}</span>}
                  </div>
                  {karaokeUploadProgress > 0 && (
                    <div className="mt-4 ">
                      <Progress value={karaokeUploadProgress} className="progress-lg" />
                      <div className="text-center">{`${karaokeUploadProgress}% Uploaded`}</div>
                    </div>
                  )}
                </Col>

                <Col sm="12">
                  <Label className="form-label">Upload playback </Label>
                  <div>
                    <input
                      {...register("playbackUrl")}
                      className="form-control form-control-lg"
                      id="playbackFile"
                      type="file"
                      onChange={handlePlaybackFileChange}
                    />
                    {errors.playbackUrl && <span className="invalid">{errors.playbackUrl.message}</span>}
                  </div>
                  {playbackUploadProgress > 0 && (
                    <div className="mt-4 ">
                      <Progress value={playbackUploadProgress} className="progress-lg" />
                      <div className="text-center">{`${playbackUploadProgress}% Uploaded`}</div>
                    </div>
                  )}
                </Col>
                <Col xl="12">
                  <Button disabled={isFileUploading} size="lg" className="btn text-stone-500" type="submit" color="primary">
                    {isFileUploading ? (
                      <>
                        <Spinner size="sm" color="light" />
                        <span> Uploading... </span>
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        </PreviewCard>
      </Content>
    </React.Fragment>
  );
};

export default Karaoke;
