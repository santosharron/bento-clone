import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import { axiosWithToken } from '@/utils/axiosjwt';
import { useSelector } from 'react-redux';
import DeleteIcon from '@/assets/delete.svg';
import Image from 'next/image';

const TitleBox = ({ item, USERNAME, isLaptop }) => {
  const dispatch = useDispatch();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { isSameUser } = useSelector((state) => state.ui);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false);

  const handelDelete = async () => {
    if (!isSameUser) {
      return;
    }

    dispatch(profileActions.removeItem(item.id));
    const res = await axiosWithToken.delete(
      `${API_URL}/profile/${USERNAME}/${item.id}`
    );
    console.log('res', res.data);
  };

  const titleRef = useRef();
  const handlePlaceholder = () => {
    if (!isSameUser) {
      return;
    }

    if (titleRef?.current?.textContent.trim() === '') {
      setIsPlaceholderVisible(true);
    }
  };

  useEffect(() => {
    handlePlaceholder();
  }, []);

  const handelFocus = () => {
    setIsPlaceholderVisible(false);
    titleRef?.current?.focus();
  };

  const handelTitle = async () => {
    if (!isSameUser) {
      return;
    }
    handlePlaceholder();
    dispatch(
      profileActions.updateItem({
        ...item,
        content: titleRef?.current?.textContent,
      })
    );
    console.log(titleRef?.current?.textContent);
    try {
      const res = await axiosWithToken.put(`${API_URL}/profile/${USERNAME}`, {
        ...item,
        content: titleRef?.current?.textContent,
      });
      console.log('res', res.status);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    titleRef?.current?.addEventListener('blur', handelTitle);
    handlePlaceholder();
    return () => {
      titleRef?.current?.removeEventListener('blur', handelTitle);
    };
  }, []);

  return (
    <div
      className={`w-[375px]  ${
        isLaptop && 'xl:w-[820px]'
      }  rounded-[16px] p-2 relative border border-transparent  group bg-white transition-all duration-200 ease-in-out ${
        isSameUser && 'hover:shadow-lg hover:border-[#e3e3e3]'
      }`}>
      {isSameUser ? (
        <div
          ref={titleRef}
          onBlur={handlePlaceholder}
          contentEditable="true"
          suppressContentEditableWarning={true}
          className={`${
            isLaptop && 'xl:max-w-[790px]'
          } xl:min-w-[10rem] max-w-[355px] truncate text-ellipsis focus:text-clip h-[44px] cursor-text w-fit pl-4 pr-8 py-2 text-xl  bg-transparent outline-none rounded-lg transition-all duration-200 ease-in-out text-[#000] font-bold text-[24px] hover:bg-[#f5f5f5]`}
          placeholder="Title">
          {item.content}
        </div>
      ) : (
        <div
          ref={titleRef}
          className={`${
            isLaptop && 'xl:max-w-[790px]'
          } xl:max-w-[355px] min-w-[10rem]  text-ellipsis focus:text-clip h-[44px] cursor-text w-fit pl-4 pr-8 py-2 text-xl  bg-transparent outline-none rounded-lg transition-all duration-200 ease-in-out truncate text-[#000] font-bold text-[24px]  ${
            isSameUser && 'hover:bg-[#f5f5f5]'
          }`}
          placeholder="Title">
          {item.content}
        </div>
      )}

      <div
        onFocus={handelFocus}
        onClick={handelFocus}
        className={`absolute top-0 text-[#afafaf] left-2 w-[9rem] hover:bg-[#f5f5f5] my-2 p-2 rounded-lg text-xl cursor-text ${
          isPlaceholderVisible ? 'opacity-[100%] static' : 'opacity-0 hidden'
        } `}>
        Add Title...
      </div>
      {isSameUser && (
        <div
          onClick={handelDelete}
          className="absolute hidden group-hover:flex  items-center justify-center -top-4 -left-4 w-9 h-9 rounded-full bg-white shadow-lg  cursor-pointer hover:bg-gray-100">
          {/* <AiOutlineDelete className="w-5 h-5 text-black" /> */}
          <Image src={DeleteIcon} alt="delete" />
        </div>
      )}
    </div>
  );
};

export default TitleBox;
