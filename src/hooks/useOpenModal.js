import { useState } from "react";

const useOpenModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(fasle);
  };
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  return { openModal, onCloseModal, handleClickOpen };
};

export default useOpenModal;
