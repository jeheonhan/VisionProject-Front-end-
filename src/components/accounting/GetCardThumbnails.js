import React from 'react';
import Button from '@material-ui/core/Button';
import StarRatingComponent from 'react-star-rating-component';
import IntlMessages from 'util/IntlMessages';

const GetCardThumbnails = ({ cardList }) => {

  console.log(cardList)

  const GetThumbnailDetail = (event) => {
    event.preventDefault();
    alert("hi")
  }

  return(
    cardList.map( (row) => {

      const { cardImage, cardRegNo, cardNo, cardManager, cardManagerName, cardCategoryCodeNo, cardCategoryCodeName, cardName} = row;
      return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-12" style={{float:"left", display:"inline"}}>
          <div className="card product-item">
            <div className="card-header border-0 p-0">
              <div className="card-image">
                <div className="grid-thumb-equal">
                  <span className="grid-thumb-cover jr-link">
                    <img onClick={ event => GetThumbnailDetail(event) } sizes="sm" alt="Remy Sharp" src={'/img/'+ cardImage}/>
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="product-details">
                <h3 className="card-title fw-regular">{cardRegNo}
                  <small className="text-grey text-darken-2">{", " + cardNo}</small>
                </h3>
                <div className="d-flex ">
                  <h3 className="card-title">{cardManager} </h3>
                  <h5 className="text-muted px-2">
                    <del>{cardManager}</del>
                  </h5>
                  <h5 className="text-success">{cardManagerName} off</h5>
                </div>
                <div className="d-flex flex-row">
                  <StarRatingComponent
                    name=""
                    value={cardCategoryCodeNo}
                    starCount={5}
                    editing={false}/>
                  <strong className="d-inline-block ml-2">{cardCategoryCodeName}</strong>
                </div>
                <p>{cardName}</p>
              </div>
            </div>
          </div>
        </div>
      )
    })
  )
};

export default GetCardThumbnails;

