import React, { useEffect, useState } from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";

const FeaturedTourList = () => {
  const [featuredTours, setFeat] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(()=>{
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/tours/search/getFeaturedTours`, {
          method: "GET",
        })
        const data = await res.text();
        const parsedData =await  JSON.parse(data);
        console.log(parsedData)
        setFeat(parsedData.data);
        setLoading(false);
        } catch (err) {
          setError(String(err));
          }
    }

    fetchFeaturedTours()
  }, [])
  // Log the data to ensure it's correct
  //console.log("Featured Tours:", featuredTours);

  return (
    <>
      {loading && <h4>Loading...........</h4>}
      {error && <h4>{error}</h4>}
      {!loading && !error && featuredTours?.map(tour => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
