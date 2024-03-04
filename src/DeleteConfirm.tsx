import CautionIcon from "./assets/Icons/CautionIcon.tsx";
import {Dispatch, SetStateAction} from "react";

const DeleteConfirm = ( {onCancel, handleConfirmDelete, isOpen} : {
    onCancel: () => void,
    handleConfirmDelete: () => void,
    isOpen: Dispatch<SetStateAction<boolean>>
} ) => {
  return (
      <div
          className={`flex flex-col items-center gap-y-4 absolute top-2/3 left-1/2 translate-x-[-50%] bg-border border-t-2 border-solid border-red-900 p-4 rounded-md w-72 text-center ${isOpen ? '' : 'hidden'}`}>
          <CautionIcon color={"white"} size={"30px"}/>
          <p className="p-y-4">Delete permanently?</p>
          <div className="flex justify-center gap-2">
              <button onClick={onCancel} className="text-text-light text-small">cancel</button>
              <button onClick={handleConfirmDelete}
                      className="text-white px-2 py-1 rounded-md bg-red-500">Delete
              </button>
          </div>
      </div>
  )
}

export default DeleteConfirm