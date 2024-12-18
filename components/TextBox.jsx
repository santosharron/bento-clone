import React, { useRef, useState } from 'react';
import ResizingContainer from './ResizingContainer';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import TextLogo from '@/assets/text.png';
import Image from 'next/image';
import { axiosWithToken } from '@/utils/axiosjwt';
import { useSelector } from 'react-redux';

const TextBox = ({ item, USERNAME }) => {
  const { isSameUser } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [width, setWidth] = useState(item.width);
  const [height, setHeight] = useState(item.height);
  const [textareaValue, setTextareaValue] = useState(item.content); // Store textarea value separately

  const handleResize = async (width, height) => {
    // i should make a put request to update the width and height of the item

    try {
      const res = await axiosWithToken.put(
        `${API_URL}/profile/resize/${USERNAME}/${item.id}/${width}/${height}`
      );

      console.log(res.data.message);
    } catch (error) {
      console.log('error', error.message);
    }

    setWidth(width);
    setHeight(height);
  };

  const textareaRef = useRef(null);

  const handleFocus = () => {
    if (!isSameUser) {
      return;
    }

    if (textareaRef.current) {
      const lastLine = textareaRef.current.lastElementChild;
      if (lastLine) {
        // Scroll to the last line with smooth behavior
        lastLine.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }

      setTimeout(() => {
        textareaRef.current.focus();

        // Set cursor position at the end of the last line
        textareaRef.current.selectionStart = item?.content?.length;
        textareaRef.current.selectionEnd = item?.content?.length;
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        textareaRef.current.scrollLeft =
          textareaRef.current.scrollWidth - textareaRef.current.clientWidth;
      }, 0);
    }
  };

  const handleBlur = () => {
    if (!isSameUser) {
      return;
    }

    if (textareaRef.current) {
      textareaRef.current.selectionStart = 0;
      textareaRef.current.selectionEnd = 0;
      // Scroll to the top
      textareaRef.current.scrollTop = 0;
      // Update the main value prop
    }
  };

  const handleChange = async (e) => {
    if (!isSameUser) {
      return;
    }

    setTextareaValue(e.target.value); // Update the separate textarea value
    dispatch(profileActions.updateItem({ ...item, content: e.target.value }));
    try {
      const res = await axiosWithToken.put(`${API_URL}/profile/${USERNAME}`, {
        ...item,
        content: e.target.value,
      });
      console.log(res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleTextClick = () => {
    if (!isSameUser) {
      return;
    }

    dispatch(profileActions.updateItem({ ...item, content: '' }));
    try {
      const res = axiosWithToken.put(`${API_URL}/profile/${USERNAME}`, {
        ...item,
        content: '',
      });
      console.log(res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      {item.content == null && isSameUser ? (
        <div
          onClick={handleTextClick}
          className={`flex-shrink-0 bg-[#f7f7f7] h-[175px] w-[175px] border-gray-border rounded-[1.5rem] border-dashed  text-center  cursor-pointer relative border-2 `}>
          <div className="w-full h-full flex items-center  justify-center absolute top-0 left-0 flex-col">
            <Image
              src={TextLogo}
              alt="Drag and drop"
              width={64}
              height={64}
              className={`
                   w-[1.5rem] h-[1.5rem] rounded-md `}
            />
            <p className={`mt-1 font-bold text-[14px] `}>Add Text</p>
          </div>
        </div>
      ) : (
        <ResizingContainer
          USERNAME={USERNAME}
          width={width}
          height={height}
          item={item}
          type={'text'}
          handleResize={handleResize}>
          <div
            className={`h-full w-full overflow-hidden p-2 ${
              isSameUser && 'group-hover:bg-[#f5f5f5]'
            }  group rounded-lg`}>
            <textarea
              ref={textareaRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Add Note"
              onChange={handleChange}
              value={textareaValue} // Use the separate textarea value
              className={`w-full h-full  scrollbar-hide focus:outline-none ${
                isSameUser && 'group-hover:bg-[#f5f5f5]'
              } leading-snug resize-none rounded overflow-y-auto ${
                (height === 1 || height === 3) && 'line-clamp-5'
              } ${(height === 4 || height === 5) && 'line-clamp-[13]'} ${
                height === 2 && 'line-clamp-1 '
              }   text-[1.25rem] leading-[132%] focus:line-clamp-none`}
            />
          </div>
        </ResizingContainer>
      )}
    </div>
  );
};

export default TextBox;
