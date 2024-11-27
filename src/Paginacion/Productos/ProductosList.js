import React from 'react';

const ProductosList = () => {


  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row flex-between-center">
            <div className="col-sm-auto mb-2 mb-sm-0">
              <h6 className="mb-0">Showing 1-24 of 205 Products</h6>
            </div>
            <div className="col-sm-auto">
              <div className="row gx-2 align-items-center">
                <div className="col-auto">
                  <form className="row gx-2">
                    <div className="col-auto"><small>Sort by: </small></div>
                    <div className="col-auto">
                      <select className="form-select form-select-sm" aria-label="Bulk actions">
                        <option selected="">Best Match</option>
                        <option value="Refund">Newest</option>
                        <option value="Delete">Price</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="col-auto pe-0"><a className="text-600 px-1" href="../../../app/e-commerce/product/product-grid.html" data-bs-toggle="tooltip" title="Product Grid"><span className="fas fa-th"></span></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body p-0 overflow-hidden">
          <div className="row g-0">
            <div className="col-12 p-x1">
              <div className="row">
                <div className="col-sm-5 col-md-4">
                  <div className="position-relative h-sm-100"><a className="d-block h-100" href="../../../app/e-commerce/product/product-details.html"><img className="img-fluid object-fit-cover w-sm-100 h-sm-100 rounded-1 absolute-sm-centered" src="/products/2.jpg" alt="" /></a>
                    <div className="badge rounded-pill bg-success position-absolute top-0 end-0 me-2 mt-2 fs-11 z-2">New</div>
                  </div>
                </div>
                <div className="col-sm-7 col-md-8">
                  <div className="row">
                    <div className="col-lg-8">
                      <h5 className="mt-3 mt-sm-0"><a className="text-1100 fs-9 fs-lg-8" href="../../../app/e-commerce/product/product-details.html">Apple iMac Pro (27-inch with Retina 5K Display, 3.0GHz 10-core Intel Xeon W, 1TB SSD)</a></h5>
                      <p className="fs-10 mb-2 mb-md-3"><a className="text-500" href="#!">Computer &amp; Accessories</a></p>
                      <ul className="list-unstyled d-none d-lg-block">
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>16GB RAM</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>1TB SSD Hard Drive</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>10-core Intel Xeon</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Mac OS</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Secured</span></li>
                      </ul>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-between flex-column">
                      <div>
                        <h4 className="fs-8 fs-md-7 text-warning mb-0">$1199.5</h4>
                        <h5 className="fs-10 text-500 mb-0 mt-1">
                          <del>$2399 </del><span className="ms-1">-50%</span>
                        </h5>
                        <div className="mb-2 mt-3"><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-300"></span><span className="ms-1">(8)</span>
                        </div>
                        <div className="d-none d-lg-block">
                          <p className="fs-10 mb-1">Shipping Cost: <strong>$50</strong></p>
                          <p className="fs-10 mb-1">Stock: <strong className="text-success">Available</strong>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2"><a className="btn btn-sm btn-outline-secondary border-300 d-lg-block me-2 me-lg-0" href="#!"><span className="far fa-heart"></span><span className="ms-2 d-none d-md-inline-block">Favourite</span></a><a className="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span className="fas fa-cart-plus"> </span><span className="ms-2 d-none d-md-inline-block">Add to Cart</span></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-x1 bg-100">
              <div className="row">
                <div className="col-sm-5 col-md-4">
                  <div className="position-relative h-sm-100">
                    <div className="swiper-container theme-slider h-100" data-swiper='{"autoplay":true,"autoHeight":true,"spaceBetween":5,"loop":true,"loopedSlides":5,"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"}}'>
                      <div className="swiper-wrapper h-100">
                        <div className="swiper-slide h-100"><a className="d-block h-sm-100" href="../../../app/e-commerce/product/product-details.html"><img className="rounded-1 h-100 w-100 object-fit-cover" src="/products/1.jpg" alt="" /></a></div>
                        <div className="swiper-slide h-100"><a className="d-block h-sm-100" href="../../../app/e-commerce/product/product-details.html"><img className="rounded-1 h-100 w-100 object-fit-cover" src="/products/1-2.jpg" alt="" /></a></div>
                        <div className="swiper-slide h-100"><a className="d-block h-sm-100" href="../../../app/e-commerce/product/product-details.html"><img className="rounded-1 h-100 w-100 object-fit-cover" src="/products/1-3.jpg" alt="" /></a></div>
                      </div>
                      <div className="swiper-nav">
                        <div className="swiper-button-next swiper-button-white"></div>
                        <div className="swiper-button-prev swiper-button-white"></div>
                      </div>
                    </div>
                    <div className="badge rounded-pill bg-success position-absolute top-0 end-0 me-2 mt-2 fs-11 z-2">New</div>
                  </div>
                </div>
                <div className="col-sm-7 col-md-8">
                  <div className="row">
                    <div className="col-lg-8">
                      <h5 className="mt-3 mt-sm-0"><a className="text-1100 fs-9 fs-lg-8" href="../../../app/e-commerce/product/product-details.html">Apple MacBook Pro (15&quot; Retina, Touch Bar, 2.2GHz 6-Core Intel Core i7, 16GB RAM, 256GB SSD) - Space Gray (Latest Model)</a></h5>
                      <p className="fs-10 mb-2 mb-md-3"><a className="text-500" href="#!">Computer &amp; Accessories</a></p>
                      <ul className="list-unstyled d-none d-lg-block">
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>16GB RAM</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>256GB SSD Hard Drive</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Intel Core i7</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Mac OS</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Space Gray</span></li>
                      </ul>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-between flex-column">
                      <div>
                        <h4 className="fs-8 fs-md-7 text-warning mb-0">$7199</h4>
                        <div className="mb-2 mt-3"><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star-half-alt text-warning star-icon"></span><span className="ms-1">(20)</span>
                        </div>
                        <div className="d-none d-lg-block">
                          <p className="fs-10 mb-1">Shipping Cost: <strong>$65</strong></p>
                          <p className="fs-10 mb-1">Stock: <strong className="text-danger">Sold-Out</strong>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2"><a className="btn btn-sm btn-outline-secondary border-300 d-lg-block me-2 me-lg-0" href="#!"><span className="far fa-heart"></span><span className="ms-2 d-none d-md-inline-block">Favourite</span></a><a className="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span className="fas fa-cart-plus"> </span><span className="ms-2 d-none d-md-inline-block">Add to Cart</span></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-x1">
              <div className="row">
                <div className="col-sm-5 col-md-4">
                  <div className="position-relative h-sm-100"><a className="d-block h-100" href="../../../app/e-commerce/product/product-details.html"><img className="img-fluid object-fit-cover w-sm-100 h-sm-100 rounded-1 absolute-sm-centered" src="/products/4.jpg" alt="" /></a>
                  </div>
                </div>
                <div className="col-sm-7 col-md-8">
                  <div className="row">
                    <div className="col-lg-8">
                      <h5 className="mt-3 mt-sm-0"><a className="text-1100 fs-9 fs-lg-8" href="../../../app/e-commerce/product/product-details.html">Apple iPad Air 2019 (3GB RAM, 128GB ROM, 8MP Main Camera)</a></h5>
                      <p className="fs-10 mb-2 mb-md-3"><a className="text-500" href="#!">Mobile &amp; Tabs</a></p>
                      <ul className="list-unstyled d-none d-lg-block">
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>3GB RAM</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>128GB ROM</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Apple A12 Bionic (7 nm)</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>iOS 12.1.3</span></li>
                      </ul>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-between flex-column">
                      <div>
                        <h4 className="fs-8 fs-md-7 text-warning mb-0">$562.5</h4>
                        <h5 className="fs-10 text-500 mb-0 mt-1">
                          <del>$750 </del><span className="ms-1">-25%</span>
                        </h5>
                        <div className="mb-2 mt-3"><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star-half-alt text-warning star-icon"></span><span className="fa fa-star text-300"></span><span className="fa fa-star text-300"></span><span className="ms-1">(14)</span>
                        </div>
                        <div className="d-none d-lg-block">
                          <p className="fs-10 mb-1">Shipping Cost: <strong>$47</strong></p>
                          <p className="fs-10 mb-1">Stock: <strong className="text-success">Available</strong>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2"><a className="btn btn-sm btn-outline-secondary border-300 d-lg-block me-2 me-lg-0" href="#!"><span className="far fa-heart"></span><span className="ms-2 d-none d-md-inline-block">Favourite</span></a><a className="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span className="fas fa-cart-plus"> </span><span className="ms-2 d-none d-md-inline-block">Add to Cart</span></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-x1 bg-100">
              <div className="row">
                <div className="col-sm-5 col-md-4">
                  <div className="position-relative h-sm-100"><a className="d-block h-100" href="../../../app/e-commerce/product/product-details.html"><img className="img-fluid object-fit-cover w-sm-100 h-sm-100 rounded-1 absolute-sm-centered" src="/products/3.jpg" alt="" /></a>
                  </div>
                </div>
                <div className="col-sm-7 col-md-8">
                  <div className="row">
                    <div className="col-lg-8">
                      <h5 className="mt-3 mt-sm-0"><a className="text-1100 fs-9 fs-lg-8" href="../../../app/e-commerce/product/product-details.html">Apple iPhone XS Max (4GB RAM, 512GB ROM, 12MP Main Camera)</a></h5>
                      <p className="fs-10 mb-2 mb-md-3"><a className="text-500" href="#!">Mobile &amp; Tabs</a></p>
                      <ul className="list-unstyled d-none d-lg-block">
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>4GB RAM</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>512GB Internal Storage</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>Apple A12 Bionic (7nm)</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>iOS 12</span></li>
                        <li><span className="fas fa-circle" data-fa-transform="shrink-12"></span><span>3174mAh Li-Ion Battery</span></li>
                      </ul>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-between flex-column">
                      <div>
                        <h4 className="fs-8 fs-md-7 text-warning mb-0">$1050</h4>
                        <div className="mb-2 mt-3"><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star text-warning"></span><span className="fa fa-star-half-alt text-warning star-icon"></span><span className="ms-1">(13)</span>
                        </div>
                        <div className="d-none d-lg-block">
                          <p className="fs-10 mb-1">Shipping Cost: <strong>$65</strong></p>
                          <p className="fs-10 mb-1">Stock: <strong className="text-success">Available</strong>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2"><a className="btn btn-sm btn-outline-secondary border-300 d-lg-block me-2 me-lg-0" href="#!"><span className="far fa-heart"></span><span className="ms-2 d-none d-md-inline-block">Favourite</span></a><a className="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span className="fas fa-cart-plus"> </span><span className="ms-2 d-none d-md-inline-block">Add to Cart</span></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer border-top d-flex justify-content-center">
          <button className="btn btn-falcon-default btn-sm me-2" type="button" disabled="disabled" data-bs-toggle="tooltip" data-bs-placement="top" title="Prev"><span className="fas fa-chevron-left"></span></button><a className="btn btn-sm btn-falcon-default text-primary me-2" href="#!">1</a><a className="btn btn-sm btn-falcon-default me-2" href="#!">2</a><a className="btn btn-sm btn-falcon-default me-2" href="#!"><span className="fas fa-ellipsis-h"></span></a><a className="btn btn-sm btn-falcon-default me-2" href="#!">35</a>
          <button className="btn btn-falcon-default btn-sm" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Next"><span className="fas fa-chevron-right"></span></button>
        </div>
      </div>
    </>
  );
};

export default ProductosList;
