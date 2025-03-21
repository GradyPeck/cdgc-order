export default function SummaryModal({summaryItems, hideSummary, submitOrder}) {

    return (
      <div id='summary-background'>
        <div id='summary-box' >
          {summaryItems}
          <div id='summary-buttons'>
            <button onClick={hideSummary} className='summary-button'>CONTINUE SHOPPING</button>
            <button onClick={submitOrder} className='summary-button' >SUBMIT</button>
          </div>
        </div>
      </div>
    );
}