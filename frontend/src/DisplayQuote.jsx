
export function DisplayQuote({ quote }){
    const formatDate = new Date(quote.time).toLocaleString();

    return(
        <div className = "quote-cont">
            <p className = "quote-message">{quote.message}</p>
            <div className="quote-details">
                <span className="quote-author">{quote.name}</span>
                <span className="quote-time">{formatDate}</span>
            </div>
        </div>
    );
}