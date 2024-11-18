
import React from 'react';


import Header from '../../Esquema/Header.js';
import Footer from '../../Esquema/Footer';

const Precios = () => {


  return (
    <>
      <Header />
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-0">
            <div className="col-12 mb-3">
              <div className="row justify-content-center justify-content-sm-between">
                <div className="col-sm-auto text-center">
                  <h5 className="d-inline-block">Billed Annually</h5><span className="badge badge-subtle-success rounded-pill ms-2">Save 25%</span>
                </div>
                <div className="col-sm-auto d-flex justify-content-center mt-1 mt-sm-0">
                  <label className="form-check-label me-2" for="customSwitch1">Monthly</label>
                  <div className="form-check form-switch mb-0">
                    <input className="form-check-input falcon-dual-switch" id="customSwitch1" type="checkbox" checked="checked" />
                    <label className="form-check-label align-top" for="customSwitch1">Yearly</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 border-top border-bottom">
              <div className="h-100">
                <div className="text-center p-4">
                  <h3 className="fw-normal my-0">Single</h3>
                  <p className="mt-3">For teams that need to create project plans with confidence.</p>
                  <h2 className="fw-medium my-4"> <sup className="fw-normal fs-7 me-1">&dollar;</sup>0<small className="fs-10 text-700">/ year</small>
                  </h2><a className="btn btn-outline-primary" href="../../app/e-commerce/billing.html">Start free trial</a>
                </div>
                <hr className="border-bottom-0 m-0" />
                <div className="text-start px-sm-4 py-4">
                  <h5 className="fw-medium fs-9">Track team projects with free:</h5>
                  <ul className="list-unstyled mt-3">
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Timeline
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Advanced Search
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Custom fields <div className="badge badge-subtle-success rounded-pill">New</div>
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Task dependencies
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Private teams & projects
                    </li>
                  </ul><a className="btn btn-link" href="/">More about Single</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 border-top border-bottom dark__bg-1000 px-4 px-lg-0" style={{ backgroundColor: 'rgba(115, 255, 236, 0.18)' }}>
              <div className="h-100">
                <div className="text-center p-4">
                  <h3 className="fw-normal my-0">Business</h3>
                  <p className="mt-3">For teams and companies that need to manage work across initiatives.</p>
                  <h2 className="fw-medium my-4"> <sup className="fw-normal fs-7 me-1">&dollar;</sup>39<small className="fs-10 text-700">/ year</small>
                  </h2><a className="btn btn-primary" href="../../app/e-commerce/billing.html">Get Business</a>
                </div>
                <hr className="border-bottom-0 m-0" />
                <div className="text-start px-sm-4 py-4">
                  <h5 className="fw-medium fs-9">Everything in Premium, plus:</h5>
                  <ul className="list-unstyled mt-3">
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Portfolios
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Lock custom fields
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Onboarding plan
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Resource Management
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Lock custom fields
                    </li>
                  </ul><a className="btn btn-link" href="/">More about Business</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 border-top border-bottom">
              <div className="h-100">
                <div className="text-center p-4">
                  <h3 className="fw-normal my-0">Extended</h3>
                  <p className="mt-3">For organizations that need additional security and support.</p>
                  <h2 className="fw-medium my-4"> <sup className="fw-normal fs-7 me-1">&dollar;</sup>99<small className="fs-10 text-700">/ year</small>
                  </h2><a className="btn btn-outline-primary" href="../../app/e-commerce/billing.html">Purchase</a>
                </div>
                <hr className="border-bottom-0 m-0" />
                <div className="text-start px-sm-4 py-4">
                  <h5 className="fw-medium fs-9">Everything in Business, plus:</h5>
                  <ul className="list-unstyled mt-3">
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Portfolios
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Tags <div className="badge badge-subtle-primary rounded-pill">Coming soon</div>
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Onboarding plan
                    </li>
                    <li className="py-1"><span className="me-2 fas fa-check text-success"> </span> Resource Management
                    </li>
                  </ul><a className="btn btn-link" href="/">More about Extended</a>
                </div>
              </div>
            </div>
            <div className="col-12 text-center">
              <h5 className="mt-5">Looking for personal or small team task management?</h5>
              <p className="fs-8">Try the <a href="/">basic version</a> of Falcon</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Precios;
