const NewProjectButton = ({onClick} : {onClick: () => void}) => {
  return (
      <button
          onClick={onClick}
          className="sticky bg-accent rounded-md p-2 text-small font-bold text-text-light"
      >
          +
      </button>
  )
}

export default NewProjectButton