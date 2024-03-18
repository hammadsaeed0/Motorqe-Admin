import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Row, Col } from "reactstrap";
import { Block, d, Button, PreviewCard } from "../../../components/Component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FormLayoutsPage = ({ ...props }) => {
  const navigate = useNavigate();
  const [typeOfAd, setTypeOfAd] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [cylinder, setCylinder] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [wheelDrive, setWheelDrive] = useState("");
  const [gearBox, setGearBox] = useState("");
  const [exteriorColour, setExteriorColour] = useState("");
  const [interiorColour, setInteriorColour] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [warranty, setWarranty] = useState("");
  const [inspection, setInspection] = useState("");
  const [priceQR, setPriceQR] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [negotiable, setNegotiable] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const negotiableBooleanValue = Boolean(negotiable);
    const inspectionBooleanValue = Boolean(inspection);
    // console.log(typeof negotiableBooleanValue);
    // console.log(typeof inspectionBooleanValue);
    const raw = JSON.stringify({
      type_of_ad: typeOfAd,
      make: make,
      model: model,
      year: year,
      vehicle_condition: vehicleCondition,
      vehicle_category: vehicleCategory,
      specifications: specifications,
      cylinder: cylinder,
      engine_size: engineSize,
      wheel_drive: wheelDrive,
      gear_box: gearBox,
      exterior_colour: exteriorColour,
      interior_colour: interiorColour,
      fuel_type: fuelType,
      warranty: warranty,
      inspection: inspectionBooleanValue,
      price_QR: priceQR,
      price_range: priceRange,
      negotiable: negotiableBooleanValue,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://34.216.84.212/api/admin/car-info/add-select-items", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        if (data.success == true) {
          // console.log("Hey");
          setIsLoading(false);

          toast("Fields Add Successfully");
          // navigate("/carListingDetails");
        } else {
          setIsLoading(false);

          toast("Something Went Wrong");
        }
      })
      .catch((error) => {
        setIsLoading(false);

        toast(error);
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <Head title="Form Layouts" />
      <Content page="component">
        <Block size="lg">
          <PreviewCard>
            <div className="card-head">
              <h5 className="card-title">Add Car Listing Details</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <Row className="g-4">
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="type_of_ad">
                      Type Of Ad
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="full-name-1"
                        className="form-control"
                        value={typeOfAd}
                        onChange={(e) => setTypeOfAd(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="make">
                      Make
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="form-control"
                        className="form-control"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="model">
                      Model
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="model"
                        className="form-control"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="year">
                      Year
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="year"
                        className="form-control"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="vehicle_condition">
                      Vehicle Condition
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="vehicleCondition"
                        className="form-control"
                        value={vehicleCondition}
                        onChange={(e) => setVehicleCondition(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="vehicle_category">
                      Vehicle Category
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="vehicleCategory"
                        className="form-control"
                        value={vehicleCategory}
                        onChange={(e) => setVehicleCategory(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="specifications">
                      Specifications
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="specifications"
                        className="form-control"
                        value={specifications}
                        onChange={(e) => setSpecifications(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cylinder">
                      Cylinder
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="cylinder"
                        className="form-control"
                        value={cylinder}
                        onChange={(e) => setCylinder(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="engine_size">
                      Engine Size
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="engineSize"
                        className="form-control"
                        value={engineSize}
                        onChange={(e) => setEngineSize(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="wheel_drive">
                      Wheel Drive
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="wheelDrive"
                        className="form-control"
                        value={wheelDrive}
                        onChange={(e) => setWheelDrive(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="gear_box">
                      Gear Box
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="gearBox"
                        className="form-control"
                        value={gearBox}
                        onChange={(e) => setGearBox(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="exterior_colour">
                      Exterior Colour
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="exteriorColour"
                        className="form-control"
                        value={exteriorColour}
                        onChange={(e) => setExteriorColour(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="interior_colour">
                      Interior Colour
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="interiorColour"
                        className="form-control"
                        value={interiorColour}
                        onChange={(e) => setInteriorColour(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fuel_type">
                      Fuel Type
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="fuelType"
                        className="form-control"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="warranty">
                      Warranty
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="warranty"
                        className="form-control"
                        value={warranty}
                        onChange={(e) => setWarranty(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="inspection">
                      Inspection
                    </label>
                    <div className="form-control-wrap">
                      <select
                        id="inspection"
                        className="form-control"
                        value={inspection}
                        onChange={(e) => setInspection(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </div>
                </Col>

                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="price_QR">
                      Price QR
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="priceQR"
                        className="form-control"
                        value={priceQR}
                        onChange={(e) => setPriceQR(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="price_range">
                      Price Range
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="priceRange"
                        className="form-control"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="negotiable">
                      Negotiable
                    </label>
                    <div className="form-control-wrap">
                      <select
                        id="negotiable"
                        className="form-control"
                        value={negotiable}
                        onChange={(e) => setNegotiable(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </div>
                </Col>
                <Col xl="12">
                  <Button type="submit" color="primary" size="lg" style={{ backgroundColor: "#FA5824" }}>
                    {isLoading ? "Loading..." : "Save Information"}
                  </Button>
                </Col>
              </Row>
            </form>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default FormLayoutsPage;
