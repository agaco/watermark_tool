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
  const [loadedData, setLoadedData] = useState([]);
  const canvasRef = useRef(null);
  const initialState = {images: [], singleImage: {}, isLoading: false};
  const [state, dispatch] = useReducer(imagesReducer, initialState);
  const [isChecked, toggleChecked] = useState(false);

  const setNewData = (val) => {
    dispatch({
      type: 'SET_SEARCH_ACTION',
      payload: val,
    });
  };
  const callForNewData = async () => {
    const response = await fetch(`/api/search?query=${value}`);
    if (response.status == 200) {
      const parsedRes = await response.json();
      const data = await Promise.all(parsedRes.images.map(async (item) => {
        const img = await new Image();
        await (img.src = item.url);
        await (item.placeholder = true);

        await (img.onload = () => {
          setTimeout(() => {
            (item.size = `${img.height} x ${img.width}`);
            delete item.placeholder;
            setLoadedData([...loadedData, item]);
            Promise.resolve();
          }, 600);
        });
        return item;
      }));
      await setNewData(data);
    }
  };

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
    if (singleImage && Object.keys(singleImage).length > 0) {
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
    if (singleImage && Object.keys(singleImage).length === 0) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [state.singleImage, isChecked]);


  useEffect(() => {

    state.images.length > 0 && dispatch({type: 'SET_LOADING_ACTION'});

    if (value !== '') {
      dispatch({type: 'SET_LOADING_ACTION'});
      callForNewData();
    }

    if (value === '') {
      setNewData([]);
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
        {state.images.map((item, index) => {

          if (!item.placeholder) {

            return (
              <SearchItem key={index}
                isSelected={state.singleImage.title === item.title}
                onClick={() => onItemSelect(item)}
                {...item} />
            );
          }
          if (item.placeholder) {
            return <img key={index} src='./placeholder.svg' alt='placeholder'/>;
          }
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
