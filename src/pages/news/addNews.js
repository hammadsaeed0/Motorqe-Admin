import React, { useState ,useEffect} from "react";
import { Form, Spinner, Alert, Col, Row, Badge, Card} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useNavigation } from "react-router-dom";

//***************************************************************************************/
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useApiHook } from "utils/api";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, Icon, PreviewCard } from "components/Component";
import UserList from "./NewsList";
import ViewNewsModal from "./ViewNewsModal"; 
import NewsListNew from "./NewsListNew";

const AddNews = () => {
  const [errorVal, setErrorValue] = useState("");
  const { useApi, isLoading, error, data } = useApiHook();
  const [apiData, setApiData] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);    
  const [viewModalData, setViewModalData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setErrorValue("");
    useApi
      .post("api/news/add", formData)
      .then((response) => {
        reset();
        toast.success(" News Added Successfully", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        navigate("/news-list");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          // Set the server-side validation errors in the form state
          const serverErrors = error.response.data.errors;
          for (let field in serverErrors) {
            setError(field, {
              message: serverErrors[field],
            });
          }
        }
      });
  };
  const openViewModal = (row) => {
    setViewModalData(row);
    setViewModalOpen(true);
  };
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // {resolver:yupResolver(createBranchValidationSchema)}
  useEffect(() => {
    useApi.get("api/news/get-all").then((response) => {
      setApiData(response);
      console.log("apiData:",apiData)
    });
  }, []); 

  useEffect(() => {
    const formattedDate = new Date().toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []); 

  return (
    <>
      <Head title="Add News" />
      <Content> 
        <Block className="">
           <div className="flex m-1 ">
           <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Create News</BlockTitle>
              <BlockDes>
                <p>Enter Detail to Create Your News</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {/* <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Create News</BlockTitle>
              <BlockDes>
                <p>Enter Detail to Create Your News</p>
              </BlockDes>
            </BlockContent>
          </BlockHead> */}
           </div>
          <PreviewCard className=" nk-auth-pCard " bodyClass="card-inner-lg">
            {errorVal && (  
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <div className="flex">
            <Form className="is-alter  w-50"  onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="flex flex-col g-4">
               
              <Col lg="11">
               <div className="form-group">
                   <div className="form-label-group">
                   <label className="form-label" htmlFor="date">
                    Date <span className="text-danger">*</span>
                   </label>
               </div>
          <div className="form-control-wrap">
         <input
              type="text"
             id="date"
              {...register("date")}
              placeholder="Enter your date"
              className="form-control-lg form-control"
              readOnly // Make the input read-only
             value={currentDate}
        />
      {errors.date && <span className="invalid">{errors.date.message}</span>}
    </div>  
  </div>
              </Col>

                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="title">
                        Tittle <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="title"
                        {...register("title")}
                        placeholder="Enter Title"
                        className="form-control-lg form-control"
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col lg="11">
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="content">
                        Content <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <textarea
                        type="text"
                        id="content"
                        {...register("content")}
                        placeholder="Enter your Content"
                        className="form-control-lg form-control"
                      />
                      {errors.content && <span className="invalid">{errors.content.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col xl="11">
                  <Button className=" text-stone-500" disabled={isLoading} color="primary" size="lg" type="submit">
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="light" />
                        <span> Loading... </span>
                      </>
                    ) : (
                      "Add News"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
            
             <div className="w-70 " style={{ height: '450px', overflow: 'scroll' }}>
             <NewsListNew />
             </div>
       </div>

            <div className="form-note-s2 text-center pt-4">
              Skip and <Link to={`/news-list`}>Goto News List</Link>
            </div>
          </PreviewCard>
        </Block>
      </Content>
      <ViewNewsModal isOpen={isViewModalOpen} toggle={() => setViewModalOpen(!isViewModalOpen)} newsData={viewModalData} />
    </>
  );
};
export default AddNews;
