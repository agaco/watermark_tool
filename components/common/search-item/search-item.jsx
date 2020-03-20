import React from 'react';
import './search-item.scss';

const SearchItem = ({isSelected, onClick, url, title, size}) => (
    <div className={`pt-search-item ${isSelected ? "pt-search-item--selected" : ""}`} onClick={onClick}>
        <img alt={title} className="pt-search-item__image" src={url}/>
        <div className="pt-search-item__info">
            <span className="pt-search-item__title">{title}</span>
            <span className="pt-search-item__size">{size}</span>
        </div>
    </div>
);

export default SearchItem;
