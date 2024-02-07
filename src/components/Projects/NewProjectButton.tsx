import plus from '../../assets/Icons/plus.svg'
const NewProjectButton = ({onClick} : {onClick: () => void}) => {
  return (
      <button
          onClick={onClick}
          className="sticky"
      >
          <img src={plus} alt="Add" className="w-8 h-8" />
      </button>
  )
}

export default NewProjectButton