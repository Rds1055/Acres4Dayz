import './rating.css';

export const Rating = ({value}) => {
    return (
        <span className="stars mb-3 mt-3">
            {
                [1, 2, 3, 4, 5].map(x => (
                    <i key={x} className={(x > +value ? 'empty-star' : 'full-star')}></i>
                ))
            }
        </span>
    );
}
