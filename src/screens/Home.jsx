import React, { useState} from 'react';
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import category from "../foodData2.json";


export default function Home() {
  const [categ] = useState(category);
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" style={{ maxHeight: 500 }}>
          <div className="carousel-caption" style={{ "zIndex": 1 }}>
            <div className="d-flex justify-content-center" role="search" >
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
              value={search} onChange={(e)=>{
                setSearch(e.target.value)
              }}/>
              {/* <button className="btn bg-success text-light" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?burger" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pastry" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pizza" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {
          categ !== []
            ? categ.map((data) => {
              // console.log(data.id);

              return (
                <div className='row mb-3'>
                  <div className="fs-3 mb-3" key={data.id}>
                    {data.CategoryName}
                    <hr />
                  </div>
                  {
                    categ.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map((filterItem) => {
                        return (
                          <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                            <Cards
                              fooditem={filterItem}
                              foodOpetion={filterItem.options[0]}
                               />
                          </div>
                        )
                      })
                  }

                </div>
              )
            }) : <div>No Data Such Found</div>
        }
      </div>
    </>
  )
}
