import { useState } from "react";

    const ReviewCard = ({review}) => {
        const [rating, setRating] = useState(review?.rating);
        return (
            <div>
                <div className="card w-96 h-full bg-base-100 shadow-xl">
                    <div className="avatar p-4">
                        <div className="w-20 rounded-xl">
                            <img src={review?.userPhoto} />
                        </div>
                    </div>
                    <div className="card-body p-4">
                        <p>{review?.description}</p>
                        <p>{review?.userName}</p>
                        <div className="rating rating-lg">
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400"
                                onClick={()=>setRating(1)} checked = {rating===1} disabled/>
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                                onClick={()=>setRating(2)} checked = {rating===2} disabled/>
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                                onClick={()=>setRating(3)} checked = {rating===3} disabled/>
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                                onClick={()=>setRating(4)} checked = {rating===4} disabled/>
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" 
                                onClick={()=>setRating(5)} checked = {rating===5} disabled/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default ReviewCard;