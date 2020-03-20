import React from 'react';
import PropTypes from 'prop-types';
import './search-item.scss';

const SearchItem = ({isSelected, onClick, url, title, size}) => {
  const isSelectedClass = isSelected ? 'pt-search-item--selected' : '';

  return (
    <div className={`pt-search-item ${isSelectedClass}`} onClick={onClick}>
      <img alt={title} className="pt-search-item__image" src={url}/>
      <div className="pt-search-item__info">
        <span className="pt-search-item__title">{title}</span>
        <span className="pt-search-item__size">{size}</span>
      </div>
    </div>
  )
};

SearchItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};


export default SearchItem;
