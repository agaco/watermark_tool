import React, {useState, useEffect, useReducer, useRef} from 'react';
import Input from '../common/input';
import SearchItem from '../common/search-item';
import Button from '../common/button';
import Checkbox from '../common/checkbox';
import Loader from '../common/loader';
import './editor.scss';
import {imagesReducer} from '../../utils/reducer';

const Editor = () => {
  const [value, setValue] = useState('');
  const canvasRef = useRef(null);
  const initialState = {images: [], singleImage: {}, isLoading: false};
  const [state, dispatch] = useReducer(imagesReducer, initialState);
  const [isChecked, toggleChecked] = useState(false);

  useEffect(() => {
    const parentWidth = canvasRef.current.parentNode.offsetWidth;
    const parentHeight = canvasRef.current.parentNode.offsetHeight;
    canvasRef.current.width = parentWidth;
    canvasRef.current.height = parentHeight - 2;
  }, [canvasRef]);


  useEffect(() => {
    const {singleImage} = state;
    const context = canvasRef.current.getContext('2d');
    const image = new Image();
    const logo = new Image();
    logo.src = '/logo.svg';
    if (Object.keys(singleImage).length > 0) {
      image.src = singleImage.url;
      image.onload = () => {
        const ratio = canvasRef.current.height / image.height;
        const width = image.width * ratio;
        const positionX = canvasRef.current.width / 2 - width / 2;
        const logoPositionX = positionX + 30;
        const logoPositionY = canvasRef.current.height - logo.height - 30;
        context.drawImage(image, positionX, 0, canvasRef.current.height, width);
        isChecked && context.drawImage(logo, logoPositionX, logoPositionY);
      };
    }
    if (Object.keys(singleImage).length === 0) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [state.singleImage, isChecked]);


  useEffect(() => {
    state.images.length > 0 && dispatch({type: 'SET_LOADING_ACTION'});

    if (value !== '' ) {
      dispatch({type: 'SET_LOADING_ACTION'});

      fetch(`/api/search?query=${value}`)
        .then((res) => res.status === 200 && res.json())
        .then((data) => {
          return data.images.length > 0 && data.images.map((item) => {
            const img = new Image();
            img.src = item.url;
            item.size = `${img.height} x ${img.width}`;
            return item;
          });
        })
        .then((images) => {
          dispatch({
            type: 'SET_SEARCH_ACTION',
            payload: images,
          });
        });
    }

    if (value === '' && state.images.length > 0) {
      dispatch({
        type: 'SET_SEARCH_ACTION',
        payload: [],
      });
    }
  }, [value]);

  const onItemSelect = (val) => {
    dispatch({
      type: 'SET_EDIT_ITEM_ACTION',
      payload: val,
    });
  };

  const onDownload = async () => {
    const image = document.createElement('a');
    const file = await canvasRef.current.toDataURL('image/png');
    await (image.href = file);
    await (image.download = 'file');
    await image.click();
  };

  const isHidden = state.images.length === 0 ? 'hidden' : '';
  return (<div className='pt-editor'>
    <div className='pt-editor__search'>
      <Input value={value} onChange={setValue} placeholder='Search'/>
      {state.isLoading && <Loader/>}
      <div className={`pt-editor__search-results ${isHidden}`} >
        {state.images.length > 0 && state.images.map((item, index) => {
          return (
            <SearchItem key={index}
              isSelected={state.singleImage.title === item.title}
              onClick={() => onItemSelect(item)}
              {...item} />
          );
        })}
      </div>
    </div>


    <div className='pt-editor__view'>
      <div className='pt-editor__canvas'>
        <canvas ref={canvasRef}
          className='pt-editor__canvas--container'
        />
      </div>
      <div className='pt-editor__buttons'>
        <span>
          <Checkbox isChecked={isChecked}
            placeholder='add watermark'
            onChange={() => toggleChecked(!isChecked)}
          />
        </span>
        <Button onClick={onDownload}>DOWNLOAD</Button>
      </div>
    </div>
  </div>);
};

export default Editor;
