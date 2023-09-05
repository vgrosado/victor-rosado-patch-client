function Review({rev}) {
    console.log(rev)
    return (
        <>
        <div className='reviewform__user-div'>
            <div className='reviewform__avatar'></div>
                <div className='reviewform__user-details'>
                    <p className='reviewform__username'>{rev.username}</p>
                    <p className='reviewform__user-timestamp'>{rev.timestamp}</p>
                </div>
        </div>
            <p className='reviewform__review'>{rev.review}</p>
        </>
    )
}
export default Review;