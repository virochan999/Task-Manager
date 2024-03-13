import { useState } from "react"
import Button from "../Button/Button"
import filterImg from "../../assets/filter-icon.svg"
import DialogModal from "../DialogModal/DialogModal"
import DateFilter from "../DateFilter/DateFilter"
import { FilteredDateType } from "../../types"

interface FilterPropTypes {
  handleApplyFilter: (data: FilteredDateType) => void
}

const Filter = ({ handleApplyFilter } : FilterPropTypes) => {
  const [modal, setModal] = useState(false)

  /* Open filter modal */
  const openFilterPopup = () => {
    setModal(true)
  }

  const applyFilter = (data: FilteredDateType) => {
    handleApplyFilter(data)
  }

  return (
    <div>
      <Button
        buttonType="filter"
        buttonText="Filter by"
        handleBtnClick={openFilterPopup}
      >
        <img src={filterImg} alt="filter-img"></img>
      </Button>
      <DialogModal
        openModal={modal}
        closeModal={() => setModal(false)}
      >
        <DateFilter
          closeModal={() => setModal(false)}
          handleApplyFilter={applyFilter}
        />
      </DialogModal>
    </div>
  )
}

export default Filter