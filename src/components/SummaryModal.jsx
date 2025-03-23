export default function SummaryModal({summaryItems, hideSummary, submitOrder, bkgRef, boxRef, buttonRef}) {

  return (
    <div ref={bkgRef} id='summary-background'>
      <div ref={boxRef} id='summary-box' >
        {summaryItems}
        <div id='summary-buttons'>
          <button onClick={hideSummary} className='summary-button'>CONTINUE SHOPPING</button>
          <button ref={buttonRef} onClick={submitOrder} className='summary-button' >SUBMIT</button>
        </div>
      </div>
    </div>
  );
}