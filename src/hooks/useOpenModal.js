import { useState } from "react";

const useOpenModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  return { openModal, onCloseModal, handleClickOpen };
};

export default useOpenModal;
