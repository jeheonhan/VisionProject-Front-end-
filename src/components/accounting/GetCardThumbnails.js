import React from 'react';
import UpdateCard from 'components/accounting/UpdateCard';

const GetCardThumbnails = ({ cardList, getCard }) => {

  const [value, setValue] = React.useState({updateOpen: false});


  //카드 수정 다이얼로그 띄우기
  const updateCardDialogOpen = () => {
    setValue({updateOpen : true});
  }

  //카드 수정 다이얼로그 닫기
  const updateCardDialogClose = () => {
    setValue({updateOpen : false});
    
  }

  //카드 수정 요청
  const updateCard = (event, cardRegNo) => {
    event.preventDefault();
    getCard(cardRegNo);
    updateCardDialogOpen();
  }

  return(
    <div>

    {cardList.map( (row) => {

      const { cardImage, cardRegNo, cardNo, cardManager, cardManagerName, cardCategoryCodeNo, cardCategoryCodeName, cardName, cardCompanyCodeName} = row;
      
      return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-12" style={{float:"left", display:"inline"}}>
          
          <div className="card product-item">

            <div className="card-header border-0 p-0">
              <div className="card-image">
                <div className="grid-thumb-equal">
                  <span className="grid-thumb-cover jr-link">
                    <img onClick={ event => updateCard(event, cardRegNo) } sizes="sm" alt="Remy Sharp" src={cardImage? '/img/'+ cardImage :  require("assets/images/basicCard2.png") }/>
                  </span>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="product-details">
                <h3 className="card-title fw-regular">
                  <div style={{overflow:"hidden", whiteSpace: "nowrap" ,textOverflow:"ellipsis"}}>
                    {cardName}
                  </div>
                </h3>
                <h3 className="card-title fw-regular">
                  <small className="text-grey text-darken-2">{cardNo}</small>
                </h3>
                <div className="d-flex flex-row">
                  <strong className="d-inline-block">{cardCompanyCodeName+"("+cardCategoryCodeName+")"}</strong>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      )
    })}
        <UpdateCard
          open={value.updateOpen}
          close={updateCardDialogClose}
           />
    </div>
  )
};

export default GetCardThumbnails;

